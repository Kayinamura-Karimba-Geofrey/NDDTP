-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE nddtp_auth TO nddtp_auth;
