import os
import re
import time
import socket
import hashlib
from collections import defaultdict
from scapy.all import sniff
from cryptography.fernet import Fernet

class IntrusionDetection:
    def __init__(self, log_file="/var/log/auth.log", threshold=5):
        self.log_file = log_file
        self.threshold = threshold
        self.failed_attempts = defaultdict(int)
    
    def detect_intrusions(self):
        with open(self.log_file, "r") as f:
            logs = f.readlines()
        
        for log in logs:
            if "Failed password" in log:
                ip = re.search(r"from (\d+\.\d+\.\d+\.\d+)", log)
                if ip:
                    self.failed_attempts[ip.group(1)] += 1
        
        for ip, count in self.failed_attempts.items():
            if count > self.threshold:
                print(f"⚠️ Brute-force attack detected from {ip} ({count} attempts)")
                os.system(f"iptables -A INPUT -s {ip} -j DROP")

class MalwareScanner:
    MALWARE_SIGNATURES = {
        "e99a18c428cb38d5f260853678922e03": "Trojan.Generic",
        "098f6bcd4621d373cade4e832627b4f6": "Ransomware.X"
    }
    
    @staticmethod
    def scan_file(filepath):
        with open(filepath, "rb") as f:
            file_hash = hashlib.md5(f.read()).hexdigest()
        
        return "🚨 MALWARE DETECTED: " + MalwareScanner.MALWARE_SIGNATURES.get(file_hash, "✅ File is clean")

class NetworkMonitor:
    @staticmethod
    def detect_suspicious_packets(packet):
        if packet.haslayer("IP"):
            src_ip = packet["IP"].src
            print(f"⚠️ Suspicious traffic detected from {src_ip}")

    @staticmethod
    def start_sniffing():
        sniff(prn=NetworkMonitor.detect_suspicious_packets, store=0, count=100)

class DataEncryption:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)
    
    def encrypt_file(self, filename):
        with open(filename, "rb") as f:
            encrypted_data = self.cipher.encrypt(f.read())
        with open(filename + ".enc", "wb") as f:
            f.write(encrypted_data)
        print("✅ File encrypted successfully.")

class VulnerabilityScanner:
    @staticmethod
    def scan_ports(target):
        open_ports = []
        for port in range(1, 1025):
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(1)
            if not s.connect_ex((target, port)):
                open_ports.append(port)
            s.close()
        
        print(f"⚠️ Open ports detected: {open_ports}" if open_ports else "✅ No vulnerabilities detected.")

if __name__ == "__main__":
    intrusion_detector = IntrusionDetection()
    intrusion_detector.detect_intrusions()
    
    scanner = MalwareScanner()
    print(scanner.scan_file("test_file.exe"))
    
    NetworkMonitor.start_sniffing()
    
    encryptor = DataEncryption()
    encryptor.encrypt_file("sensitive_data.txt")
    
    VulnerabilityScanner.scan_ports("192.168.1.1")
