from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='user_events', lazy=True)
    places = db.relationship('Place', backref='user_places', lazy=True)
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    place = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), unique=True, nullable=True)
    media = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)  # Corregido de "adress" a "address"
    phone = db.Column(db.String(120), unique=True, nullable=True)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='event_place', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(120), nullable=True)
    banner_picture = db.Column(db.String(120), nullable=True)
    social_networks = db.Column(db.String(120), nullable=True)

    events = db.relationship('Event', backref='event_band', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

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

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
