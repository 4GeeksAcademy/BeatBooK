"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Place, Band, Review, Assistance, MusicalCategory,Media
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
import bcrypt
import cloudinary
from cloudinary.uploader import upload
import cloudinary.api
import os


cloudinary.config( 
  cloud_name = "daxbjkj1j", 
 api_key = os.environ["CLOUDINARY_API_KEY"], 
  api_secret = os.environ["CLOUDINARY_API_SECRET"]  
)
  
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#SUBIR JSONs DE GOLPE#

@api.route('/upload_users', methods=['POST'])
def upload_users():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for user_data in data:
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), salt)
            user = User(
                email=user_data['email'],
                username=user_data['username'],
                password=hashed_password,
                birthdate=user_data['birthdate'],
                description=user_data['description'],
                gender=user_data['gender'],
                city=user_data['city'],
                profile_image_url=user_data['profile_image_url'],
                banner_picture=user_data['banner_picture'],
                instagram=user_data['instagram'],
                tiktok=user_data['tiktok'],
                is_active=user_data['is_active']
            )
            db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Datos de usuarios subidos correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/upload_bands', methods=['POST'])
def upload_bands():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for band_data in data:
            existing_band = Band.query.filter_by(name=band_data['name']).first()
            if existing_band:
                continue
            band = Band(
                name=band_data['name'],
                description=band_data['description'],
                profile_picture=band_data('profile_picture'),
                banner_picture=band_data('banner_picture'),
                instagram=band_data('instagram'),
                tiktok=band_data('tiktok')
            )
            db.session.add(band)
        db.session.commit()
        return jsonify({'message': 'Datos de bandas subidos correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/upload_events', methods=['POST'])
def upload_events():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for event_data in data:
            
            type(event_data['price'])
            
            event = Event(
                name=event_data['name'],
                date=event_data['date'],
                description=event_data['description'],
                address=event_data['address'],
                price=event_data['price'],
                picture_url=event_data['picture_url'],
                instagram=event_data['instagram'],
                tiktok=event_data['tiktok']
            )
            db.session.add(event)
        db.session.commit()
        return jsonify({'message': 'Eventos subidos correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/upload_places', methods=['POST'])
def upload_places():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for place_data in data:
            place = Place(
                name=place_data['name'],
                description=place_data['description'],
                address=place_data['address'],
                phone=place_data['phone'],
                profile_picture=place_data.get('profile_picture'),
                banner_picture=place_data.get('banner_picture'),
                instagram=place_data.get('instagram'),
                tiktok=place_data.get('tiktok')
            )
            db.session.add(place)
        db.session.commit()
        return jsonify({'message': 'Lugares subidos correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/upload_reviews', methods=['POST'])
def upload_reviews():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for review_data in data:
            review = Review(
                user_id=review_data['user_id'],
                event_id=review_data['event_id'],
                rating=review_data['rating'],
                title=review_data['title'],
                comment=review_data['comment']
            )
            db.session.add(review)
        db.session.commit()
        return jsonify({'message': 'Reseñas subidas correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/upload_assistances', methods=['POST'])
def upload_assistances():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for assistance_data in data:
            assistance = Assistance(
                user_id=assistance_data['user_id'],
                event_id=assistance_data['event_id']
            )
            db.session.add(assistance)
        db.session.commit()
        return jsonify({'message': 'Asistencias subidas correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/upload_categories', methods=['POST'])
def upload_categories():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({'error': 'El cuerpo de la solicitud debe ser una lista JSON'}), 400
        for category_data in data:
            category = MusicalCategory(
                name=category_data['name'],
                description=category_data['description'],
                image_url=category_data['image_url']
            )
            db.session.add(category)
        db.session.commit()
        return jsonify({'message': 'Categorías subidas correctamente'}), 200
    except KeyError as e:
        return jsonify({'error': f'Falta el campo requerido: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#LOGIN Y PRIVADOS#
@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()
    # Genera una sal
    salt = bcrypt.gensalt()
    # Hashea la contraseña
    hashed_password = bcrypt.hashpw(request_body["password"].encode('utf-8'), salt)
    # Convierte los bytes a una cadena
    # hashed_password_str = hashed_password.decode()

    if not 'username'in request_body:
        return jsonify("Username is required"), 400
    if not 'email'in request_body:
        return jsonify("Email is required"), 400
    if not 'password'in request_body:
        return jsonify("Password is required"), 400
    if not 'password_confirmation'in request_body:
        return jsonify("Password confirmation is required"), 400
    
    user = User(username=request_body["username"],email=request_body["email"], password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    # Genera un token para el nuevo usuario
    access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'User created', 'token': access_token }), 200


@api.route('/log_in', methods=['POST'])
def log_in():
    request_body = request.get_json()
    if not 'email' in request_body:
        return jsonify("Email is required"), 400
    if not 'password' in request_body:
        return jsonify("Password is required"), 400
    user = User.query.filter_by(email=request_body["email"]).first()
    if user is None or not bcrypt.checkpw(request_body["password"].encode('utf-8'), user.password):
        return jsonify("Invalid email or password"), 400
    # Genera un token para el usuario que inició sesión
    access_token = create_access_token(identity=str(user.id))
    return jsonify({ 'message': 'Logged in successfully', 'token': access_token, 'email': user.email, 'username': user.username }), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    # Serializar las categorías del usuario manualmente
    user_categories_serialized = []
    for category in user.user_categories:
        user_categories_serialized.append({
            "id": category.id,
            "name": category.name,
            
        })

      # Serializar la banda creada por el usuario si existe
    created_band_serialized = None
    if user.created_band:
        created_band_serialized = {
            "id": user.created_band.id,
            "name": user.created_band.name,
            "profile_picture": user.created_band.profile_picture
        }
    
 
    return jsonify({
        "id": user.id, 
        "email": user.email,
        "username": user.username,
        "description": user.description,
        "birthdate": user.birthdate,
        "gender": user.gender,
        "city": user.city,
        "created_events": user.created_events,
        "profile_image_url": user.profile_image_url,
        "banner_picture": user.banner_picture,
        "instagram": user.instagram,
        "tiktok": user.tiktok,
        "user_categories": user_categories_serialized, 
        "created_band": created_band_serialized
       
    }), 200

@api.route('/upload_profile_image', methods=['POST'])
@jwt_required()
def upload_profile_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    file = request.files['image']
    upload_result = upload(file)
    url = upload_result['url']
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    user.profile_image_url = url
    db.session.commit()
    return jsonify({"message": "Profile image uploaded successfully", "url": url}), 200

@api.route('/upload_banner_image', methods=['POST'])
@jwt_required()
def upload_banner_image():
    if 'banner' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['banner']
    upload_result = upload(file)
    url = upload_result['url']
    
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    user.banner_picture = url
    db.session.commit()
    
    return jsonify({"message": "Banner image uploaded successfully", "url": url}), 200

#USER#

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    return jsonify(users), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    request_body = request.get_json()
    # user.email = request_body['email'] or user.email # ctrl + c + k para comentar multiples lineas
    # user.username = request_body['username'] or user.username # se debe mantener asi para que no de conflicto con la edicion del perfil!!!!!!
    user.birthdate = request_body['birthdate'] or user.birthdate
    user.description = request_body['description'] or user.description
    user.gender = request_body['gender'] or user.gender
    user.city = request_body['city'] or user.city
    user.profile_image_url = request_body['profile_image_url'] or user.profile_image_url
    user.banner_picture = request_body['banner_picture'] or user.banner_picture
    user.instagram = request_body['instagram'] or user.instagram 
    user.tiktok = request_body['tiktok'] or user.tiktok 
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>/assistance', methods=['GET'])
def get_user_assistance(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    assistances = user.assistances
    events = []
    for assistance in assistances:
        event = assistance.event
        if event:
            events.append(event.serialize())
    return jsonify(events), 200

@api.route('/users/<int:user_id>/favorite_categories', methods=['GET'])
def get_user_favorite_categories(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    categories = user.user_categories
    categories = list(map(lambda x: x.serialize(), categories))
    return jsonify(categories), 200

@api.route('/users/<int:user_id>/favorite_categories', methods=['POST'])
def add_user_favorite_category(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    request_body = request.get_json()
    category_id = request_body['category_id']
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    user.user_categories.append(category)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>/favorite_categories/<int:category_id>', methods=['DELETE'])
def remove_user_favorite_category(user_id, category_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    user.user_categories.remove(category)
    db.session.commit()
    return jsonify(user.serialize()), 200

#BANDS#

@api.route('/bands', methods=['GET']) 
def get_all_bands():
    bands = Band.query.all()
    if not bands:
            return jsonify({"message": "No se encontraron bandas"}), 404    
    bands_json = [band.serialize() for band in bands]
    return jsonify(bands_json)

@api.route('/bands/<int:band_id>', methods=['GET'])
def get_single_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    return jsonify(band.serialize(members_only=True)), 200


@api.route('/bands', methods=['POST'])
def create_band():
    data = request.json
    band = Band(
        name=data.get('name'),
        description=data.get('description'),
        profile_picture=data.get('profile_picture'),
        banner_picture=data.get('banner_picture'),
        instagram=data.get('instagram'),
        tiktok=data.get('tiktok'),
        creator_id=data.get('creator_id')
    )
    db.session.add(band)
    db.session.commit()
    return jsonify(band.serialize()), 201

@api.route('/bands/<int:band_id>', methods=['PUT'])
def update_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    data = request.json
    band.name = data.get('name')
    band.description = data.get('description')
    band.profile_picture = data.get('profile_picture')
    band.banner_picture = data.get('banner_picture')
    band.instagram = data.get('instagram')
    band.tiktok = data.get('tiktok')
    db.session.commit()
    return jsonify(band.serialize()), 200

@api.route('/bands/<int:band_id>', methods=['DELETE'])
def delete_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    db.session.delete(band)
    db.session.commit()
    return jsonify(band.serialize()), 200

@api.route('/bands/<int:band_id>/members', methods=['GET'])
def get_band_members(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    members = band.members
    members_data = [member.serialize() for member in members]
    return jsonify(members_data), 200

@api.route('/bands/<int:band_id>/add_member', methods=['POST'])
def add_band_member(band_id):
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404
        data = request.json
        user_id = data.get('user_id')
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user.band_id:
            return jsonify({"message": "El usuario ya es miembro de otra banda"}), 400
        user.band_id = band_id
        db.session.commit()
        return jsonify({"message": "Usuario añadido correctamente a la banda"}), 200

@api.route('/bands/<int:band_id>/member/<int:user_id>', methods=['DELETE'])
def remove_band_member(band_id, user_id):
    band = Band.query.get(band_id)
    if band:
        member = User.query.filter_by(id=user_id, band_id=band_id).first()
        if member:
            db.session.delete(member)
            db.session.commit()
            return jsonify({'message': 'Miembro eliminado correctamente'}), 200
        else:
            return jsonify({'message': 'Miembro no encontrado en la banda'}), 404
    else:
        return jsonify({'message': 'Banda no encontrada'}), 404
    
@api.route('/bands/<int:band_id>/events', methods=['GET'])
def get_band_events(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404
    events = band.events
    events_data = [event.serialize() for event in events]
    return jsonify(events_data), 200

#EVENTOS#

@api.route('/events', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200

@api.route('/events/<int:event_id>', methods=['GET'])
def get_single_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    return jsonify(event.serialize()), 200

@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    request_body = request.get_json()

    picture_url = request_body.get('picture_url', None)

    # Crear objetos Media a partir de las URLs de medios
    media_urls = request_body.get('media', [])
    media_objects = [Media(url=url) for url in media_urls]

    event = Event(
        name=request_body['name'], 
        date=request_body['date'], 
        description=request_body['description'], 
        address=request_body['address'], 
        price=request_body['price'], 
        picture_url=picture_url,  # Usar la URL de la imagen subida a Cloudinary
        media=media_objects,  # Asignar los objetos Media a la relación media
        instagram=request_body.get('instagram', None),
        tiktok=request_body.get('tiktok', None),
        youtube=request_body.get('youtube', None),
        creator_id=request_body.get('creator_id', None),
        place_id=request_body.get('place_id', None),
        band_id=request_body.get('band_id', None)
    )
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
    event.picture_url = request_body['picture_url']
    event.media = request_body['media']
    event.instagram = request_body['instagram']
    event.tiktok = request_body['tiktok']
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

@api.route('/events/<int:event_id>/assistances', methods=['GET'])
def get_event_assistances(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    assistances = event.assistances
    assistances = list(map(lambda x: x.serialize(), assistances))
    return jsonify(assistances), 200

@api.route('/events/<int:event_id>/reviews', methods=['GET'])
def get_event_reviews(event_id):
    event = Event.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    reviews = event.reviews
    reviews = list(map(lambda x: x.serialize(), reviews))
    return jsonify(reviews), 200

@api.route('/events/<int:event_id>/add_assistances', methods=['POST'])
def add_assistance(event_id):
    request_body = request.get_json()
    user_id = request_body['user_id']
    existing_assistance = Assistance.query.filter_by(user_id=user_id).first()
    if existing_assistance:
        return jsonify({"message": "User is already attending an event"}), 400
    assistance = Assistance(user_id=user_id, event_id=event_id)
    db.session.add(assistance)
    db.session.commit()
    return jsonify(assistance.serialize()), 201

@api.route('/events/<int:event_id>/remove_assistances', methods=['DELETE'])
def remove_assistance(event_id):
    request_body = request.get_json()
    user_id = request_body['user_id']
    assistance = Assistance.query.filter_by(user_id=user_id, event_id=event_id).first()
    if assistance is None:
        return jsonify({"message": "User is not attending this event"}), 404
    db.session.delete(assistance)
    db.session.commit()
    return jsonify(assistance.serialize()), 200

@api.route('/upload_event_picture', methods=['POST'])
@jwt_required()
def upload_event_picture():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    file = request.files['image']
    event_id = request.form.get('event_id')  # Obtiene el ID del evento desde el formulario
    upload_result = upload(file)
    url = upload_result['url']
    event = Event.query.get(event_id)  # Busca el evento por ID
    if event is None:
        return jsonify({"error": "Event not found"}), 404
    event.picture_url = url
    db.session.commit()
    return jsonify({"message": "Event picture uploaded successfully", "url": url}), 200

@api.route('/upload_event_media', methods=['POST'])
@jwt_required()
def upload_event_media():
    if 'images' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    try:
        event_id = int(request.form.get('event_id'))  # Convertir event_id a un entero
    except ValueError:
        return jsonify({"error": "Invalid event_id"}), 400

    print(f"Received event_id: {event_id}")  # Debug print

    urls = []
    for image in request.files.getlist('images'):
        upload_result = upload(image)
        print(f"Upload result: {upload_result}")  # Debug print
        url = upload_result['url']
        media = Media(url=url, event_id=event_id)
        db.session.add(media)
        urls.append(url)

    db.session.commit()
    print("Database commit successful")  # Debug print
    return jsonify({"message": "Upload successful"}), 200
#PLACES#

@api.route('/places', methods=['GET'])
def get_all_places():
    places = Place.query.all()
    serialized_places = [place.serialize() for place in places]
    return jsonify(serialized_places), 200

@api.route('/places/<int:place_id>', methods=['GET'])
def get_single_place(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    return jsonify(place.serialize()), 200

@api.route('/places', methods=['POST'])
def create_place():
    request_body = request.get_json()
    place = Place(
        name=request_body['name'],
        description=request_body['description'],
        address=request_body['address'],
        phone=request_body['phone'],
        profile_image_url=request_body['profile_image_url'],
        banner_picture=request_body['banner_picture'],
        instagram=request_body['instagram'],
        tiktok=request_body['tiktok']
    )
    db.session.add(place)
    db.session.commit()
    return jsonify(place.serialize()), 201

@api.route('/places/<int:place_id>', methods=['PUT'])
def update_place(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    request_body = request.get_json()
    place.name = request_body['name']
    place.description = request_body['description']
    place.address = request_body['address']
    place.phone = request_body['phone']
    place.profile_picture = request_body['profile_picture']
    place.banner_picture = request_body['banner_picture']
    place.instagram = request_body['instagram']
    place.tiktok = request_body['tiktok']
    db.session.commit()
    return jsonify(place.serialize()), 200

@api.route('/places/<int:place_id>', methods=['DELETE'])
def delete_place(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    db.session.delete(place)
    db.session.commit()
    return jsonify(place.serialize()), 200

@api.route('/places/<int:place_id>/events', methods=['GET'])
def get_place_events(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    events = place.events
    events = list(map(lambda x: x.serialize(), events))
    return jsonify(events), 200

@api.route('/places/<int:place_id>/music_categories', methods=['GET'])
def get_place_music_categories(place_id):
    place = Place.query.get(place_id)
    if place is None:
        raise APIException('Place not found', status_code=404)
    events = place.events
    unique_categories = set()
    for event in events:
        bands = event.band
        if isinstance(bands, Band):
            bands = [bands]
        for band in bands:
            categories = band.musical_categories
            unique_categories.update(categories)
    serialized_categories = [category.serialize() for category in unique_categories]
    return jsonify(serialized_categories), 200

#REVIEWS#

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
    review = Review(
        user_id=request_body['user_id'],
        event_id=request_body['event_id'],
        title=request_body['title'],
        rating=request_body['rating'], 
        comment=request_body['comment']
        )
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
    review.title = request_body['title']
    review.comment = request_body['comment']
    review.user_id = request_body['user_id']
    review.event_id = request_body['event_id']
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

#CATEGORIAS MUSICALES#

@api.route('/musical_categories', methods=['GET'])
def get_all_musical_categories():
    categories = MusicalCategory.query.all()
    categories = list(map(lambda x: x.serialize(), categories))
    return jsonify(categories), 200

@api.route('/musical_categories/<int:category_id>', methods=['GET'])
def get_single_musical_category(category_id):
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    return jsonify(category.serialize()), 200

@api.route('/musical_categories', methods=['POST'])
def create_musical_category():
    request_body = request.get_json()
    category = MusicalCategory(
        name=request_body['name'],
        description=request_body['description'],
        image_url=request_body['image_url']
    )
    db.session.add(category)
    db.session.commit()
    return jsonify(category.serialize()), 201

@api.route('/musical_categories/<int:category_id>', methods=['PUT'])
def update_musical_category(category_id):
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    request_body = request.get_json()
    category.name = request_body['name']
    category.description = request_body['description']
    category.image_url = request_body['image_url']
    db.session.commit()
    return jsonify(category.serialize()), 200

@api.route('/musical_categories/<int:category_id>', methods=['DELETE'])
def delete_musical_category(category_id):
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    db.session.delete(category)
    db.session.commit()
    return jsonify(category.serialize()), 200

@api.route('/musical_categories/<int:category_id>/bands', methods=['GET'])
def get_musical_category_bands(category_id):
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    bands = category.bands
    bands = list(map(lambda x: x.serialize(), bands))
    return jsonify(bands), 200

@api.route('/musical_categories/<int:category_id>/events', methods=['GET'])
def get_musical_category_events(category_id):
    category = MusicalCategory.query.get(category_id)
    if category is None:
        raise APIException('Category not found', status_code=404)
    
    events = []
    for band in category.bands:
        band_events = Event.query.filter_by(band_id=band.id).all()
        events.extend(band_events)

    serialized_events = [event.serialize() for event in events]
    return jsonify(serialized_events), 200

# Ruta para asignar categorías musicales a un usuario
@api.route('/user/<int:user_id>/categories', methods=['POST'])
def assign_category_to_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json
    if not data or 'category_id' not in data:
        return jsonify({'message': 'Data format error'}), 400

    category_id = data['category_id']
    category = MusicalCategory.query.get(category_id)
    if not category:
        return jsonify({'message': 'Category not found'}), 404

    # Asigna la categoría musical al usuario
    user.user_categories.append(category)
    db.session.commit()

    return jsonify({'message': 'Category assigned successfully'}), 200

@api.route('/user/<int:user_id>/categories', methods=['DELETE'])
def delete_category_from_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json
    if not data or 'category_id' not in data:
        return jsonify({'message': 'Data format error'}), 400

    category_id = data['category_id']
    category = MusicalCategory.query.get(category_id)
    if not category:
        return jsonify({'message': 'Category not found'}), 404

    # Verifica si la categoría está asignada al usuario
    if category not in user.user_categories:
        return jsonify({'message': 'Category is not assigned to the user'}), 400

    # Elimina la categoría musical del usuario
    user.user_categories.remove(category)
    db.session.commit()

    return jsonify({'message': 'Category removed successfully'}), 200