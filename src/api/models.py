from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    birthdate = db.Column(db.Date, nullable=True)
    description = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_image_url = db.Column(db.String(500), unique=False, nullable=True) 
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)
    user_categories = db.relationship('MusicalCategory', secondary='user_favorite_category', back_populates='users')

    events = db.relationship('Event', backref='user_events', lazy=True)
    places = db.relationship('Place', backref='user_places', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_image_url": self.profile_image_url,
        }

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    profile_picture = db.Column(db.String(1200), nullable=False)
    banner_picture = db.Column(db.String(1200), nullable=False)
    social_networks = db.Column(db.String(1200), nullable=False)
    users = db.relationship('User', backref='band', lazy=False)
    events = db.relationship('Event', secondary='band_events', back_populates='bands')
    musical_categories = db.relationship('MusicalCategory', secondary='band_musical_category', back_populates='bands')

    def __repr__(self):
        return f'<Band {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "profile_picture": self.profile_picture,
        }

class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    bands = db.relationship('Band', secondary='band_musical_category', back_populates='musical_categories')
    users = db.relationship('User', secondary='user_favorite_category', back_populates='user_categories')

# Tablas auxiliares 
band_events = db.Table('band_events',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

band_musical_category = db.Table('band_musical_category',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

user_favorite_category = db.Table('user_favorite_category',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('musical_category_id', db.Integer, db.ForeignKey('musical_category.id'), primary_key=True)
)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), unique=True, nullable=True)
    media = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    bands = db.relationship('Band', secondary='band_events', back_populates='events')

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
            'band_id': self.band_id
        }

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='event_place', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Assistance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    user = db.relationship('User', backref='assistances', lazy=True)
    event = db.relationship('Event', backref='assistances', lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(120), nullable=False)

    user = db.relationship('User', backref='reviews', lazy=True)
    event = db.relationship('Event', backref='reviews', lazy=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
