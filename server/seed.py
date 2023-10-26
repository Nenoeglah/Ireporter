from faker import Faker
from sqlalchemy import func
from app import app
from models import db, User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation  
import random

fake = Faker()

