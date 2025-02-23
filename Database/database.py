import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="cyber_security"
)

cursor = db.cursor()

def fetch_users():
    cursor.execute("SELECT id, username, email, role FROM users")
    for user in cursor.fetchall():
        print(user)

def insert_threat(threat_type, description, severity, reported_by):
    query = "INSERT INTO threats (threat_type, description, severity, reported_by) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (threat_type, description, severity, reported_by))
    db.commit()
    print("Threat reported successfully.")

fetch_users()
insert_threat("Phishing Attempt", "Email with fake bank login detected", "Medium", 1)

db.close()
