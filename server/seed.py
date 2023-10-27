from config import db
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation
from app import app

def seed_data():
    # Create user accounts
    users = [
        {"id": 1, "username": "Georgia", "_password_hash": "password1", "phone_number": "+254 723456789", "email": "georgia@georgia.com"},
        {"id": 2, "username": "Ginny", "_password_hash": "password2", "phone_number": "+254 787654321", "email": "ginny@ginny.com"},
        {"id": 3, "username": "Jace", "_password_hash": "password3", "phone_number": "+254 79876543", "email": "jace@jace.com"},
    ]

    # Create admin account
    admin = [
        {"id": 1, "username": "Kityy", "_password_hash": "adminpassword", "phone_number": "+254 711121314", "email": "kitty@kitty.com"},
    ]

    # Create records
    records = [
        {
            "id": 1,
            "user_id": 1,
            "admin_id": 1,
            "location": "Nairobi",
            "type": "Red Flag",
            "status": "Under Investigation",
            "category": "Goverment sector",
            "description": "This is a corruption incident in the government sector.",
        },
        {
            "id": 2,
            "user_id": 2,
            "admin_id": 1,
            "location": "Nairobi",
            "type": "Intervention",
            "status": "Resolved",
            "category": "Environmental pollution",
            "description": "Environmental pollution is a major issue affecting Africa.",
        },
    ]

    # Create record images
    record_images = [
        {"id": 1, "record_id": 1, "image_url": "https://i.pinimg.com/564x/1c/25/1b/1c251b42de9694ab195291a23e78ffc0.jpg"},
        {"id": 2, "record_id": 2, "image_url": "https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg"},
    ]

    # Create record videos
    record_videos = [
        {"id": 1, "record_id": 1, "video_url": "https://www.youtube.com/watch?v=6T_PjEXlLBs"},
        {"id": 2, "record_id": 2, "video_url": "https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg"},
    ]

    # Create notifications
    notifications = [
        {"id": 1, "user_id": 1, "record_id": 1, "message": "Notification message 1"},
        {"id": 2, "user_id": 2, "record_id": 2, "message": "Notification message 2"},
    ]

    # Create geolocations
    geolocations = [
        {"id": 1, "record_id": 1, "location": "40.7128,-74.0060"},
        {"id": 2, "record_id": 2, "location": "34.0522,-118.2437"},
    ]

    # Add records to the database session
    for user_data in users:
        user = User(**user_data)
        db.session.add(user)

    for admin_data in admin:
        admin_account = Admin(**admin_data)
        db.session.add(admin_account)

    for record_data in records:
        record = Record(**record_data)
        db.session.add(record)

    for image_data in record_images:
        image = RecordImage(**image_data)
        db.session.add(image)

    for video_data in record_videos:
        video = RecordVideo(**video_data)
        db.session.add(video)

    for notification_data in notifications:
        notification = Notification(**notification_data)
        db.session.add(notification)

    for geolocation_data in geolocations:
        geolocation = Geolocation(**geolocation_data)
        db.session.add(geolocation)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()
print("Database seeded successfully.")
