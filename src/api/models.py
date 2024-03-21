from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

db = SQLAlchemy()

class User(db.Model):
    is_active = db.Column(db.Boolean(), nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    username = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(80), nullable=True)
    birthdate = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    profile_picture = db.Column(db.String(120), nullable=False)
    banner_picture = db.Column(db.String(120), nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)

    place = db.Column(db.String(120), nullable=False)
    music_category = db.relationship('MusicCategory', backref='user')
    band_id = db.relationship('Band', backref='user')
    
class Place(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    place = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(120), nullable=False)
    banner_picture = db.Column(db.String(120), nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    profile_picture = db.Column(db.String(120), nullable=False)
    banner_picture = db.Column(db.String(120), nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)
    
    music_category = db.relationship('MusicCategory', backref='band')
    events = db.relationship('Event', backref='band')
    followers = db.relationship('Follower', foreign_keys='Follower.user_to_id', backref='followed')

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    place = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), unique=True, nullable=False)
    media = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    
    place_id = db.relationship('Place', backref='event')
    music_category = db.relationship('MusicCategory', backref='event')
    band_id = db.relationship('Band', backref='event')

class MusicCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

class BandMusicCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    band_id = db.Column(db.Integer, ForeignKey('band.id'))
    music_category_id = db.Column(db.Integer, ForeignKey('music_category.id'))

class UserFavouriteCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    music_category_id = db.Column(db.Integer, ForeignKey('music_category.id'))

class Assitance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    event_id = db.Column(db.Integer, ForeignKey('event.id'))

class review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    event_id = db.Column(db.Integer, ForeignKey('event.id'))
    band_score = db.Column(db.Integer, nullable=False)
    place_score = db.Column(db.Integer, nullable=False)
    event_score = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(120), nullable=False)