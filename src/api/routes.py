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
          
cloudinary.config( 
  cloud_name = "daxbjkj1j", 
 api_key = os.environ["CLOUDINARY_API_KEY"], 
  api_secret = os.environ["CLOUDINARY_API_SECRET"]  
)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()
    # Genera una sal
    salt = bcrypt.gensalt()
    # Hashea la contraseña
    hashed_password = bcrypt.hashpw(request_body["password"].encode('utf-8'), salt)
    # Convierte los bytes a una cadena
    # hashed_password_str = hashed_password.decode()

    if not 'username'in request_body:
        return jsonify("Username is required"), 400
    if not 'email'in request_body:
        return jsonify("Email is required"), 400
    if not 'password'in request_body:
        return jsonify("Password is required"), 400
    if not 'password_confirmation'in request_body:
        return jsonify("Password confirmation is required"), 400
    
    user = User(username=request_body["username"],email=request_body["email"], password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    # Genera un token para el nuevo usuario
    access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'User created', 'token': access_token }), 200


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
        "username": user.username,
        "profile_image_url": user.profile_image_url  # agrega la URL de la imagen de perfil a la respuesta
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
