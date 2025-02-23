import os
import json
import re
import requests
import logging
import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest


logging.basicConfig(filename="cicd_security.log", level=logging.INFO, format="%(asctime)s - %(message)s")

LOG_FILE = "cicd_logs.json"


def load_logs():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as file:
            return json.load(file)
    return []

def detect_unauthorized_access(logs):
    authorized_users = ["dev1", "admin", "devops"]
    for log in logs:
        if log["user"] not in authorized_users:
            logging.warning(f"Unauthorized access detected: {log}")
            print(f"⚠️ Alert: Unauthorized access by {log['user']}")

def check_vulnerabilities():
    dependencies = ["requests", "flask", "numpy"]
    for dep in dependencies:
        response = requests.get(f"https://pypi.org/pypi/{dep}/json")
        if response.status_code == 200:
            data = response.json()
            latest_version = data["info"]["version"]
            print(f"🔎 {dep}: Latest Version: {latest_version}")
        else:
            print(f"⚠️ {dep}: Security check failed")

def train_anomaly_model(logs):
    df = pd.DataFrame(logs)
    if df.empty:
        return None
    
    df["action_code"] = df["action"].astype("category").cat.codes
    df["user_code"] = df["user"].astype("category").cat.codes
    X = df[["action_code", "user_code"]]
  
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(X)
    joblib.dump(model, "cicd_security_model.pkl")
    print("✅ Anomaly detection model trained and saved.")

def detect_anomalies(logs):
    if not os.path.exists("cicd_security_model.pkl"):
        print("⚠️ Train the anomaly detection model first!")
        return

    model = joblib.load("cicd_security_model.pkl")
    df = pd.DataFrame(logs)
    df["action_code"] = df["action"].astype("category").cat.codes
    df["user_code"] = df["user"].astype("category").cat.codes
    X = df[["action_code", "user_code"]]

    predictions = model.predict(X)
    for i, pred in enumerate(predictions):
        if pred == -1:
            print(f"⚠️ Anomaly detected in log: {logs[i]}")

def main():
    logs = load_logs()
    if not logs:
        print("⚠️ No CI/CD logs found.")
        return

    detect_unauthorized_access(logs)
    check_vulnerabilities()
    train_anomaly_model(logs)
    detect_anomalies(logs)
    print("✅ CI/CD security analysis completed.")

if __name__ == "__main__":
    main()
