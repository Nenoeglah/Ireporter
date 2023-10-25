from flask_sqlalchemy import SQLAlchemy, Column, Integer, String, Text, TIMESTAMP, ForeignKey
from datetime import datetime
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
#import bcrypt and db from config to prevent circular imports

# create user table with validations 
class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(10))
    email = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # password stored to `_password_hash` to store hashed password
    password = db.Column(db.String, nullable = False)

    @validates('username')
    def validate_username(self, key, value):
        if not value:
            raise ValueError("Username is required")
        return value
    
    @validates('email')
    def validate_email(self, key, value):
        if not value:
            raise ValueError("Email is required")
        return value
    
    @validates('password')
    def validate_password(self, key, value):
        if not value:
            raise ValueError("Password is required")
        return value
        if len(value) < 20:
            raise ValueError("Passsword must be at least 6 characters long.")
        return value

    
    #Hashing the password
    @hybrid_property #Marks `password_hash` as hybrid; custom getter and setter methods
    def password_hash(self):
        return self._password_hash
    
    #Sets the hashed password
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    #Check if the password is correct when logging in
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))



