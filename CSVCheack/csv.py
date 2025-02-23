import pandas as pd
import re
import hashlib

def check_csv_security(file_path):
    try:
        df = pd.read_csv(file_path)
        print("[+] CSV file loaded successfully!\n")
        
        # 1. Check for missing values
        if df.isnull().sum().sum() > 0:
            print("[!] Warning: Missing values detected in the dataset.")
            print(df.isnull().sum())
        
        # 2. Check for duplicate entries
        if df.duplicated().sum() > 0:
            print(f"[!] Warning: {df.duplicated().sum()} duplicate rows found!")
            df.drop_duplicates(inplace=True)
            print("[+] Duplicates removed.\n")
        
        # 3. Scan for suspicious patterns (SQL Injection, XSS, Scripts)
        suspicious_patterns = [
            r"(<script>.*?</script>)",  # XSS scripts
            r"(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER).*",  # SQL Injection
            r"(javascript:|vbscript:|onload=|onerror=)"  # Script-based attacks
        ]
        
        for column in df.select_dtypes(include=["object"]).columns:
            for pattern in suspicious_patterns:
                if df[column].astype(str).str.contains(pattern, flags=re.IGNORECASE, regex=True).any():
                    print(f"[!] Security Warning: Potential malicious pattern detected in column '{column}'")
        
        # 4. Hashing sensitive data (Example: Email, Usernames)
        sensitive_columns = ['email', 'username', 'password']
        for col in sensitive_columns:
            if col in df.columns:
                df[col] = df[col].astype(str).apply(lambda x: hashlib.sha256(x.encode()).hexdigest())
                print(f"[+] Sensitive data in '{col}' hashed for security.")
        
        # 5. Checking for abnormal numerical values
        for column in df.select_dtypes(include=["number"]).columns:
            if (df[column] < 0).any():
                print(f"[!] Warning: Negative values detected in column '{column}'")
                
        print("\n[+] Data Security Check Completed Successfully!\n")
        return df
    
    except Exception as e:
        print(f"[X] Error: {e}")

# Example usage
file_path = "your_data.csv"  # Replace with actual CSV file path
data = check_csv_security(file_path)
