import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE audit_action_enum AS ENUM ('CREATE','READ','UPDATE','DELETE','LOGIN','LOGOUT','ACCESS','EXPORT','APPROVE','REJECT','EXECUTE');`);
    await queryRunner.query(`CREATE TYPE audit_outcome_enum AS ENUM ('SUCCESS','FAILURE','DENIED','PARTIAL');`);
    await queryRunner.query(`CREATE TYPE audit_severity_enum AS ENUM ('INFO','WARNING','ERROR','CRITICAL');`);
    await queryRunner.query(`CREATE TYPE security_event_type_enum AS ENUM ('LOGIN_FAILED','ACCOUNT_LOCKED','ACCESS_DENIED','PRIVILEGE_ESCALATION','SUSPICIOUS_ACTIVITY','DATA_EXPORT','CONFIG_CHANGE');`);

    await queryRunner.query(`
      CREATE TABLE audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id VARCHAR(100),
        event_type VARCHAR(150) NOT NULL,
        source VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        action audit_action_enum NOT NULL,
        outcome audit_outcome_enum NOT NULL,
        severity audit_severity_enum NOT NULL DEFAULT 'INFO',
        user_id UUID,
        actor_email VARCHAR(255),
        resource_type VARCHAR(100),
        resource_id VARCHAR(255),
        ip_address VARCHAR(45),
        user_agent VARCHAR(500),
        correlation_id VARCHAR(100),
        payload JSONB,
        description TEXT,
        integrity_hash VARCHAR(128) NOT NULL,
        previous_hash VARCHAR(128),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE security_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id VARCHAR(100),
        event_type security_event_type_enum NOT NULL,
        severity audit_severity_enum NOT NULL,
        user_id UUID,
        actor_email VARCHAR(255),
        source_event VARCHAR(150),
        ip_address VARCHAR(45),
        user_agent VARCHAR(500),
        correlation_id VARCHAR(100),
        description TEXT NOT NULL,
        metadata JSONB,
        is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
        resolved_at TIMESTAMPTZ,
        resolved_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE retention_policies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category VARCHAR(100) NOT NULL UNIQUE,
        retention_days INT NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);`);
    await queryRunner.query(`CREATE INDEX idx_audit_logs_category ON audit_logs(category);`);
    await queryRunner.query(`CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);`);
    await queryRunner.query(`CREATE INDEX idx_audit_logs_correlation_id ON audit_logs(correlation_id);`);
    await queryRunner.query(`CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);`);
    await queryRunner.query(`CREATE INDEX idx_security_events_user_id ON security_events(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_security_events_type ON security_events(event_type);`);
    await queryRunner.query(`CREATE INDEX idx_security_events_severity ON security_events(severity);`);
    await queryRunner.query(`CREATE INDEX idx_security_events_created_at ON security_events(created_at);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS retention_policies;`);
    await queryRunner.query(`DROP TABLE IF EXISTS security_events;`);
    await queryRunner.query(`DROP TABLE IF EXISTS audit_logs;`);
    await queryRunner.query(`DROP TYPE IF EXISTS security_event_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS audit_severity_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS audit_outcome_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS audit_action_enum;`);
  }
}
