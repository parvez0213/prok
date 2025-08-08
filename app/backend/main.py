from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import models and shared db
from models import db
from models.user import User
# (Import other models as needed)
from api.auth import auth_bp

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
# Allow Vite dev server origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)

# Create a function to initialize the app

def create_app():
    """Application factory function"""
    return app

if __name__ == '__main__':
    app.run(debug=True) 