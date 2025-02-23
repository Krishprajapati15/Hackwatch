import os
import json
import requests
import logging
import time
import pandas as pd
import joblib
import smtplib
from email.mime.text import MIMEText
from sklearn.ensemble import IsolationForest

logging.basicConfig(filename="threat_detection.log", level=logging.INFO, format="%(asctime)s - %(message)s")

LOG_FILE = "threat_logs.json"
BLOCKED_IPS_FILE = "blocked_ips.txt"
THRESHOLD_ABUSE_SCORE = 50
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "your-email@gmail.com"
EMAIL_PASSWORD = "your-app-password"
EMAIL_RECEIVER = "security-team@gmail.com"

def send_alert_email(subject, message):
    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = EMAIL_SENDER
    msg["To"] = EMAIL_RECEIVER
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, msg.as_string())
        server.quit()
    except Exception as e:
        logging.error(f"Failed to send alert email: {e}")

def load_logs():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as file:
            return json.load(file)
    return []

def check_ip_reputation(ip):
    response = requests.get(f"https://api.abuseipdb.com/api/v2/check?ipAddress={ip}", headers={"Key": "YOUR_API_KEY"})
    if response.status_code == 200:
        data = response.json()
        abuse_score = data["data"]["abuseConfidenceScore"]
        if abuse_score > THRESHOLD_ABUSE_SCORE:
            logging.warning(f"🚨 Malicious IP detected: {ip}")
            block_ip(ip)
            send_alert_email("🚨 Malicious IP Detected", f"The IP {ip} has been flagged as a threat.")
            return True
    return False

def get_ip_location(ip):
    response = requests.get(f"https://ipinfo.io/{ip}/json")
    if response.status_code == 200:
        data = response.json()
        return f"{data.get('city', 'Unknown')}, {data.get('country', 'Unknown')}"
    return "Unknown"

def block_ip(ip):
    with open(BLOCKED_IPS_FILE, "a") as file:
        file.write(ip + "\n")
    logging.warning(f"🚫 Blocked IP: {ip}")

def detect_suspicious_patterns(logs):
    for log in logs:
        if log["event"] in ["DDoS", "malware_execution", "data_exfiltration"]:
            logging.warning(f"⚠️ Suspicious activity detected: {log}")
            send_alert_email("⚠️ Threat Detected", f"Suspicious activity detected: {log}")

def train_anomaly_model(logs):
    df = pd.DataFrame(logs)
    if df.empty:
        return None
    
    df["event_code"] = df["event"].astype("category").cat.codes
    df["ip_code"] = df["ip"].astype("category").cat.codes
    X = df[["event_code", "ip_code"]]

    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(X)
    joblib.dump(model, "threat_model.pkl")

def detect_anomalies(logs):
    if not os.path.exists("threat_model.pkl"):
        return

    model = joblib.load("threat_model.pkl")
    df = pd.DataFrame(logs)
    df["event_code"] = df["event"].astype("category").cat.codes
    df["ip_code"] = df["ip"].astype("category").cat.codes
    X = df[["event_code", "ip_code"]]

    predictions = model.predict(X)
    for i, pred in enumerate(predictions):
        if pred == -1:
            logging.warning(f"🚨 Anomaly detected in log: {logs[i]}")
            send_alert_email("🚨 Anomaly Detected", f"Anomalous behavior detected: {logs[i]}")

def real_time_monitoring():
    print("🚀 Starting real-time threat monitoring...")
    while True:
        logs = load_logs()
        if logs:
            for log in logs:
                if check_ip_reputation(log["ip"]):
                    location = get_ip_location(log["ip"])
                    print(f"⚠️ Malicious IP: {log['ip']} detected from {location}")
            detect_suspicious_patterns(logs)
            train_anomaly_model(logs)
            detect_anomalies(logs)
        time.sleep(10)

if __name__ == "__main__":
    real_time_monitoring()
