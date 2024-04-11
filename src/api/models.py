from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), nullable=False)
    email = db.Column(db.String(500), unique=True, nullable=False)
    username = db.Column(db.String(500), unique=True, nullable=False)
    password = db.Column(db.LargeBinary)
    birthdate = db.Column(db.Date, nullable=True)
    description = db.Column(db.String(500), nullable=True)
    gender = db.Column(db.String(500), nullable=True)
    city = db.Column(db.String(500), nullable=True)
    profile_image_url = db.Column(db.String(500), unique=False, nullable=True)
    banner_picture = db.Column(db.String(500), nullable=True)
    instagram = db.Column(db.String(500), nullable=True)
    tiktok = db.Column(db.String(500), nullable=True)
    created_events = db.relationship('Event', backref='creator', lazy=True)
    assistances = db.relationship('Assistance', backref='user_assistances', lazy=True)

    user_categories = db.relationship('MusicalCategory', secondary='user_favorite_category', back_populates='users')

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            'id': self.id,
            'is_active': self.is_active,
            'email': self.email,
            'username': self.username,
            'birthdate': self.birthdate,
            'description': self.description,
            'profile_image_url': self.profile_image_url,
            'banner_picture': self.banner_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'city': self.city,
            'gender': self.gender,
            'created_events': [event.serialize() for event in self.created_events],
            'assistances': [assistance.serialize() for assistance in self.assistances],
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Integer, nullable=True)
    picture_url = db.Column(db.String(500), nullable=True)
    instagram = db.Column(db.String(500), nullable=True)
    tiktok = db.Column(db.String(500), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    assistances = db.relationship('Assistance', backref='event_assistances', lazy=True)
    media = db.relationship('Media', backref='event', lazy=True)

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey('band.id'), nullable=True)

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
            'picture_url': self.picture_url,
            'media': [m.serialize() for m in self.media],
            'instagram': self.instagram,
            'tiktok': self.tiktok,
            'place_id': self.place_id,
            'band_id': self.band_id,
            'creator_id': self.creator_id,
            'assistances': [assistance.serialize() for assistance in self.assistances],
            
            
        }

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'url': self.url,
            'event_id': self.event_id,
        }    

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    address = db.Column(db.String(500), nullable=False)
    phone = db.Column(db.String(500), unique=True, nullable=True)
    profile_picture = db.Column(db.String(500), nullable=True)
    banner_picture = db.Column(db.String(500), nullable=True)
    instagram = db.Column(db.String(500), nullable=True)
    tiktok = db.Column(db.String(500), nullable=True)

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
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
        }

class Band(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    profile_picture = db.Column(db.String(500), nullable=True)
    banner_picture = db.Column(db.String(500), nullable=True)
    instagram = db.Column(db.String(500), nullable=True)
    tiktok = db.Column(db.String(500), nullable=True)

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
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'instagram': self.instagram,
            'tiktok': self.tiktok,
        }

class Assistance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

    # user = db.relationship('User', backref='assistances', lazy=True)
    # event = db.relationship('Event', backref='assistances', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)

    # user = db.relationship('User', backref='reviews', lazy=True)
    # event = db.relationship('Event', backref='reviews', lazy=True)

    def __repr__(self):
        return '<Review %r>' % self.title

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'event_id': self.event_id,
        }

class MusicalCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), unique=True, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
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