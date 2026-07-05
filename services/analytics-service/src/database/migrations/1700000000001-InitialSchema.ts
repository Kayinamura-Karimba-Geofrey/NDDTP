import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE metric_domain_enum AS ENUM ('PERSONNEL','FINANCE','OPERATIONS','LOGISTICS','READINESS','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE aggregation_type_enum AS ENUM ('SUM','AVG','COUNT','MIN','MAX','RATE');`);
    await queryRunner.query(`CREATE TYPE metric_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE dashboard_status_enum AS ENUM ('DRAFT','ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE query_status_enum AS ENUM ('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE metric_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        domain metric_domain_enum NOT NULL,
        aggregation_type aggregation_type_enum NOT NULL,
        unit VARCHAR(50),
        description TEXT,
        status metric_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE metric_snapshots (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        metric_id UUID NOT NULL REFERENCES metric_definitions(id),
        period_start TIMESTAMPTZ NOT NULL,
        period_end TIMESTAMPTZ NOT NULL,
        value DECIMAL(18,4) NOT NULL,
        dimensions JSONB,
        recorded_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE dashboards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        created_by UUID NOT NULL,
        status dashboard_status_enum NOT NULL DEFAULT 'DRAFT',
        widgets JSONB NOT NULL DEFAULT '[]',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE analytics_queries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        query_number VARCHAR(50) NOT NULL UNIQUE,
        requested_by UUID NOT NULL,
        status query_status_enum NOT NULL DEFAULT 'PENDING',
        parameters JSONB,
        result JSONB,
        error_message TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_metric_snapshots_metric_period ON metric_snapshots(metric_id, period_start, period_end);`);
    await queryRunner.query(`CREATE INDEX idx_analytics_queries_status ON analytics_queries(status);`);
    await queryRunner.query(`CREATE INDEX idx_dashboards_status ON dashboards(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS analytics_queries;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dashboards;`);
    await queryRunner.query(`DROP TABLE IF EXISTS metric_snapshots;`);
    await queryRunner.query(`DROP TABLE IF EXISTS metric_definitions;`);
    await queryRunner.query(`DROP TYPE IF EXISTS query_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS dashboard_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS metric_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS aggregation_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS metric_domain_enum;`);
  }
}
