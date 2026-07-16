# NDDTP Authentication Service — Database Design

## Database Name

`nddtp_auth`

## ERD

```
auth_credentials (1) ──────< user_sessions (N)
       │
       ├──────< refresh_tokens (N)
       ├──────  mfa_settings (1) ──────< mfa_backup_codes (N)
       ├──────< login_attempts (N)
       └──────< password_reset_tokens (N)
```

## Tables

### auth_credentials

**Purpose:** Stores user authentication credentials linked to User Service userId.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL, UNIQUE |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| status | account_status_enum | NOT NULL, DEFAULT 'PENDING_VERIFICATION' |
| email_verified | BOOLEAN | NOT NULL, DEFAULT FALSE |
| email_verified_at | TIMESTAMPTZ | NULLABLE |
| failed_login_attempts | INT | NOT NULL, DEFAULT 0 |
| locked_until | TIMESTAMPTZ | NULLABLE |
| last_login_at | TIMESTAMPTZ | NULLABLE |
| last_password_change_at | TIMESTAMPTZ | NULLABLE |
| must_change_password | BOOLEAN | NOT NULL, DEFAULT FALSE |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| deleted_at | TIMESTAMPTZ | NULLABLE (soft delete) |

**Indexes:** email (unique), user_id (unique), status

### user_sessions

**Purpose:** Tracks active user sessions with device metadata.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| credential_id | UUID | FK → auth_credentials(id) ON DELETE CASCADE |
| ip_address | VARCHAR(45) | NULLABLE |
| user_agent | TEXT | NULLABLE |
| device_id | VARCHAR(255) | NULLABLE |
| device_name | VARCHAR(255) | NULLABLE |
| platform | VARCHAR(100) | NULLABLE |
| status | session_status_enum | NOT NULL, DEFAULT 'ACTIVE' |
| mfa_verified | BOOLEAN | NOT NULL, DEFAULT FALSE |
| expires_at | TIMESTAMPTZ | NOT NULL |
| last_activity_at | TIMESTAMPTZ | NULLABLE |
| revoked_at | TIMESTAMPTZ | NULLABLE |
| revoked_reason | VARCHAR(255) | NULLABLE |

### refresh_tokens

**Purpose:** Stores refresh tokens with rotation family tracking for theft detection.

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| credential_id | UUID | FK → auth_credentials(id) ON DELETE CASCADE |
| session_id | UUID | NOT NULL |
| token_hash | VARCHAR(255) | NOT NULL, UNIQUE |
| family_id | UUID | NOT NULL |
| is_revoked | BOOLEAN | NOT NULL, DEFAULT FALSE |
| expires_at | TIMESTAMPTZ | NOT NULL |

### mfa_settings

**Purpose:** MFA configuration per credential (TOTP secret, status).

### mfa_backup_codes

**Purpose:** One-time backup codes for MFA recovery (hashed).

### login_attempts

**Purpose:** Audit trail of all login attempts with result.

### password_reset_tokens

**Purpose:** Single-use password reset tokens with expiry.

## PostgreSQL Best Practices Applied

- UUID primary keys via `gen_random_uuid()`
- TIMESTAMPTZ for all timestamps (timezone-aware)
- ENUM types for status fields (type safety)
- Soft delete on auth_credentials (`deleted_at`)
- Foreign keys with CASCADE/SET NULL as appropriate
- Indexes on all query-heavy columns
- Connection pooling (configurable pool size)
