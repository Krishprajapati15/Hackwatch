from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

def encrypt_file(filename):
    with open(filename, "rb") as f:
        encrypted_data = cipher.encrypt(f.read())
    with open(filename + ".enc", "wb") as f:
        f.write(encrypted_data)

if __name__ == "__main__":
    encrypt_file("important_data.txt")
    print("✅ File encrypted successfully.")
