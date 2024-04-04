from flask_sqlalchemy import SQLAlchemy
<<<<<<< HEAD
=======
import json
>>>>>>> origin/Home

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    is_active = db.Column(db.Boolean(), nullable=False)
    email = db.Column(db.String(300), unique=True, nullable=False)
    username = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(300), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    profile_image_url = db.Column(db.String(300), nullable=True)
    banner_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    user_categories = db.relationship('MusicalCategory', secondary='user_favorite_category', back_populates='users')
=======
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
>>>>>>> origin/Home

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
<<<<<<< HEAD
            'id': self.id,
            'is_active': self.is_active,
            'email': self.email,
            'username': self.username,
            'birthdate': self.birthdate,
            'description': self.description,
            'profile_image_url': self.profile_image_url,
=======
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
>>>>>>> origin/Home
        }

class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    name = db.Column(db.String(300), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(300), nullable=False)
    price = db.Column(db.String(300), nullable=False)
    pictures = db.Column(db.String(300), nullable=True)
    media = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

=======
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
>>>>>>> origin/Home
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    bands = db.relationship('Band', secondary='band_events', back_populates='events')

    def __repr__(self):
        return '<Event %r>' % self.name

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
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'place_id': self.place_id,
        }

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(300), nullable=False)
    phone = db.Column(db.String(300), unique=True, nullable=True)
    profile_image_url = db.Column(db.String(300), nullable=True)
    banner_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    events = db.relationship('Event', backref='place', lazy=True)

    def __repr__(self):
        return '<Place %r>' % self.name
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'phone': self.phone,
            'profile_image_url': self.profile_image_url,
            'banner_picture': self.banner_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
        }

<<<<<<< HEAD
class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    profile_image_url = db.Column(db.String(300), nullable=True)
    banner_picture = db.Column(db.String(300), nullable=True)
    instagram = db.Column(db.String(300), nullable=True)
    tiktok = db.Column(db.String(300), nullable=True)

    events = db.relationship('Event', backref='band', lazy=True)
    musical_categories = db.relationship('MusicalCategory', secondary='band_musical_category', back_populates='bands')

    members = db.relationship('User', secondary='band_members', backref=db.backref('bands', lazy='dynamic'))

    def __repr__(self):
        return '<Band %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'profile_image_url': self.profile_image_url,
            'banner_picture': self.banner_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
        }

=======
>>>>>>> origin/Home
class Assistance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

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
    title = db.Column(db.String(300), nullable=False)
    comment = db.Column(db.String(300), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

    user = db.relationship('User', backref='reviews', lazy=True)
    event = db.relationship('Event', backref='reviews', lazy=True)

<<<<<<< HEAD
    def __repr__(self):
        return '<Review %r>' % self.title

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'title': self.title,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String(300), nullable=True)
    bands = db.relationship('Band', secondary='band_musical_category', back_populates='musical_categories')
    users = db.relationship('User', secondary='user_favorite_category', back_populates='user_categories')

    def __repr__(self):
        return '<MusicalCategory %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
        }

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

band_members = db.Table('band_members',
    db.Column('band_id', db.Integer, db.ForeignKey('band.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)
=======
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
>>>>>>> origin/Home
