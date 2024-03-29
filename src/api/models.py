from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_image_url = db.Column(db.String(500), unique=False, nullable=True)  # new field
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='user_events', lazy=True)
    places = db.relationship('Place', backref='user_places', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_image_url": self.profile_image_url,  # include in serialized output
            # do not serialize the password, its a security breach
        }
  
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), nullable=True)
    media = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'description': self.description,
            'address': self.address,
            'price': self.price,
            'pictures': self.pictures,
            'media': self.media,
            'social_networks': self.social_networks,
            'user_id': self.user_id,
            'place_id': self.place_id,
        }

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='place', lazy=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'phone': self.phone,
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'social_networks': self.social_networks,
        }

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='band', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'social_networks': self.social_networks,
        }

class Assistance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    user = db.relationship('User', backref='assistances', lazy=True)
    event = db.relationship('Event', backref='assistances', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(120), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    user = db.relationship('User', backref='reviews', lazy=True)
    event = db.relationship('Event', backref='reviews', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }
