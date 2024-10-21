from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import User
from ..schemas.user import UserSchema
from ..utils.auth import hash_password, verify_password
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError
from flask import Blueprint, request, jsonify
from app.models import UserPreferences


bp = Blueprint('auth', __name__)
user_schema = UserSchema()

@bp.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    errors = user_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    # Check for missing fields
    if not first_name or not last_name or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    password_hash = hash_password(password)

    new_user = User(first_name=first_name, last_name=last_name, email=email, password_hash=password_hash)

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        # Check if the error is due to email already existing
        if 'email' in str(e.orig):
            return jsonify({"message": "Email already exists"}), 409
        return jsonify({"message": "Database error"}), 500

    return user_schema.dump(new_user), 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()

    is_valid = verify_password(password, user.password_hash)
    print(is_valid)


    if user and verify_password(password, user.password_hash):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401




# Route pour créer les préférences d'un utilisateur
@bp.route('/preferences', methods=['POST'])
def create_preferences():
    data = request.get_json()
    new_preferences = UserPreferences(
        user_id=data['user_id'],
        style=data.get('style'),
        colors=data.get('colors'),
        disliked_colors=data.get('disliked_colors'),
        furniture=data.get('furniture'),
        size=data.get('size'),
        layout=data.get('layout'),
        budget=data.get('budget'),
        additional_notes=data.get('additional_notes')
    )
    db.session.add(new_preferences)
    db.session.commit()
    return jsonify({"message": "Preferences created", "preferences_id": new_preferences.id}), 201