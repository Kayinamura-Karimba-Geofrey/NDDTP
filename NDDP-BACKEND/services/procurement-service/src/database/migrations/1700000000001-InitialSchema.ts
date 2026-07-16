import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE vendor_status_enum AS ENUM ('ACTIVE','INACTIVE','SUSPENDED');`);
    await queryRunner.query(`CREATE TYPE vendor_category_enum AS ENUM ('GENERAL','MEDICAL','IT','CONSTRUCTION','UNIFORM','VEHICLE');`);
    await queryRunner.query(`CREATE TYPE requisition_status_enum AS ENUM ('DRAFT','SUBMITTED','APPROVED','REJECTED','ORDERED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE order_status_enum AS ENUM ('DRAFT','ISSUED','PARTIALLY_RECEIVED','RECEIVED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE procurement_priority_enum AS ENUM ('ROUTINE','URGENT','CRITICAL');`);
    await queryRunner.query(`CREATE TYPE receipt_status_enum AS ENUM ('COMPLETED','VOIDED');`);

    await queryRunner.query(`
      CREATE TABLE vendors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category vendor_category_enum NOT NULL DEFAULT 'GENERAL',
        contact_email VARCHAR(200),
        contact_phone VARCHAR(30),
        address VARCHAR(300),
        status vendor_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE purchase_requisitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        requisition_number VARCHAR(50) NOT NULL UNIQUE,
        requested_by UUID NOT NULL,
        department_id UUID,
        status requisition_status_enum NOT NULL DEFAULT 'DRAFT',
        priority procurement_priority_enum NOT NULL DEFAULT 'ROUTINE',
        justification TEXT,
        rejection_reason TEXT,
        reviewer_id UUID,
        approved_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE requisition_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        requisition_id UUID NOT NULL REFERENCES purchase_requisitions(id) ON DELETE CASCADE,
        description VARCHAR(300) NOT NULL,
        quantity INT NOT NULL,
        unit VARCHAR(20) NOT NULL DEFAULT 'EACH',
        estimated_unit_cost DECIMAL(12,2),
        inventory_item_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE purchase_orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number VARCHAR(50) NOT NULL UNIQUE,
        vendor_id UUID NOT NULL REFERENCES vendors(id),
        requisition_id UUID REFERENCES purchase_requisitions(id),
        status order_status_enum NOT NULL DEFAULT 'DRAFT',
        total_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
        created_by UUID NOT NULL,
        issued_at TIMESTAMPTZ,
        expected_delivery TIMESTAMPTZ,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE purchase_order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
        description VARCHAR(300) NOT NULL,
        quantity INT NOT NULL,
        received_quantity INT NOT NULL DEFAULT 0,
        unit VARCHAR(20) NOT NULL DEFAULT 'EACH',
        unit_price DECIMAL(12,2) NOT NULL,
        inventory_item_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE goods_receipts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        receipt_number VARCHAR(50) NOT NULL UNIQUE,
        order_id UUID NOT NULL REFERENCES purchase_orders(id),
        order_item_id UUID NOT NULL REFERENCES purchase_order_items(id),
        quantity INT NOT NULL,
        received_by UUID NOT NULL,
        warehouse_id UUID,
        status receipt_status_enum NOT NULL DEFAULT 'COMPLETED',
        notes TEXT,
        received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_requisitions_status ON purchase_requisitions(status);`);
    await queryRunner.query(`CREATE INDEX idx_orders_status ON purchase_orders(status);`);
    await queryRunner.query(`CREATE INDEX idx_orders_vendor ON purchase_orders(vendor_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS goods_receipts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_order_items;`);
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_orders;`);
    await queryRunner.query(`DROP TABLE IF EXISTS requisition_items;`);
    await queryRunner.query(`DROP TABLE IF EXISTS purchase_requisitions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS vendors;`);
    await queryRunner.query(`DROP TYPE IF EXISTS receipt_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS procurement_priority_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS order_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS requisition_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS vendor_category_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS vendor_status_enum;`);
  }
}
