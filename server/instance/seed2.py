import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('ireporter.db')  # Replace 'your_database.db' with your actual database file

# Create a cursor
cursor = conn.cursor()

# Sample data for alembic_version table
alembic_version_data = [
    ('147d775dc7f5',),
    # Add more data here
]

# Sample data for the admin table
admin_data = [
    (1, 'admin1', '1234567890', 'admin1@example.com', '2023-10-26 10:00:00', 'adminpassword1'),
    (2, 'admin2', '0987654321', 'admin2@example.com', '2023-10-26 11:00:00', 'adminpassword2'),
    # Add more data here
]

# Sample data for the user table
user_data = [
    (1, 'Georgia', '1111111111', 'Georgia@georgia.com', '2023-10-26 12:00:00', 'password1'),
    (2, 'Ginny', '2222222222', 'ginny@ginny.com', '2023-10-26 13:00:00', 'password2'),
    (3, 'Jace', '3333333333', 'jace@jace.com', '2023-10-26 13:00:00', 'password3'),
    # Add more data here
]

# Insert data into alembic_version table
cursor.executemany("INSERT INTO alembic_version (version_num) VALUES (?)", alembic_version_data)

# Insert data into admin table
cursor.executemany("INSERT INTO admin (id, username, phone_number, email, created_at, password) VALUES (?, ?, ?, ?, ?, ?)", admin_data)

# Insert data into user table
cursor.executemany("INSERT INTO user (id, username, phone_number, email, created_at, password) VALUES (?, ?, ?, ?, ?, ?)", user_data)

# Commit the changes
conn.commit()

# Close the cursor and the connection
cursor.close()
conn.close()

print("Data added to the tables successfully.")
