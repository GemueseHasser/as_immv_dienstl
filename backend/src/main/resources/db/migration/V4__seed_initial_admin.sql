-- Einmaliger initialer Administrator für den ersten Login.
-- E-Mail: admin@example.com
-- Passwort: admin123
INSERT INTO users (name, email, password_hash, role, email_verified)
SELECT 'Initial Admin', 'admin@example.com', '$2y$10$04bkDKOoFW0ZU/bSGIfWKeHInVotOKLyGt71OaYFmpNd0CDGw0sOW', 'ADMIN', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE LOWER(email) = 'admin@example.com'
);
