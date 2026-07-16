import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE target_type_enum AS ENUM ('SERVICE','DATABASE','ENDPOINT');`);
    await queryRunner.query(`CREATE TYPE target_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE check_status_enum AS ENUM ('PENDING','RUNNING','PASSED','FAILED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE alert_severity_enum AS ENUM ('INFO','WARNING','CRITICAL');`);
    await queryRunner.query(`CREATE TYPE alert_status_enum AS ENUM ('OPEN','ACKNOWLEDGED','RESOLVED','CLOSED');`);

    await queryRunner.query(`
      CREATE TABLE monitoring_targets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        target_type target_type_enum NOT NULL,
        endpoint_url VARCHAR(500) NOT NULL,
        check_interval_seconds INT NOT NULL DEFAULT 60,
        description TEXT,
        status target_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE monitoring_checks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        check_number VARCHAR(50) NOT NULL UNIQUE,
        target_id UUID NOT NULL REFERENCES monitoring_targets(id),
        initiated_by UUID NOT NULL,
        status check_status_enum NOT NULL DEFAULT 'PENDING',
        response_time_ms INT,
        status_code INT,
        error_message TEXT,
        started_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE monitoring_alerts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        alert_number VARCHAR(50) NOT NULL UNIQUE,
        check_id UUID NOT NULL REFERENCES monitoring_checks(id),
        severity alert_severity_enum NOT NULL DEFAULT 'WARNING',
        status alert_status_enum NOT NULL DEFAULT 'OPEN',
        message TEXT NOT NULL,
        acknowledged_by UUID,
        resolved_by UUID,
        acknowledged_at TIMESTAMPTZ,
        resolved_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_monitoring_checks_target ON monitoring_checks(target_id);`);
    await queryRunner.query(`CREATE INDEX idx_monitoring_checks_status ON monitoring_checks(status);`);
    await queryRunner.query(`CREATE INDEX idx_monitoring_alerts_check ON monitoring_alerts(check_id);`);
    await queryRunner.query(`CREATE INDEX idx_monitoring_alerts_status ON monitoring_alerts(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS monitoring_alerts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS monitoring_checks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS monitoring_targets;`);
    await queryRunner.query(`DROP TYPE IF EXISTS alert_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS alert_severity_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS check_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS target_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS target_type_enum;`);
  }
}
