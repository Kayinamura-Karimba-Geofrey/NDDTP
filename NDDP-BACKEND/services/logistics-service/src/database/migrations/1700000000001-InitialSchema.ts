import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE location_type_enum AS ENUM ('DEPOT','BASE','FIELD_SITE','MEDICAL_FACILITY','CHECKPOINT');`);
    await queryRunner.query(`CREATE TYPE location_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE transport_mode_enum AS ENUM ('GROUND','AIR','SEA','RAIL');`);
    await queryRunner.query(`CREATE TYPE route_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE shipment_status_enum AS ENUM ('DRAFT','SCHEDULED','DISPATCHED','IN_TRANSIT','DELAYED','DELIVERED','CANCELLED','FAILED');`);
    await queryRunner.query(`CREATE TYPE shipment_priority_enum AS ENUM ('ROUTINE','URGENT','CRITICAL');`);
    await queryRunner.query(`CREATE TYPE tracking_event_type_enum AS ENUM ('CREATED','SCHEDULED','DISPATCHED','IN_TRANSIT','LOCATION_UPDATE','DELAYED','DELIVERED','CANCELLED','FAILED');`);

    await queryRunner.query(`
      CREATE TABLE logistics_locations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type location_type_enum NOT NULL,
        address VARCHAR(300),
        latitude DECIMAL(10,7),
        longitude DECIMAL(10,7),
        status location_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE transport_routes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        origin_location_id UUID NOT NULL REFERENCES logistics_locations(id),
        destination_location_id UUID NOT NULL REFERENCES logistics_locations(id),
        transport_mode transport_mode_enum NOT NULL,
        distance_km DECIMAL(8,2),
        estimated_hours DECIMAL(6,2),
        status route_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE shipments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shipment_number VARCHAR(50) NOT NULL UNIQUE,
        origin_location_id UUID NOT NULL REFERENCES logistics_locations(id),
        destination_location_id UUID NOT NULL REFERENCES logistics_locations(id),
        route_id UUID REFERENCES transport_routes(id),
        transport_mode transport_mode_enum NOT NULL,
        priority shipment_priority_enum NOT NULL DEFAULT 'ROUTINE',
        status shipment_status_enum NOT NULL DEFAULT 'DRAFT',
        scheduled_date TIMESTAMPTZ,
        dispatched_at TIMESTAMPTZ,
        delivered_at TIMESTAMPTZ,
        driver_id UUID,
        vehicle_id UUID,
        created_by UUID NOT NULL,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE shipment_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
        inventory_item_id UUID,
        description VARCHAR(300) NOT NULL,
        quantity INT NOT NULL,
        unit VARCHAR(20) NOT NULL DEFAULT 'EACH',
        weight_kg DECIMAL(8,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE shipment_tracking (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
        event_type tracking_event_type_enum NOT NULL,
        location VARCHAR(300),
        notes TEXT,
        recorded_by UUID NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_shipments_status ON shipments(status);`);
    await queryRunner.query(`CREATE INDEX idx_shipments_origin ON shipments(origin_location_id);`);
    await queryRunner.query(`CREATE INDEX idx_shipments_destination ON shipments(destination_location_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS shipment_tracking;`);
    await queryRunner.query(`DROP TABLE IF EXISTS shipment_items;`);
    await queryRunner.query(`DROP TABLE IF EXISTS shipments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS transport_routes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS logistics_locations;`);
    await queryRunner.query(`DROP TYPE IF EXISTS tracking_event_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS shipment_priority_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS shipment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS route_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS transport_mode_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS location_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS location_type_enum;`);
  }
}
