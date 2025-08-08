from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import re

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)

    def set_password(self, password):
        if not self.is_password_complex(password):
            raise ValueError("Password does not meet complexity requirements.")
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def is_password_complex(password):
        # At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
        if (len(password) < 8 or
            not re.search(r"[A-Z]", password) or
            not re.search(r"[a-z]", password) or
            not re.search(r"[0-9]", password) or
            not re.search(r"[^A-Za-z0-9]", password)):
            return False
        return True

    def __repr__(self):
        return f'<User {self.username}>'

