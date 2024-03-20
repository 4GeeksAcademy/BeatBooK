"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
import bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/sign_up', methods=['POST'])
def sign_up():
    request_body = request.get_json()
    # Genera una sal
    salt = bcrypt.gensalt()
    # Hashea la contraseña
    hashed_password = bcrypt.hashpw(request_body["password"].encode(), salt)
    # Convierte los bytes a una cadena
    hashed_password_str = hashed_password.decode()

    if not 'username'in request_body:
        return jsonify("Username is required"), 400
    if not 'email'in request_body:
        return jsonify("Email is required"), 400
    if not 'password'in request_body:
        return jsonify("Password is required"), 400
    if not 'password_confirmation'in request_body:
        return jsonify("Password confirmation is required"), 400
    
    user = User(username=request_body["username"],email=request_body["email"], password=hashed_password_str, is_active=True)
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

    if user is None or not bcrypt.checkpw(request_body["password"].encode(), user.password.encode()):
        return jsonify("Invalid email or password"), 400

    # Genera un token para el usuario que inició sesión
    access_token = create_access_token(identity=str(user.id))

    return jsonify({ 'message': 'Logged in successfully', 'token': access_token, 'email': user.email }), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"id": user.id, "email": user.email ,"username":user.username}), 200