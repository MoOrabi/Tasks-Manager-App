from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from models.user import User
from services.auth_service import register_user

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.post("/register")
def register():
    data = request.json
    user, error = register_user(
        data.get("name"),
        data.get("email"),
        data.get("password")
    )

    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.post("/login")
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()

    if not user or not user.check_password(data.get("password")):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"access_token": token})
