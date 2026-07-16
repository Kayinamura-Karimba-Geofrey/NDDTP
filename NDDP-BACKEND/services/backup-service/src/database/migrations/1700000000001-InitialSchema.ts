import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE backup_type_enum AS ENUM ('FULL','INCREMENTAL','DIFFERENTIAL');`);
    await queryRunner.query(`CREATE TYPE target_type_enum AS ENUM ('DATABASE','FILES','SYSTEM');`);
    await queryRunner.query(`CREATE TYPE policy_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE job_status_enum AS ENUM ('PENDING','RUNNING','COMPLETED','FAILED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE restore_status_enum AS ENUM ('PENDING','RUNNING','COMPLETED','FAILED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE backup_policies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        backup_type backup_type_enum NOT NULL,
        target_type target_type_enum NOT NULL,
        schedule VARCHAR(100) NOT NULL,
        retention_days INT NOT NULL DEFAULT 30,
        description TEXT,
        status policy_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE backup_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_number VARCHAR(50) NOT NULL UNIQUE,
        policy_id UUID NOT NULL REFERENCES backup_policies(id),
        initiated_by UUID NOT NULL,
        status job_status_enum NOT NULL DEFAULT 'PENDING',
        backup_path VARCHAR(500),
        size_bytes BIGINT,
        error_message TEXT,
        started_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE backup_restores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        restore_number VARCHAR(50) NOT NULL UNIQUE,
        job_id UUID NOT NULL REFERENCES backup_jobs(id),
        requested_by UUID NOT NULL,
        status restore_status_enum NOT NULL DEFAULT 'PENDING',
        target_path VARCHAR(500),
        error_message TEXT,
        started_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_backup_jobs_policy ON backup_jobs(policy_id);`);
    await queryRunner.query(`CREATE INDEX idx_backup_jobs_status ON backup_jobs(status);`);
    await queryRunner.query(`CREATE INDEX idx_backup_restores_job ON backup_restores(job_id);`);
    await queryRunner.query(`CREATE INDEX idx_backup_restores_status ON backup_restores(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS backup_restores;`);
    await queryRunner.query(`DROP TABLE IF EXISTS backup_jobs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS backup_policies;`);
    await queryRunner.query(`DROP TYPE IF EXISTS restore_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS job_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS policy_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS target_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS backup_type_enum;`);
  }
}
