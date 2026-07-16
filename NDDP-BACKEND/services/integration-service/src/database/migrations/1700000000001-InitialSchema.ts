import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE connector_type_enum AS ENUM ('HRIS','ERP','FINANCE','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE connector_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE endpoint_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE http_method_enum AS ENUM ('GET','POST','PUT','PATCH','DELETE');`);
    await queryRunner.query(`CREATE TYPE job_status_enum AS ENUM ('PENDING','RUNNING','COMPLETED','FAILED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE log_level_enum AS ENUM ('DEBUG','INFO','WARN','ERROR');`);

    await queryRunner.query(`
      CREATE TABLE integration_connectors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        connector_type connector_type_enum NOT NULL,
        base_url VARCHAR(500) NOT NULL,
        description TEXT,
        config JSONB,
        status connector_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE integration_endpoints (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        connector_id UUID NOT NULL REFERENCES integration_connectors(id),
        code VARCHAR(50) NOT NULL,
        name VARCHAR(200) NOT NULL,
        path VARCHAR(500) NOT NULL,
        http_method http_method_enum NOT NULL DEFAULT 'GET',
        description TEXT,
        mapping JSONB,
        status endpoint_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(connector_id, code)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE integration_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_number VARCHAR(50) NOT NULL UNIQUE,
        connector_id UUID NOT NULL REFERENCES integration_connectors(id),
        endpoint_id UUID NOT NULL REFERENCES integration_endpoints(id),
        submitted_by UUID NOT NULL,
        status job_status_enum NOT NULL DEFAULT 'PENDING',
        payload JSONB,
        error_message TEXT,
        started_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE integration_job_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_id UUID NOT NULL REFERENCES integration_jobs(id) ON DELETE CASCADE,
        level log_level_enum NOT NULL DEFAULT 'INFO',
        message TEXT NOT NULL,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_integration_endpoints_connector ON integration_endpoints(connector_id);`);
    await queryRunner.query(`CREATE INDEX idx_integration_jobs_status ON integration_jobs(status);`);
    await queryRunner.query(`CREATE INDEX idx_integration_jobs_connector ON integration_jobs(connector_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS integration_job_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS integration_jobs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS integration_endpoints;`);
    await queryRunner.query(`DROP TABLE IF EXISTS integration_connectors;`);
    await queryRunner.query(`DROP TYPE IF EXISTS log_level_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS job_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS http_method_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS endpoint_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS connector_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS connector_type_enum;`);
  }
}
