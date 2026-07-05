import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE report_type_enum AS ENUM ('PERSONNEL','FINANCE','OPERATIONS','LOGISTICS','AUDIT','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE report_category_enum AS ENUM ('SUMMARY','DETAIL','ANALYTICS','COMPLIANCE');`);
    await queryRunner.query(`CREATE TYPE output_format_enum AS ENUM ('PDF','CSV','JSON','XLSX');`);
    await queryRunner.query(`CREATE TYPE definition_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE request_status_enum AS ENUM ('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE output_status_enum AS ENUM ('GENERATED','FAILED');`);
    await queryRunner.query(`CREATE TYPE schedule_status_enum AS ENUM ('ACTIVE','INACTIVE');`);

    await queryRunner.query(`
      CREATE TABLE report_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        report_type report_type_enum NOT NULL,
        category report_category_enum NOT NULL,
        output_format output_format_enum NOT NULL DEFAULT 'PDF',
        description TEXT,
        status definition_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE report_schedules (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        definition_id UUID NOT NULL REFERENCES report_definitions(id),
        cron_expression VARCHAR(100) NOT NULL,
        created_by UUID NOT NULL,
        status schedule_status_enum NOT NULL DEFAULT 'ACTIVE',
        last_run_at TIMESTAMPTZ,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE report_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_number VARCHAR(50) NOT NULL UNIQUE,
        definition_id UUID NOT NULL REFERENCES report_definitions(id),
        requested_by UUID NOT NULL,
        schedule_id UUID REFERENCES report_schedules(id),
        status request_status_enum NOT NULL DEFAULT 'PENDING',
        parameters JSONB,
        error_message TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE report_outputs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id UUID NOT NULL REFERENCES report_requests(id) ON DELETE CASCADE,
        output_format output_format_enum NOT NULL,
        file_path VARCHAR(500),
        record_count INT NOT NULL DEFAULT 0,
        status output_status_enum NOT NULL DEFAULT 'GENERATED',
        generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_report_requests_status ON report_requests(status);`);
    await queryRunner.query(`CREATE INDEX idx_report_requests_definition ON report_requests(definition_id);`);
    await queryRunner.query(`CREATE INDEX idx_report_schedules_status ON report_schedules(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS report_outputs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS report_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS report_schedules;`);
    await queryRunner.query(`DROP TABLE IF EXISTS report_definitions;`);
    await queryRunner.query(`DROP TYPE IF EXISTS schedule_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS output_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS request_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS definition_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS output_format_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS report_category_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS report_type_enum;`);
  }
}
