from flask import Flask, make_response, session, jsonify, request, redirect, url_for
from flask_migrate import Migrate
from config import db, app
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation


# db.init_app(app)

@app.route('/records', methods=['GET', 'POST'])
def records():
    if request.method == 'GET':
        records_list = []
        records = Record.query.all()
        for record in records:
            record_dict = {
                "id": record.id,
                "category": record.category,
                "description": record.description,
                "location": record.location,
                "status": record.status
            }
            records_list.append(record_dict)
        response_body = records_list
        response = make_response(jsonify(response_body), 200)
    elif request.method == 'POST':
        data = request.get_json()
        if data:
            category = data.get('category')
            description = data.get('description')
            location = data.get('location')
            status = data.get('status')
            new_record = Record(category=category, description=description, location=location, status=status)
            
            db.session.add(new_record)
            db.session.commit()
            response_body = {"message": "Record created successfully!"}
            response = make_response(response_body, 200)
        else:
            response_body = {"message": "Input all the required fields!"}
            response = make_response(response_body)
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
                "category": record.category,
                "status": record.status
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

@app.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    if data:
        username = data.get('username')
        phone_number = data.get('phone_number')
        email = data.get('email')
        password = data.get('password')
        new_user = User(
            username= username,
            phone_number = phone_number,
            email=email,
            password_hash=password
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 200
    else:
        return jsonify({'error': 'Invalid data'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 404

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 404

    user = User.query.filter(User.email == email).first()

    if user is None or not user.authenticate(password):
        return jsonify({'error': 'Invalid credentials'}), 404

    session['user_id'] = user.id
    return jsonify({'message': 'Logged in successfully!'}), 200

# Check session for auto-login
@app.route('/check_session')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({'error': 'Invalid credentials'}), 204


# Logout route for both user and Admin
@app.route('/logout', methods=['DELETE'])
def logout():
    # Clear the user_id session variable to log the user out
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/admin/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 404

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials'}), 404

    admin = Admin.query.filter(Admin.email == email).first()

    if admin is None or not admin.authenticate(password):
        return jsonify({'error': 'Invalid credentials'}), 404

    session['user_id'] = admin.id
    return jsonify({'message': 'Logged in successfully!'}), 200

@app.route('/check_session')
def check_session():
    admin = Admin.query.filter(Admin.id == session.get('user_id')).first()
    if admin:
        return jsonify(admin.to_dict())
    else:
        return jsonify({'error': 'Invalid credentials'}), 204
    
@app.route('/geolocations', methods=['GET', 'POST'])
def geolocation():
    if request.method == 'GET':
        geolocations_list = []
        geolocations = Geolocation.query.all()
        for geolocation in geolocations:
            geolocation_dict = {
                "id": geolocation.id,
                "location": geolocation.location,
                "record_id": geolocation.record_id
            }
            geolocations_list.append(geolocation_dict)
        response_body = geolocations_list
        response = make_response(jsonify(response_body), 200)
    elif request.method == 'POST':
        data = request.get_json()
        if data:
            location = data.get('location')
            record_id = data.get('record_id')
            new_geolocation = Geolocation(location=location, record_id=record_id)
            
            db.session.add(new_geolocation)
            db.session.commit()
            response_body = {"message": "Geolocation created successfully!"}
            response = make_response(response_body, 200)
        else:
            response_body = {"message": "Input valid data!"}
            response = make_response(response_body)
    return response

@app.route('/notifications', methods=['GET', 'POST'])
def notification():
    if request.method == 'GET':
        notifications_list = []
        notifications = Notification.query.all()
        for notification in notifications:
            notification_dict = {
                "id": notification.id,
                "message": notification.message,
                "user_id": notification.user_id,
                "record_id": notification.record_id
            }
            notifications_list.append(notification_dict)
        response_body = notifications_list
        response = make_response(jsonify(response_body), 200)
    elif request.method == 'POST':
        data = request.get_json()
        if data:
            notification = data.get('notification')
            user_id = data.get('user_id')
            record_id = data.get('record_id')
            new_notification = Notification(notification=notification, record_id=record_id, user_id=user_id)
            
            db.session.add(new_notification)
            db.session.commit()
            response_body = {"message": "Notification created successfully!"}
            response = make_response(response_body, 200)
        else:
            response_body = {"message": "Input valid data!"}
            response = make_response(response_body)
    return response

@app.route('/record_images', methods=['GET', 'POST'])
def record_images():
    if request.method == 'GET':
        images_list = []
        images = RecordImage.query.all()
        for image in images:
            image_dict = {
                "id": image.id,
                "image_url": image.image_url,
                "record_id": image.record_id
            }
            images_list.append(image_dict)
        response_body = images_list
        response = make_response(jsonify(response_body), 200)
    elif request.method == 'POST':
        data = request.get_json()
        if data:
            image_url = data.get('image_url')
            record_id = data.get('record_id')
            new_image = RecordImage(image_url=image_url, record_id=record_id)
            
            db.session.add(new_image)
            db.session.commit()
            response_body = {"message": "Image created successfully!"}
            response = make_response(response_body, 200)
        else:
            response_body = {"message": "Input valid data!"}
            response = make_response(response_body)
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5555)