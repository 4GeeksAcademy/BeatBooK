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

@api.route('/events', methods=['POST'])
def create_event():
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

