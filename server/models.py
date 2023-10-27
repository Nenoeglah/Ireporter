

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from datetime import datetime
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(10))
    email = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    password = db.Column(db.String, nullable=False)
    records = relationship('Record', backref="user_records")

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
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        return value

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

# create admin table with validations 
class Admin(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(10))
    email = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    password = db.Column(db.String, nullable=False)
    records = relationship('Record', backref="admin_records")

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
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        return value

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

# create record table with validations and relationships
class Record(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String)
    description = db.Column(db.Text)
    status = db.Column(db.String)
    type = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    location = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))

    user = relationship(User, back_populates='records', overlaps="user_records")
    admin = relationship(Admin, back_populates='records', overlaps="admin_records")
    
    record_images = relationship('RecordImage', backref='record')
    record_videos = relationship('RecordVideo', backref='record')
    notifications = relationship('Notification', backref='record')
    geolocation = relationship('Geolocation', backref='record')

    def serialize(self):
        return {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'status': self.status
        }
    
    @validates('category')
    def validate_category(self, value):
        if not value:
            raise ValueError("Choose a category!")
        return value
    
    @validates('description')
    def validate_description(self, key, value):
        if not value:
            raise ValueError("Description is required")
        return value

class RecordImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'))

class RecordVideo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_url = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'))

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    message = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'))

class Geolocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'))
