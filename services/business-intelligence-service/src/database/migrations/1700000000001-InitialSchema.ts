import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE data_source_type_enum AS ENUM ('WAREHOUSE','MART','EXTERNAL','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE dataset_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE model_status_enum AS ENUM ('DRAFT','ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE bi_report_type_enum AS ENUM ('TABULAR','PIVOT','CHART','COMBINED');`);
    await queryRunner.query(`CREATE TYPE report_definition_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE execution_status_enum AS ENUM ('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE bi_datasets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        source_type data_source_type_enum NOT NULL,
        schema JSONB,
        description TEXT,
        status dataset_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE semantic_models (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        dataset_id UUID NOT NULL REFERENCES bi_datasets(id),
        dimensions JSONB NOT NULL DEFAULT '[]',
        measures JSONB NOT NULL DEFAULT '[]',
        description TEXT,
        status model_status_enum NOT NULL DEFAULT 'DRAFT',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE bi_report_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        model_id UUID NOT NULL REFERENCES semantic_models(id),
        report_type bi_report_type_enum NOT NULL,
        layout JSONB,
        description TEXT,
        status report_definition_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE bi_report_executions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        execution_number VARCHAR(50) NOT NULL UNIQUE,
        report_id UUID NOT NULL REFERENCES bi_report_definitions(id),
        requested_by UUID NOT NULL,
        status execution_status_enum NOT NULL DEFAULT 'PENDING',
        parameters JSONB,
        result JSONB,
        error_message TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_semantic_models_dataset ON semantic_models(dataset_id);`);
    await queryRunner.query(`CREATE INDEX idx_bi_report_definitions_model ON bi_report_definitions(model_id);`);
    await queryRunner.query(`CREATE INDEX idx_bi_report_executions_status ON bi_report_executions(status);`);
    await queryRunner.query(`CREATE INDEX idx_bi_report_executions_report ON bi_report_executions(report_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS bi_report_executions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS bi_report_definitions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS semantic_models;`);
    await queryRunner.query(`DROP TABLE IF EXISTS bi_datasets;`);
    await queryRunner.query(`DROP TYPE IF EXISTS execution_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS report_definition_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS bi_report_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS model_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS dataset_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS data_source_type_enum;`);
  }
}
