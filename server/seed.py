from app import db
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation

def seed_data():
    # Create user accounts
    user1 = User(id=1, username="Georgia", password="password1", phone_number="123456789", email="georgia@georgia.com")
    user2 = User(id=2, username="Ginny", password="password2", phone_number="987654321", email="ginny@ginny.com")
    user3 = User(id=3, username="Jace", password="password3", phone_number="555555555", email="jace@jace.com")

    # Create admin account
    admin = Admin(id=1, username="AdminUsername", password="adminpassword", phone_number="888888888", email="kitty@kitty.com")

    # Create records
    record1 = Record(
        id=1,
        user_id=1,
        admin_id=1,
        location="40.7128,-74.0060",
        type="Red Flag",
        status="Under Investigation",
        description="This is a corruption incident in the government sector.",
    )

    record2 = Record(
        id=2,
        user_id=2,
        admin_id=1,
        location="34.0522,-118.2437",
        type="Intervention",
        status="Resolved",
        description="Environmental pollution is a major issue affecting Africa.",
    )

    # Create record images and videos
    record_image1 = RecordImage(id=1, record_id=1, image_url="https://i.pinimg.com/564x/1c/25/1b/1c251b42de9694ab195291a23e78ffc0.jpg")
    record_video1 = RecordVideo(id=1, record_id=1, video_url="https://www.youtube.com/watch?v=6T_PjEXlLBs")

    record_image2 = RecordImage(id=2, record_id=2, image_url="https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg")
    record_video2 = RecordVideo(id=2, record_id=2, video_url="https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg")

    # Create notifications
    notification1 = Notification(id=1, user_id=1, record_id=1, message="Notification message 1")
    notification2 = Notification(id=2, user_id=2, record_id=2, message="Notification message 2")

    # Create geolocations
    geolocation1 = Geolocation(id=1, record_id=1, location="40.7128,-74.0060")
    geolocation2 = Geolocation(id=2, record_id=2, location="34.0522,-118.2437")

    # Add records to the database session
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(admin)
    db.session.add(record1)
    db.session.add(record2)
    db.session.add(record_image1)
    db.session.add(record_video1)
    db.session.add(record_image2)
    db.session.add(record_video2)
    db.session.add(notification1)
    db.session.add(notification2)
    db.session.add(geolocation1)
    db.session.add(geolocation2)

    # Commit changes to the database
    db.session.commit()

if __name__ == '__main__':
    seed_data()
    print("Database seeded successfully.")
