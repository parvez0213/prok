from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from flask_jwt_extended import create_access_token
import re
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    # Basic input validation
    if not username or not email or not password:
        return jsonify({'message': 'All fields are required.'}), 400
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'message': 'Invalid email address.'}), 400
    if not User.is_password_complex(password):
        return jsonify({'message': 'Password does not meet complexity requirements.'}), 400

    # Uniqueness check
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered.'}), 400

    try:
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully.'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists.'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('username') or data.get('email')
    password = data.get('password', '')

    if not identifier or not password:
        return jsonify({'message': 'Username/email and password are required.'}), 400

    # Find user by username or email
    user = User.query.filter((User.username == identifier) | (User.email == identifier)).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Incorrect credentials.'}), 401

    # Generate JWT token
    token = create_access_token(identity=user.id)
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email
    }
    return jsonify({'token': token, 'user': user_data}), 200 