USE cyber_security;

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@example.com', 'hashedpassword1', 'admin'),
('user1', 'user1@example.com', 'hashedpassword2', 'user'),
('user2', 'user2@example.com', 'hashedpassword3', 'user');

INSERT INTO threats (threat_type, description, severity, reported_by) VALUES
('DDoS Attack', 'Distributed Denial of Service detected on port 443', 'High', 1),
('SQL Injection', 'Unusual query pattern detected in login form', 'Critical', 2);

INSERT INTO vulnerabilities (vulnerability_name, description, severity, patched) VALUES
('Open Port 22', 'SSH open to the internet without restriction', 'High', FALSE),
('Outdated SSL', 'TLS version deprecated, vulnerable to MITM attacks', 'Medium', FALSE);

INSERT INTO logs (user_id, activity) VALUES
(1, 'Admin logged in'),
(2, 'User1 attempted SQL injection attack'),
(3, 'User2 accessed threat reports');

INSERT INTO blockchain_audit (block_hash, previous_hash, transaction_data) VALUES
('hash1', 'prev_hash0', 'User admin created'),
('hash2', 'hash1', 'Threat DDoS Attack logged');
