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

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()
    event = Event(name=request_body['name'], date=request_body['date'], description=request_body['description'], address=request_body['address'], price=request_body['price'], user_id=request_body['user_id'], place_id=request_body['place_id'])
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
    event.place_id = request_body['place_id']
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

    return jsonify({"message": "Profile image uploaded successfully", "url": url}), 200


#----------------------------Creacion de banda--------------------------------------------------------------------------------------------------------#
@api.route('/bands', methods=['POST'])
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

#----------------------------Creacion de Evento--------------------------------------------------------------------------------------------------------#
# Ruta para crear un evento
@api.route('/events', methods=['POST'])
def create_event():
    data = request.json
    name = data.get('name')
    place = data.get('place')
    pictures = data.get('pictures')
    media = data.get('media')
    description = data.get('description')
    date = data.get('date')
    social_networks = data.get('social_networks')
    price = data.get('price')
    band_name = data.get('band_name')

    if not name or not place or not pictures or not media or not description or not date or not social_networks or not price or not band_name:
        return jsonify({'message': 'Todos los campos son requeridos'}), 400

    # Busca la banda por su nombre
    band = Band.query.filter_by(name=band_name).first()
    if not band:
        return jsonify({'message': 'No se encontró ninguna banda con el nombre proporcionado'}), 404

    new_event = Event(
        name=name,
        place=place,
        pictures=pictures,
        media=media,
        description=description,
        date=date,
        social_networks=social_networks,
        price=price
    )

    # Asigna la banda al evento
    new_event.bands.append(band)

    db.session.add(new_event)
    db.session.commit()

    return jsonify({'message': 'Evento creado exitosamente', 'event_id': new_event.id}), 201
#----------------------------Creacion de Evento--------------------------------------------------------------------------------------------------------#
