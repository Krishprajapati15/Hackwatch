import os
import json
import requests
import logging
import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

logging.basicConfig(filename="hacker_attack.log", level=logging.INFO, format="%(asctime)s - %(message)s")

LOG_FILE = "attack_logs.json"

def load_logs():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as file:
            return json.load(file)
    return []

def check_ip_reputation(ip):
    response = requests.get(f"https://api.abuseipdb.com/api/v2/check?ipAddress={ip}", headers={"Key": "YOUR_API_KEY"})
    if response.status_code == 200:
        data = response.json()
        if data["data"]["abuseConfidenceScore"] > 50:
            logging.warning(f"Malicious IP detected: {ip}")
            print(f"⚠️ Alert: Malicious IP detected - {ip}")

def detect_suspicious_activity(logs):
    for log in logs:
        if log["action"] in ["unauthorized_login", "brute_force", "sql_injection"]:
            logging.warning(f"Suspicious activity detected: {log}")
            print(f"⚠️ Alert: Suspicious activity - {log}")

def train_anomaly_model(logs):
    df = pd.DataFrame(logs)
    if df.empty:
        return None
    
    df["action_code"] = df["action"].astype("category").cat.codes
    df["ip_code"] = df["ip"].astype("category").cat.codes
    X = df[["action_code", "ip_code"]]

    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(X)
    joblib.dump(model, "hacker_attack_model.pkl")

def detect_anomalies(logs):
    if not os.path.exists("hacker_attack_model.pkl"):
        return

    model = joblib.load("hacker_attack_model.pkl")
    df = pd.DataFrame(logs)
    df["action_code"] = df["action"].astype("category").cat.codes
    df["ip_code"] = df["ip"].astype("category").cat.codes
    X = df[["action_code", "ip_code"]]

    predictions = model.predict(X)
    for i, pred in enumerate(predictions):
        if pred == -1:
            print(f"⚠️ Anomaly detected in log: {logs[i]}")

def main():
    logs = load_logs()
    if not logs:
        return

    for log in logs:
        check_ip_reputation(log["ip"])

    detect_suspicious_activity(logs)
    train_anomaly_model(logs)
    detect_anomalies(logs)
    print("✅ Hacker attack detection completed.")

if __name__ == "__main__":
    main()
