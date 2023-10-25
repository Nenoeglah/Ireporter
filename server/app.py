from flask import Flask, make_response, jsonify, request, redirect, url_for
from flask_migrate import Migrate
from config import db, app
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation


db.init_app(app)

migrate = Migrate(app, db)

@app.route('/')
def home():
    return 'Ireporter'

@app.route('/records')
def records():
    records_list = []
    records = Record.query.all()
    for record in records:
        record_dict = {
            "id": record.id,
            "title": record.title,
            "description": record.description,
            "location": record.location,
            "category": record.category
        }
        records_list.append(record_dict)
    response_body = records_list
    response = make_response(jsonify(response_body), 200)
    return response

@app.route('/records/<int:id>', methods = ["GET", "DELETE"])
def record_id(id):
    record = Record.query.filter_by(id=id).first()
    if record:
        if request.method == "GET":
            response_body = {
                "id": record.id,
                "title": record.title,
                "description": record.description,
                "location": record.location,
                "category": record.category
            }
            response = make_response(jsonify(response_body), 200)

        elif response.method == "DELETE":
            db.session.delete(record)
            db.session.commit()
            response_body = {"message": "Record deleted!"}
            response = make_response(response_body, 200)

    else:
        response_body = {"error": "Record not found"}
        response = make_response(jsonify(response_body))

    return response