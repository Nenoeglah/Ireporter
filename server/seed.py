
from app import db
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation

def seed_data():
    # Create user accounts
    user1 = User(username="Georgia", password="password1", phone_number="123456789", email="georgia@georgia.com")
    user2 = User(username="Ginny", password="password2", phone_number="987654321", email="ginny@ginny.com")
    user3 = User(username="Jace", password="password3", phone_number="555555555", email="jace@jace.com")

    # Create admin account
    admin = Admin(username="AdminUsername", password="adminpassword", phone_number="888888888", email="kitty@kitty.com")

    # Create records
    record1 = Record(
        user=user1,
        admin=admin,
        type="Red Flag",
        status="Under Investigation",
        description="This is a corruption incident in the government sector.",
    )

    record2 = Record(
        user=user2,
        admin=admin,
        type="Intervention",
        status="Resolved",
        description="Environmental pollution is a major issue affecting Africa.",
    )

    # Create record images and videos
    record_image1 = RecordImage(record=record1, image_url="https://i.pinimg.com/564x/1c/25/1b/1c251b42de9694ab195291a23e78ffc0.jpg")
    record_video1 = RecordVideo(record=record1, video_url="https://www.youtube.com/watch?v=6T_PjEXlLBs")

    record_image2 = RecordImage(record=record2, image_url="https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg")
    record_video2 = RecordVideo(record=record2, video_url="https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg")

    # Create notifications
    notification1 = Notification(user=user1, record=record1, message="Notification message 1")
    notification2 = Notification(user=user2, record=record2, message="Notification message 2")

    # Create geolocations
    geolocation1 = Geolocation(record=record1, location="40.7128,-74.0060")
    geolocation2 = Geolocation(record=record2, location="34.0522,-118.2437")

    
    
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

    
    db.session.commit()

if __name__ == '__main__':
    seed_data()
    print("Database seeded successfully.")



