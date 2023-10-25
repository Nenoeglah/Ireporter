<<<<<<< HEAD
from app import db
from models import User, Admin, Record, RecordImage, RecordVideo, Notification, Geolocation

def seed_data():
    # Create user accounts
    user1 = User(id=1, username="Georgia", password="password1", phone_number="+254 723456789", email="georgia@georgia.com")
    user2 = User(id=2, username="Ginny", password="password2", phone_number="+254 787654321", email="ginny@ginny.com")
    user3 = User(id=3, username="Jace", password="password3", phone_number="+254 79876543", email="jace@jace.com")

    # Create admin account
    admin = Admin(id=1, username="Kitty", password="adminpassword", phone_number="+254 711121314 ", email="kitty@kitty.com")

    # Create records
    record1 = Record(
        id=1,
        user_id=1,
        admin_id=1,
        location="Nairobi",
        type="Red Flag",
        status="Under Investigation",
        description="This is a corruption incident in the government sector.",
    )

    record2 = Record(
        id=2,
        user_id=2,
        admin_id=1,
        location="Nairobi",
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
    
print("🦸‍♀️ Database seeded successfully!")
=======
# from app import db
# from models import User, Record, RecordImage, RecordVideo, Notification, Geolocation

# def seed_data():
   
#     user1 = User(username="Georgia", email="georgia@georgia.com", password="password1", phone_number="0712345678")
#     user2 = User(username="Ginny", email="ginny@ginny.com", password="password2", phone_number="0700000000")
#     user3 = User(username="Jace", email="jace@jace.com", password="password3", phone_number="0711111111")

    
#     status1 = "Under Investigation"
#     status2 = "Resolved"
#     status3 = "Rejected"

    
#     red_flag1 = Record(

# def seed_data():
   
#     user1 = User(username="Georgia", email="georgia@georgia.com", password="password1")
#     user2 = User(username="Ginny", email="ginny@ginny.com", password="password2")
#     user3 = User(username="Jace", email="jace@jace.com", password="password3")

    
#     status1 = Status(name="Under Investigation")
#     status2 = Status(name="Resolved")
#     status3 = Status(name="Rejected")

    
#     red_flag1 = RedFlag(
#         title="Corruption in Government",
#         description="This is a corruption incident in the government sector.",
#         user=user1,
#         status=status1,

#         location="Nairobi",
#         # geolocation="40.7128,-74.0060", 
#         images=["https://i.pinimg.com/564x/66/23/ae/6623ae76a2b6c7ef5f760c0a2d2ca5e0.jpg", "https://i.pinimg.com/564x/1c/25/1b/1c251b42de9694ab195291a23e78ffc0.jpg"],
#         videos=["https://www.youtube.com/watch?v=6T_PjEXlLBs"],
#     )

#     red_flag2 = Record(
#         title="Environmental Pollution",
#         Categoty="Intervention",
#         description="Environmental pollution is a major issue affecting Africa.",
#         user=user2,
#         status=status2,
#         location="Nairobi",
#         # geolocation="34.0522,-118.2437",
#         images=["https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg"],
#         videos=["https://www.youtube.com/watch?v=pv_rUdeOP9g"],
#     )

    
#     intervention1 = Record(

#         title="Infrastructure Development",
#         description="Lack of proper infrastructure is a pressing concern in Africa.",
#         user=user1,
#         status=status1,
#         geolocation="41.8781,-87.6298",
#         images=["https://media.licdn.com/dms/image/C4D12AQGPpgYqMB-kDA/article-cover_image-shrink_720_1280/0/1624101019948?e=2147483647&v=beta&t=7DeQtgFaW73stbKm58WPsFdmENTDSU2tbl8Rr2IfyTU"],
#         videos=["https://youtu.be/_a3SW-xRmJ0?feature=shared"],
#     )

#     intervention2 = Intervention(
#         title="Access to Clean Water",
#         description="Millions of people in Africa lack access to clean water sources.",
#         user=user2,
#         status=status3,
#         geolocation="51.5074,-0.1278",
#         images=["https://i.pinimg.com/564x/95/ad/43/95ad435451ea053f81f8cd777c521659.jpg"],
#         videos=["https://youtu.be/U1MM4V3_faY?feature=shared"],
#     )

    
#     db.session.add(user1)
#     db.session.add(user2)
#     db.session.add(user3)
#     db.session.add(status1)
#     db.session.add(status2)
#     db.session.add(status3)
#     db.session.add(red_flag1)
#     db.session.add(red_flag2)
#     db.session.add(intervention1)
#     db.session.add(intervention2)

    
#     db.session.commit()

# if __name__ == '__main__':
#     seed_data()
#     print("Database seeded successfully.")
>>>>>>> e4ad34e (seed file)
