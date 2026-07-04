import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE asset_type_enum AS ENUM ('EQUIPMENT','VEHICLE','WEAPON','IT','FURNITURE','OTHER');`);
    await queryRunner.query(`CREATE TYPE asset_status_enum AS ENUM ('REGISTERED','AVAILABLE','ASSIGNED','IN_MAINTENANCE','DISPOSED','LOST');`);
    await queryRunner.query(`CREATE TYPE assignment_status_enum AS ENUM ('ACTIVE','RETURNED');`);
    await queryRunner.query(`CREATE TYPE movement_type_enum AS ENUM ('ASSIGNMENT','RETURN','TRANSFER','DISPOSAL','MAINTENANCE');`);
    await queryRunner.query(`CREATE TYPE audit_status_enum AS ENUM ('SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE asset_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type asset_type_enum NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE assets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        asset_number VARCHAR(50) NOT NULL UNIQUE,
        category_id UUID NOT NULL REFERENCES asset_categories(id),
        name VARCHAR(300) NOT NULL,
        serial_number VARCHAR(100),
        status asset_status_enum NOT NULL DEFAULT 'REGISTERED',
        unit_id UUID,
        acquisition_date DATE,
        value DECIMAL(14,2),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE asset_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        asset_id UUID NOT NULL REFERENCES assets(id),
        user_id UUID NOT NULL,
        unit_id UUID,
        status assignment_status_enum NOT NULL DEFAULT 'ACTIVE',
        assigned_by UUID NOT NULL,
        assigned_at TIMESTAMPTZ NOT NULL,
        returned_at TIMESTAMPTZ,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE asset_movements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        asset_id UUID NOT NULL REFERENCES assets(id),
        movement_type movement_type_enum NOT NULL,
        from_unit_id UUID,
        to_unit_id UUID,
        from_user_id UUID,
        to_user_id UUID,
        notes TEXT,
        moved_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE asset_audits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        audit_number VARCHAR(50) NOT NULL UNIQUE,
        unit_id UUID NOT NULL,
        conducted_by UUID NOT NULL,
        audit_date DATE NOT NULL,
        status audit_status_enum NOT NULL DEFAULT 'SCHEDULED',
        findings JSONB,
        summary TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_assets_status ON assets(status);`);
    await queryRunner.query(`CREATE INDEX idx_assets_unit ON assets(unit_id);`);
    await queryRunner.query(`CREATE INDEX idx_asset_assignments_asset ON asset_assignments(asset_id);`);
    await queryRunner.query(`CREATE INDEX idx_asset_movements_asset ON asset_movements(asset_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS asset_audits;`);
    await queryRunner.query(`DROP TABLE IF EXISTS asset_movements;`);
    await queryRunner.query(`DROP TABLE IF EXISTS asset_assignments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS assets;`);
    await queryRunner.query(`DROP TABLE IF EXISTS asset_categories;`);
    await queryRunner.query(`DROP TYPE IF EXISTS audit_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS movement_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS assignment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS asset_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS asset_type_enum;`);
  }
}
