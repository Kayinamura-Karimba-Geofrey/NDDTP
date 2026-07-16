import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE maintenance_type_enum AS ENUM ('PREVENTIVE','CORRECTIVE','EMERGENCY','INSPECTION');`);
    await queryRunner.query(`CREATE TYPE asset_reference_type_enum AS ENUM ('VEHICLE','FACILITY','EQUIPMENT','OTHER');`);
    await queryRunner.query(`CREATE TYPE maintenance_priority_enum AS ENUM ('ROUTINE','URGENT','CRITICAL');`);
    await queryRunner.query(`CREATE TYPE request_status_enum AS ENUM ('SUBMITTED','APPROVED','REJECTED','IN_PROGRESS','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE work_order_status_enum AS ENUM ('DRAFT','SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE task_status_enum AS ENUM ('PENDING','IN_PROGRESS','COMPLETED','SKIPPED');`);

    await queryRunner.query(`
      CREATE TABLE maintenance_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type maintenance_type_enum NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE maintenance_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_number VARCHAR(50) NOT NULL UNIQUE,
        category_id UUID NOT NULL REFERENCES maintenance_categories(id),
        asset_type asset_reference_type_enum NOT NULL,
        asset_id UUID NOT NULL,
        requested_by UUID NOT NULL,
        status request_status_enum NOT NULL DEFAULT 'SUBMITTED',
        priority maintenance_priority_enum NOT NULL DEFAULT 'ROUTINE',
        description TEXT NOT NULL,
        rejection_reason TEXT,
        reviewer_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE work_orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number VARCHAR(50) NOT NULL UNIQUE,
        request_id UUID REFERENCES maintenance_requests(id),
        assigned_to UUID,
        status work_order_status_enum NOT NULL DEFAULT 'DRAFT',
        scheduled_date TIMESTAMPTZ,
        started_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_by UUID NOT NULL,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE work_order_tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        work_order_id UUID NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
        description VARCHAR(300) NOT NULL,
        status task_status_enum NOT NULL DEFAULT 'PENDING',
        estimated_hours DECIMAL(6,2),
        completed_at TIMESTAMPTZ,
        completed_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE maintenance_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        work_order_id UUID NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
        event_type VARCHAR(50) NOT NULL,
        notes TEXT,
        recorded_by UUID NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_requests_status ON maintenance_requests(status);`);
    await queryRunner.query(`CREATE INDEX idx_requests_asset ON maintenance_requests(asset_type, asset_id);`);
    await queryRunner.query(`CREATE INDEX idx_work_orders_status ON work_orders(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS maintenance_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS work_order_tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS work_orders;`);
    await queryRunner.query(`DROP TABLE IF EXISTS maintenance_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS maintenance_categories;`);
    await queryRunner.query(`DROP TYPE IF EXISTS task_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS work_order_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS request_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS maintenance_priority_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS asset_reference_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS maintenance_type_enum;`);
  }
}
