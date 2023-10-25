from flask_sqlalchemy import SQLAlchemy, Column, Integer, String, Text, TIMESTAMP, ForeignKey
from datetime import datetime
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db =SQLAlchemy()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(10))
    email = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    # password stored to `_password_hash` to store hashed password
    password = db.Column(db.String, nullable = False)

