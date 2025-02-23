import re

LOG_FILE = "/var/log/syslog"

def analyze_logs():
    with open(LOG_FILE, "r") as f:
        logs = f.readlines()

    anomalies = [log for log in logs if "error" in log.lower() or "failed" in log.lower()]
    
    if anomalies:
        print(f"⚠️ {len(anomalies)} security events found!")
    else:
        print("✅ No security issues detected.")

if __name__ == "__main__":
    analyze_logs()
