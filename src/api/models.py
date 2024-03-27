from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import LargeBinary
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    profile_image_url = db.Column(db.String(500), unique=False, nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)

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
     
# Definición de la tabla auxiliar para la relación de muchos a muchos de band a event
band_events = db.Table('band_events',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    profile_picture = db.Column(db.String(120), nullable=False)
    banner_picture = db.Column(db.String(120), nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)
    users = db.relationship('User', backref='band', lazy=False)
    events = db.relationship('Event', secondary=band_events, back_populates='bands')

    def __repr__(self):
        return f'<Band {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    place = db.Column(db.String(120), nullable=False)
    pictures = db.Column(db.String(120), unique=True, nullable=False)
    media = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    social_networks = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), unique=True, nullable=False)
    bands = db.relationship('Band', secondary=band_events, back_populates='events')

    def __repr__(self):
        return f'<Event {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "place": self.place
        }
    


