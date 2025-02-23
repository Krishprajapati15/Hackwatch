CREATE DATABASE cyber_security;

USE cyber_security;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE threats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    threat_type VARCHAR(100) NOT NULL,
    description TEXT,
    severity ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    reported_by INT,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE vulnerabilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vulnerability_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    patched BOOLEAN DEFAULT FALSE,
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    activity TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE blockchain_audit (
    id INT PRIMARY KEY AUTO_INCREMENT,
    block_hash VARCHAR(255) NOT NULL,
    previous_hash VARCHAR(255) NOT NULL,
    transaction_data TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
