import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE item_category_enum AS ENUM ('CONSUMABLE','SPARE_PART','AMMUNITION','MEDICAL_SUPPLY','UNIFORM','OTHER');`);
    await queryRunner.query(`CREATE TYPE unit_of_measure_enum AS ENUM ('EACH','BOX','KG','LITER','SET');`);
    await queryRunner.query(`CREATE TYPE warehouse_status_enum AS ENUM ('ACTIVE','INACTIVE','MAINTENANCE');`);
    await queryRunner.query(`CREATE TYPE stock_movement_type_enum AS ENUM ('RECEIPT','ISSUE','TRANSFER_IN','TRANSFER_OUT','ADJUSTMENT');`);
    await queryRunner.query(`CREATE TYPE request_status_enum AS ENUM ('PENDING','APPROVED','REJECTED','FULFILLED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE warehouses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        location VARCHAR(300),
        status warehouse_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE inventory_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sku VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(300) NOT NULL,
        category item_category_enum NOT NULL,
        unit unit_of_measure_enum NOT NULL DEFAULT 'EACH',
        description TEXT,
        reorder_level INT NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE stock_levels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        warehouse_id UUID NOT NULL REFERENCES warehouses(id),
        item_id UUID NOT NULL REFERENCES inventory_items(id),
        quantity INT NOT NULL DEFAULT 0,
        reserved_quantity INT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(warehouse_id, item_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE stock_movements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        warehouse_id UUID NOT NULL REFERENCES warehouses(id),
        item_id UUID NOT NULL REFERENCES inventory_items(id),
        movement_type stock_movement_type_enum NOT NULL,
        quantity INT NOT NULL,
        reference_number VARCHAR(50),
        notes TEXT,
        performed_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE stock_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_number VARCHAR(50) NOT NULL UNIQUE,
        warehouse_id UUID NOT NULL REFERENCES warehouses(id),
        item_id UUID NOT NULL REFERENCES inventory_items(id),
        requested_by UUID NOT NULL,
        requested_quantity INT NOT NULL,
        approved_quantity INT,
        status request_status_enum NOT NULL DEFAULT 'PENDING',
        justification TEXT,
        rejection_reason TEXT,
        reviewer_id UUID,
        fulfilled_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_stock_levels_warehouse ON stock_levels(warehouse_id);`);
    await queryRunner.query(`CREATE INDEX idx_stock_movements_warehouse ON stock_movements(warehouse_id);`);
    await queryRunner.query(`CREATE INDEX idx_stock_requests_status ON stock_requests(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS stock_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS stock_movements;`);
    await queryRunner.query(`DROP TABLE IF EXISTS stock_levels;`);
    await queryRunner.query(`DROP TABLE IF EXISTS inventory_items;`);
    await queryRunner.query(`DROP TABLE IF EXISTS warehouses;`);
    await queryRunner.query(`DROP TYPE IF EXISTS request_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS stock_movement_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS warehouse_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS unit_of_measure_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS item_category_enum;`);
  }
}
