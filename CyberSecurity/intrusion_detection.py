import os
import re
import time
from collections import defaultdict

LOG_FILE = "/var/log/auth.log"
THRESHOLD = 5  # Block IPs with more than 5 failed attempts

failed_attempts = defaultdict(int)

def detect_intrusions():
    with open(LOG_FILE, "r") as f:
        logs = f.readlines()

    for log in logs:
        if "Failed password" in log:
            ip = re.search(r"from (\d+\.\d+\.\d+\.\d+)", log)
            if ip:
                failed_attempts[ip.group(1)] += 1

    for ip, count in failed_attempts.items():
        if count > THRESHOLD:
            print(f"⚠️ Possible brute-force attack from {ip} ({count} attempts).")
            os.system(f"iptables -A INPUT -s {ip} -j DROP")  # Block attacker

if __name__ == "__main__":
    while True:
        detect_intrusions()
        time.sleep(10)
