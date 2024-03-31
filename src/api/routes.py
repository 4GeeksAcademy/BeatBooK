"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Place, Band, Review, Assistance, MusicalCategory
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
import bcrypt
import cloudinary
from cloudinary.uploader import upload
import os

  
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#LOGIN Y PRIVADOS#

@api.route('/log_in', methods=['POST'])
def log_in():
    request_body = request.get_json()
    if not 'email' in request_body:
        return jsonify("Email is required"), 400
    if not 'password' in request_body:
        return jsonify("Password is required"), 400
    user = User.query.filter_by(email=request_body["email"]).first()
    if user is None or not bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        return jsonify("Invalid email or password"), 400
    # Genera un token para el usuario que inició sesión
    access_token = create_access_token(identity=str(user.id))
    return jsonify({ 'message': 'Logged in successfully', 'token': access_token, 'email': user.email }), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id, 
        "email": user.email,
        "profile_picture": user.profile_picture,
        "social_networks": user.social_networks,
        "users": [user.serialize() for user in user.users],
    }), 200

@api.route('/upload_profile_image', methods=['POST'])
@jwt_required()
def upload_profile_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    file = request.files['image']
    upload_result = upload(file)
    url = upload_result['url']
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    user.profile_image_url = url
    db.session.commit()
    return jsonify({"message": "Profile image uploaded successfully", "url": url}), 200

#USER#

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    request_body = request.get_json()
    user.email = request_body['email']
    user.username = request_body['username']
    user.birthdate = request_body['birthdate']
    user.description = request_body['description']
    user.gender = request_body['gender']
    user.city = request_body['city']
    user.profile_picture = request_body['profile_picture']
    user.banner_picture = request_body['banner_picture']
    user.social_networks = request_body['social_networks']
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>/assistance', methods=['GET'])
def get_user_assistance(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    assistances = user.assistances
    events = []
    for assistance in assistances:
        event = assistance.event
        if event:
            events.append(event.serialize())
    return jsonify(events), 200

@api.route('/users/<int:user_id>/favorite_categories', methods=['GET'])
def get_user_favorite_categories(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    categories = user.user_categories
    categories = list(map(lambda x: x.serialize(), categories))
    return jsonify(categories), 200

#BANDS#

@api.route('/bands', methods=['GET']) 
def get_all_bands():
    bands = Band.query.all()
    if not bands:
            return jsonify({"message": "No se encontraron bandas"}), 404    
    bands_json = [band.serialize() for band in bands]
    return jsonify(bands_json)

@api.route('/bands/<int:band_id>', methods=['GET'])
def get_single_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    return jsonify(band.serialize()), 200

@api.route('/bands', methods=['POST'])
def create_band():
    data = request.json
    band = Band(
        name=data.get('name'),
        description=data.get('description'),
        profile_picture=data.get('profile_picture'),
        banner_picture=data.get('banner_picture'),
        social_networks=data.get('social_networks')
    )
    db.session.add(band)
    db.session.commit()
    return jsonify(band.serialize()), 201

@api.route('/bands/<int:band_id>', methods=['PUT'])
def update_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    data = request.json
    band.name = data.get('name')
    band.description = data.get('description')
    band.profile_picture = data.get('profile_picture')
    band.banner_picture = data.get('banner_picture')
    band.social_networks = data.get('social_networks')
    db.session.commit()
    return jsonify(band.serialize()), 200

@api.route('/bands/<int:band_id>', methods=['DELETE'])
def delete_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    db.session.delete(band)
    db.session.commit()
    return jsonify(band.serialize()), 200

@api.route('/bands/<int:band_id>/members', methods=['GET'])
def get_band_members(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    members = band.members
    members_data = [member.serialize() for member in members]
    return jsonify(members_data), 200

@api.route('/bands/<int:band_id>/add_member', methods=['POST'])
def add_band_member(band_id):
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404
        data = request.json
        user_id = data.get('user_id')
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user.band_id:
            return jsonify({"message": "El usuario ya es miembro de otra banda"}), 400
        user.band_id = band_id
        db.session.commit()
        return jsonify({"message": "Usuario añadido correctamente a la banda"}), 200

@api.route('/bands/<int:band_id>/member/<int:user_id>', methods=['DELETE'])
def remove_band_member(band_id, user_id):
    band = Band.query.get(band_id)
    if band:
        member = User.query.filter_by(id=user_id, band_id=band_id).first()
        if member:
            db.session.delete(member)
            db.session.commit()
            return jsonify({'message': 'Miembro eliminado correctamente'}), 200
        else:
            return jsonify({'message': 'Miembro no encontrado en la banda'}), 404
    else:
        return jsonify({'message': 'Banda no encontrada'}), 404
    
@api.route('/bands/<int:band_id>/events', methods=['GET'])
def get_band_events(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    events = band.events
    events_data = [event.serialize() for event in events]
    return jsonify(events_data), 200

#EVENTOS#

@api.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200

@api.route('/events/<int:event_id>', methods=['GET'])
def get_single_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    return jsonify(event.serialize()), 200

@api.route('/events', methods=['POST'])
def create_event():
    request_body = request.get_json()
    event = Event(
        name=request_body['name'], 
        date=request_body['date'], 
        description=request_body['description'], 
        address=request_body['address'], 
        price=request_body['price'], 
        pictures=request_body['pictures'], 
        media=request_body['media'], 
        social_networks=request_body['social_networks']
        )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.serialize()), 201

@api.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    request_body = request.get_json()
    event.name = request_body['name']
    event.date = request_body['date']
    event.description = request_body['description']
    event.address = request_body['address']
    event.price = request_body['price']
    event.pictures = request_body['pictures']
    event.media = request_body['media']
    event.social_networks = request_body['social_networks']
    db.session.commit()
    return jsonify(event.serialize()), 200

@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    db.session.delete(event)
    db.session.commit()
    return jsonify(event.serialize()), 200

@api.route('/events/<int:event_id>/assistances', methods=['GET'])
def get_event_assistances(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    assistances = event.assistances
    assistances = list(map(lambda x: x.serialize(), assistances))
    return jsonify(assistances), 200

@api.route('/events/<int:event_id>/reviews', methods=['GET'])
def get_event_reviews(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    reviews = event.reviews
    reviews = list(map(lambda x: x.serialize(), reviews))
    return jsonify(reviews), 200

@api.route('/events/<int:event_id>/add_assistances', methods=['POST'])
def add_assistance(event_id):
    request_body = request.get_json()
    user_id = request_body['user_id']
    existing_assistance = Assistance.query.filter_by(user_id=user_id).first()
    if existing_assistance:
        return jsonify({"message": "User is already attending an event"}), 400
    assistance = Assistance(user_id=user_id, event_id=event_id)
    db.session.add(assistance)
    db.session.commit()
    return jsonify(assistance.serialize()), 201

@api.route('/events/<int:event_id>/remove_assistances', methods=['DELETE'])
def remove_assistance(event_id):
    request_body = request.get_json()
    user_id = request_body['user_id']
    assistance = Assistance.query.filter_by(user_id=user_id, event_id=event_id).first()
    if assistance is None:
        return jsonify({"message": "User is not attending this event"}), 404
    db.session.delete(assistance)
    db.session.commit()
    return jsonify(assistance.serialize()), 200

#PLACES#

@api.route('/places', methods=['GET'])
def get_all_places():
    places = Place.query.all()
    serialized_places = [place.serialize() for place in places]
    return jsonify(serialized_places), 200

@api.route('/places/<int:place_id>', methods=['GET'])
def get_single_place(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    return jsonify(place.serialize()), 200

@api.route('/places', methods=['POST'])
def create_place():
    request_body = request.get_json()
    place = Place(
        name=request_body['name'],
        description=request_body['description'],
        address=request_body['address'],
        phone=request_body['phone'],
        profile_picture=request_body['profile_picture'],
        banner_picture=request_body['banner_picture'],
        social_networks=request_body['social_networks']
    )
    db.session.add(place)
    db.session.commit()
    return jsonify(place.serialize()), 201
