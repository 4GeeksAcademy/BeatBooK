"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Place, Band, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
#    serialized_events = [event.serialize() for event in events]
    return jsonify({
            'id': Event.id,
            'name': Event.name,
            'date': Event.date,
            'description': Event.description,
            'address': Event.address,
            'price': Event.price,
            'pictures': Event.pictures,
            'media': Event.media,
            'social_networks': Event.social_networks,
            'user_id': Event.user_id,
            'place_id': Event.place_id,
            'band_id': Event.band_id
        }), 200

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