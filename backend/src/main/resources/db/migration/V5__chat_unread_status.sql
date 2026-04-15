ALTER TABLE chat_messages
  ADD COLUMN read_by_user BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN read_by_admin BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE chat_messages
SET read_by_user = CASE WHEN LOWER(sender_role) = 'admin' THEN FALSE ELSE TRUE END,
    read_by_admin = CASE WHEN LOWER(sender_role) = 'admin' THEN TRUE ELSE FALSE END;
