"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Band, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import bcrypt

import os
          

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#----------------------------Creacion de banda--------------------------------------------------------------------------------------------------------#
@api.route('/band', methods=['POST'])
def create_band():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    profile_picture = data.get('profile_picture')
    banner_picture = data.get('banner_picture')
    social_networks = data.get('social_networks')

    if not name or not email or not profile_picture or not banner_picture or not social_networks:
        return jsonify({'message': 'Todos los campos son requeridos'}), 400

    new_band = Band(name=name, email=email, profile_picture=profile_picture, banner_picture=banner_picture, social_networks=social_networks)
    db.session.add(new_band)
    db.session.commit()

    return jsonify({'message': 'Banda creada exitosamente', 'band_id': new_band.id}), 201
#----------------------------Creacion de banda--------------------------------------------------------------------------------------------------------#

#Obtener todas las bandas
@api.route('/bands', methods=['GET']) 
def all_bands():
    
    bands = Band.query.all()        #instancias de Band desde la base de datos
    if not bands:
            return jsonify({"message": "No se encontraron bandas"}), 404
    
    bands_json = [band.serialize() for band in bands]           # Serializar Band en formato JSON

    return jsonify(bands_json)
#----------------------------------------------------#

#Obtener solo una banda
@api.route('/band/<int:band_id>', methods=['GET'])
def get_band(band_id):
    band = Band.query.get(band_id)
    if not band:
        return jsonify({"message": "Banda no encontrada"}), 404

    return jsonify({
        "id": band.id, 
        "email": band.email,
        "profile_picture": band.profile_picture,
        "social_networks": band.social_networks,
        "users": [user.serialize() for user in band.users],  # Serializar los usuarios
    }), 200
#----------------------------------------------------#

#obtener los usuarios de una banda  Preguntar si lo manejamos asi o con el endpoint anterior
#@api.route('/bands/<int:band_id>/users', methods=['GET'])
#def get_band_users(band_id):
    
        #band = Band.query.get(band_id)
        #if band is None:
        #    return jsonify({"message": "No se encontró la banda"}), 404

         # Serializar los usuarios de la banda en formato JSON
        #users_json = [user.serialize() for user in band.users]

        # Devolver los usuarios en formato JSON
        #return jsonify(users_json), 200
#----------------------------------------------------#

#Actualizar una banda
@api.route('/band/<int:band_id>', methods=['POST'])
def update_band(band_id):
    
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404
        
        data = request.json
        
        # Actualizar los atributos de la banda con los datos proporcionados
        band.name = data.get('name', band.name)
        band.email = data.get('email', band.email)
        band.profile_picture = data.get('profile_picture', band.profile_picture)
        band.banner_picture = data.get('banner_picture', band.banner_picture)
        band.social_networks = data.get('social_networks', band.social_networks)
        
        db.session.commit()
        
        # Devolver la banda actualizada en formato JSON
        return jsonify(band.serialize()), 200
#----------------------------------------------------#

#Borrar una banda 
@api.route('/band/<int:band_id>', methods=['DELETE'])
def delete_band(band_id):

        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404

        db.session.delete(band)
        db.session.commit()
        return jsonify({"message": "Banda eliminada correctamente"}), 200
#----------------------------------------------------#


@api.route('/band/<int:band_id>/add_member', methods=['POST'])
def add_member_to_band(band_id):
   
        band = Band.query.get(band_id)
        if not band:
            return jsonify({"message": "Banda no encontrada"}), 404

        # Obtener los datos del miembro a añadir desde el cuerpo de la solicitud
        data = request.json
        user_id = data.get('user_id')

        # Verificar si el usuario existe
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Verificar si el usuario ya es miembro de otra banda
        if user.band_id:
            return jsonify({"message": "El usuario ya es miembro de otra banda"}), 400

        
        user.band_id = band_id
        db.session.commit()

        return jsonify({"message": "Usuario añadido correctamente a la banda"}), 200


