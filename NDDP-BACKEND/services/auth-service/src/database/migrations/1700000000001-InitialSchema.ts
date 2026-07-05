import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE account_status_enum AS ENUM (
        'ACTIVE', 'INACTIVE', 'LOCKED', 'SUSPENDED', 'PENDING_VERIFICATION'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE session_status_enum AS ENUM ('ACTIVE', 'EXPIRED', 'REVOKED');
    `);

    await queryRunner.query(`
      CREATE TYPE mfa_method_enum AS ENUM ('TOTP', 'SMS', 'EMAIL');
    `);

    await queryRunner.query(`
      CREATE TYPE mfa_status_enum AS ENUM ('DISABLED', 'PENDING_SETUP', 'ENABLED');
    `);

    await queryRunner.query(`
      CREATE TYPE login_attempt_result_enum AS ENUM (
        'SUCCESS', 'FAILED_INVALID_CREDENTIALS', 'FAILED_ACCOUNT_LOCKED',
        'FAILED_ACCOUNT_INACTIVE', 'FAILED_MFA_REQUIRED', 'FAILED_MFA_INVALID'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE token_type_enum AS ENUM (
        'ACCESS', 'REFRESH', 'PASSWORD_RESET', 'EMAIL_VERIFICATION'
      );
    `);

    await queryRunner.query(`
      CREATE TABLE auth_credentials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        status account_status_enum NOT NULL DEFAULT 'PENDING_VERIFICATION',
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        email_verified_at TIMESTAMPTZ,
        failed_login_attempts INT NOT NULL DEFAULT 0,
        locked_until TIMESTAMPTZ,
        last_login_at TIMESTAMPTZ,
        last_password_change_at TIMESTAMPTZ,
        must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id UUID NOT NULL REFERENCES auth_credentials(id) ON DELETE CASCADE,
        ip_address VARCHAR(45),
        user_agent TEXT,
        device_id VARCHAR(255),
        device_name VARCHAR(255),
        platform VARCHAR(100),
        status session_status_enum NOT NULL DEFAULT 'ACTIVE',
        mfa_verified BOOLEAN NOT NULL DEFAULT FALSE,
        expires_at TIMESTAMPTZ NOT NULL,
        last_activity_at TIMESTAMPTZ,
        revoked_at TIMESTAMPTZ,
        revoked_reason VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE refresh_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id UUID NOT NULL REFERENCES auth_credentials(id) ON DELETE CASCADE,
        session_id UUID NOT NULL,
        token_hash VARCHAR(255) NOT NULL UNIQUE,
        family_id UUID NOT NULL,
        is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
        revoked_at TIMESTAMPTZ,
        revoked_reason VARCHAR(255),
        replaced_by_token_id UUID,
        ip_address VARCHAR(45),
        user_agent TEXT,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE mfa_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id UUID NOT NULL UNIQUE REFERENCES auth_credentials(id) ON DELETE CASCADE,
        status mfa_status_enum NOT NULL DEFAULT 'DISABLED',
        method mfa_method_enum NOT NULL DEFAULT 'TOTP',
        secret_encrypted VARCHAR(512),
        phone_number VARCHAR(20),
        enabled_at TIMESTAMPTZ,
        last_used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE mfa_backup_codes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mfa_setting_id UUID NOT NULL REFERENCES mfa_settings(id) ON DELETE CASCADE,
        code_hash VARCHAR(255) NOT NULL,
        is_used BOOLEAN NOT NULL DEFAULT FALSE,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE login_attempts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id UUID REFERENCES auth_credentials(id) ON DELETE SET NULL,
        email VARCHAR(255) NOT NULL,
        result login_attempt_result_enum NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        failure_reason VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE password_reset_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id UUID NOT NULL REFERENCES auth_credentials(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL UNIQUE,
        token_type token_type_enum NOT NULL DEFAULT 'PASSWORD_RESET',
        is_used BOOLEAN NOT NULL DEFAULT FALSE,
        used_at TIMESTAMPTZ,
        ip_address VARCHAR(45),
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_auth_credentials_email ON auth_credentials(email);`);
    await queryRunner.query(`CREATE INDEX idx_auth_credentials_user_id ON auth_credentials(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_auth_credentials_status ON auth_credentials(status);`);
    await queryRunner.query(`CREATE INDEX idx_user_sessions_credential_id ON user_sessions(credential_id);`);
    await queryRunner.query(`CREATE INDEX idx_user_sessions_status ON user_sessions(status);`);
    await queryRunner.query(`CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);`);
    await queryRunner.query(`CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);`);
    await queryRunner.query(`CREATE INDEX idx_refresh_tokens_credential_id ON refresh_tokens(credential_id);`);
    await queryRunner.query(`CREATE INDEX idx_refresh_tokens_session_id ON refresh_tokens(session_id);`);
    await queryRunner.query(`CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);`);
    await queryRunner.query(`CREATE INDEX idx_mfa_settings_credential_id ON mfa_settings(credential_id);`);
    await queryRunner.query(`CREATE INDEX idx_mfa_backup_codes_mfa_setting_id ON mfa_backup_codes(mfa_setting_id);`);
    await queryRunner.query(`CREATE INDEX idx_login_attempts_credential_id ON login_attempts(credential_id);`);
    await queryRunner.query(`CREATE INDEX idx_login_attempts_email ON login_attempts(email);`);
    await queryRunner.query(`CREATE INDEX idx_login_attempts_ip_address ON login_attempts(ip_address);`);
    await queryRunner.query(`CREATE INDEX idx_login_attempts_created_at ON login_attempts(created_at);`);
    await queryRunner.query(`CREATE INDEX idx_password_reset_tokens_token_hash ON password_reset_tokens(token_hash);`);
    await queryRunner.query(`CREATE INDEX idx_password_reset_tokens_credential_id ON password_reset_tokens(credential_id);`);
    await queryRunner.query(`CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS password_reset_tokens;`);
    await queryRunner.query(`DROP TABLE IF EXISTS login_attempts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS mfa_backup_codes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS mfa_settings;`);
    await queryRunner.query(`DROP TABLE IF EXISTS refresh_tokens;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_sessions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS auth_credentials;`);
    await queryRunner.query(`DROP TYPE IF EXISTS token_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS login_attempt_result_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS mfa_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS mfa_method_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS session_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS account_status_enum;`);
  }
}
