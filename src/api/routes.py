"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Place, Band, Review
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
        "id": band.id, 
        "email": band.email,
        "profile_picture": band.profile_picture,
        "social_networks": band.social_networks,
        "users": [user.serialize() for user in band.users],  # Serializar los usuarios
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


@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200


@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    return jsonify(event.serialize()), 200

@api.route('/events', methods=['POST'])
def create_event():
    request_body = request.get_json()
    event = Event(name=request_body['name'], date=request_body['date'], description=request_body['description'], address=request_body['address'], price=request_body['price'], pictures=request_body['pictures'], media=request_body['media'], social_networks=request_body['social_networks'], user_id=request_body['user_id'], place_id=request_body['place_id'], band_id=request_body['band_id'])
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
    event.user_id = request_body['user_id']
    event.place_id = request_body['place_id']
    event.band_id = request_body['band_id']
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


@api.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    serialized_reviews = [review.serialize() for review in reviews]
    return jsonify(serialized_reviews), 200


@api.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        raise APIException('Review not found', status_code=404)
    return jsonify(review.serialize()), 200


@api.route('/reviews', methods=['POST'])
def create_review():
    request_body = request.get_json()
    review = Review(rating=request_body['rating'], comment=request_body['comment'], user_id=request_body['user_id'])
    db.session.add(review)
    db.session.commit()
    return jsonify(review.serialize()), 201


@api.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        raise APIException('Review not found', status_code=404)
    request_body = request.get_json()
    review.rating = request_body['rating']
    review.comment = request_body['comment']
    review.user_id = request_body['user_id']
    db.session.commit()
    return jsonify(review.serialize()), 200


@api.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        raise APIException('Review not found', status_code=404)
    db.session.delete(review)
    db.session.commit()
    return jsonify(review.serialize()), 200


@api.route('/places', methods=['GET'])
def get_places():
    places = Place.query.all()
    serialized_places = [place.serialize() for place in places]
    return jsonify(serialized_places), 200


@api.route('/places/<int:place_id>', methods=['GET'])
def get_place(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    return jsonify(place.serialize()), 200

#----------------------------Creacion de banda--------------------------------------------------------------------------------------------------------#
@api.route('/band', methods=['POST'])
def create_band():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    profile_picture = data.get('profile_picture')
    banner_picture = data.get('banner_picture')
    social_networks = data.get('social_networks')

    if not name or not email or not profile_picture or not banner_picture or not social_networks:
        return jsonify({'message': 'Todos los campos son requeridos'}), 400

    new_band = Band(name=name, email=email, profile_picture=profile_picture, banner_picture=banner_picture, social_networks=social_networks)
    db.session.add(new_band)
    db.session.commit()

    return jsonify({'message': 'Banda creada exitosamente', 'band_id': new_band.id}), 201
#----------------------------Creacion de banda--------------------------------------------------------------------------------------------------------#

#Obtener todas las bandas
@api.route('/bands', methods=['GET']) 
def all_bands():
    
    bands = Band.query.all()        #instancias de Band desde la base de datos
    if not bands:
            return jsonify({"message": "No se encontraron bandas"}), 404
    
    bands_json = [band.serialize() for band in bands]           # Serializar Band en formato JSON

    return jsonify(bands_json)
#----------------------------------------------------#

#Obtener solo una banda
@api.route('/band/<int:band_id>', methods=['GET'])
def get_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404

    return jsonify({
        "id": band.id, 
        "email": band.email,
        "profile_picture": band.profile_picture,
        "social_networks": band.social_networks,
        "users": [user.serialize() for user in band.users],  # Serializar los usuarios
    }), 200
#----------------------------------------------------#

#obtener los usuarios de una banda  Preguntar si lo manejamos asi o con el endpoint anterior
#@api.route('/bands/<int:band_id>/users', methods=['GET'])
#def get_band_users(band_id):
    
        #band = Band.query.get(band_id)
        #if band is None:
        #    return jsonify({"message": "No se encontró la banda"}), 404

         # Serializar los usuarios de la banda en formato JSON
        #users_json = [user.serialize() for user in band.users]

        # Devolver los usuarios en formato JSON
        #return jsonify(users_json), 200
#----------------------------------------------------#

#Actualizar una banda
@api.route('/band/<int:band_id>', methods=['POST'])
def update_band(band_id):
    
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404
        
        data = request.json
        
        # Actualizar los atributos de la banda con los datos proporcionados
        band.name = data.get('name', band.name)
        band.email = data.get('email', band.email)
        band.profile_picture = data.get('profile_picture', band.profile_picture)
        band.banner_picture = data.get('banner_picture', band.banner_picture)
        band.social_networks = data.get('social_networks', band.social_networks)
        
        db.session.commit()
        
        # Devolver la banda actualizada en formato JSON
        return jsonify(band.serialize()), 200
#----------------------------------------------------#

#Borrar una banda 
@api.route('/band/<int:band_id>', methods=['DELETE'])
def delete_band(band_id):

        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404

        db.session.delete(band)
        db.session.commit()
        return jsonify({"message": "Banda eliminada correctamente"}), 200
#----------------------------------------------------#


@api.route('/band/<int:band_id>/add_member', methods=['POST'])
def add_member_to_band(band_id):
   
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404

        # Obtener los datos del miembro a añadir desde el cuerpo de la solicitud
        data = request.json
        user_id = data.get('user_id')

        # Verificar si el usuario existe
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Verificar si el usuario ya es miembro de otra banda
        if user.band_id:
            return jsonify({"message": "El usuario ya es miembro de otra banda"}), 400

        
        user.band_id = band_id
        db.session.commit()

        return jsonify({"message": "Usuario añadido correctamente a la banda"}), 200

# Borrar un usuario de la banda
@api.route('/band/<int:band_id>/member/<int:user_id>', methods=['DELETE'])
def delete_member(band_id, user_id):
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
    #----------------------------------------------------#