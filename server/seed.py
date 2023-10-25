from app import db
from models import User, RedFlag, Intervention, Status

def seed_data():
   
    user1 = User(username="Georgia", email="georgia@georgia.com", password="password1")
    user2 = User(username="Ginny", email="ginny@ginny.com", password="password2")
    user3 = User(username="Jace", email="jace@jace.com", password="password3")

    
    status1 = Status(name="Under Investigation")
    status2 = Status(name="Resolved")
    status3 = Status(name="Rejected")

    
    red_flag1 = RedFlag(
        title="Corruption in Government",
        description="This is a corruption incident in the government sector.",
        user=user1,
        status=status1,
        geolocation="40.7128,-74.0060", 
        images=["https://i.pinimg.com/564x/66/23/ae/6623ae76a2b6c7ef5f760c0a2d2ca5e0.jpg", "https://i.pinimg.com/564x/1c/25/1b/1c251b42de9694ab195291a23e78ffc0.jpg"],
        videos=["https://www.youtube.com/watch?v=6T_PjEXlLBs"],
    )

    red_flag2 = RedFlag(
        title="Environmental Pollution",
        description="Environmental pollution is a major issue affecting Africa.",
        user=user2,
        status=status2,
        geolocation="34.0522,-118.2437",
        images=["https://i.pinimg.com/564x/4a/e0/08/4ae00888c846d08973a5e915b05db5f7.jpg"],
        videos=["https://www.youtube.com/watch?v=pv_rUdeOP9g"],
    )

    
    intervention1 = Intervention(
        title="Infrastructure Development",
        description="Lack of proper infrastructure is a pressing concern in Africa.",
        user=user1,
        status=status1,
        geolocation="41.8781,-87.6298",
        images=["https://media.licdn.com/dms/image/C4D12AQGPpgYqMB-kDA/article-cover_image-shrink_720_1280/0/1624101019948?e=2147483647&v=beta&t=7DeQtgFaW73stbKm58WPsFdmENTDSU2tbl8Rr2IfyTU"],
        videos=["https://youtu.be/_a3SW-xRmJ0?feature=shared"],
    )

    intervention2 = Intervention(
        title="Access to Clean Water",
        description="Millions of people in Africa lack access to clean water sources.",
        user=user2,
        status=status3,
        geolocation="51.5074,-0.1278",
        images=["https://i.pinimg.com/564x/95/ad/43/95ad435451ea053f81f8cd777c521659.jpg"],
        videos=["https://youtu.be/U1MM4V3_faY?feature=shared"],
    )

    
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(status1)
    db.session.add(status2)
    db.session.add(status3)
    db.session.add(red_flag1)
    db.session.add(red_flag2)
    db.session.add(intervention1)
    db.session.add(intervention2)

    
    db.session.commit()

if __name__ == '__main__':
    seed_data()
    print("Database seeded successfully.")
    print("Database seeded successfully.")
