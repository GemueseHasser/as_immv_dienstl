ALTER TABLE users
  ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN verification_token VARCHAR(255) NULL,
  ADD COLUMN verification_token_expires_at TIMESTAMP NULL,
  ADD COLUMN reset_password_token VARCHAR(255) NULL,
  ADD COLUMN reset_password_token_expires_at TIMESTAMP NULL,
  ADD CONSTRAINT uk_users_verification_token UNIQUE (verification_token),
  ADD CONSTRAINT uk_users_reset_password_token UNIQUE (reset_password_token);
