from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import models
from models.user import User, db as user_db
from models.profile import Profile, Skill, Experience, Education, db as profile_db

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
# Configure CORS using environment variable ALLOWED_ORIGINS
ALLOWED_ORIGINS = os.getenv(
    'ALLOWED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173,https://your-frontend-url.onrender.com'
).split(',')

CORS(
    app,
    origins=ALLOWED_ORIGINS,
    methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'],
    supports_credentials=True,
    max_age=3600,
)

# Initialize database
db = SQLAlchemy(app)

def setup_database():
    """Setup database tables"""
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

# Create a function to initialize the app
def create_app():
    """Application factory function"""
    return app

if __name__ == '__main__':
    # Setup database tables
    setup_database()
    
    # Run the app
    app.run(debug=True) 