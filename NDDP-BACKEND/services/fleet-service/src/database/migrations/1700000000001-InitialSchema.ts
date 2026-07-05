import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE vehicle_type_category_enum AS ENUM ('LIGHT','HEAVY','ARMORED','MOTORCYCLE','SPECIALIZED');`);
    await queryRunner.query(`CREATE TYPE fuel_type_enum AS ENUM ('PETROL','DIESEL','ELECTRIC','HYBRID');`);
    await queryRunner.query(`CREATE TYPE vehicle_status_enum AS ENUM ('REGISTERED','AVAILABLE','ASSIGNED','IN_MAINTENANCE','OUT_OF_SERVICE','DECOMMISSIONED');`);
    await queryRunner.query(`CREATE TYPE assignment_status_enum AS ENUM ('ACTIVE','RETURNED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE trip_purpose_enum AS ENUM ('PATROL','TRANSPORT','TRAINING','EMERGENCY','OTHER');`);
    await queryRunner.query(`CREATE TYPE inspection_status_enum AS ENUM ('SCHEDULED','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE inspection_result_enum AS ENUM ('PASS','FAIL','CONDITIONAL');`);

    await queryRunner.query(`
      CREATE TABLE vehicle_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category vehicle_type_category_enum NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE vehicles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_number VARCHAR(50) NOT NULL UNIQUE,
        registration_number VARCHAR(30) NOT NULL UNIQUE,
        type_id UUID NOT NULL REFERENCES vehicle_types(id),
        make VARCHAR(200) NOT NULL,
        model VARCHAR(200) NOT NULL,
        model_year INT,
        fuel_type fuel_type_enum NOT NULL DEFAULT 'DIESEL',
        status vehicle_status_enum NOT NULL DEFAULT 'REGISTERED',
        current_odometer INT NOT NULL DEFAULT 0,
        unit_id UUID,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE vehicle_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_id UUID NOT NULL REFERENCES vehicles(id),
        driver_id UUID NOT NULL,
        assigned_by UUID NOT NULL,
        assigned_at TIMESTAMPTZ NOT NULL,
        returned_at TIMESTAMPTZ,
        status assignment_status_enum NOT NULL DEFAULT 'ACTIVE',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE trip_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_id UUID NOT NULL REFERENCES vehicles(id),
        driver_id UUID NOT NULL,
        purpose trip_purpose_enum NOT NULL,
        origin VARCHAR(300) NOT NULL,
        destination VARCHAR(300) NOT NULL,
        start_odometer INT NOT NULL,
        end_odometer INT NOT NULL,
        distance_km INT NOT NULL,
        fuel_used_liters DECIMAL(8,2),
        notes TEXT,
        logged_by UUID NOT NULL,
        logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE vehicle_inspections (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_id UUID NOT NULL REFERENCES vehicles(id),
        inspector_id UUID NOT NULL,
        status inspection_status_enum NOT NULL DEFAULT 'SCHEDULED',
        result inspection_result_enum,
        scheduled_date TIMESTAMPTZ NOT NULL,
        completed_at TIMESTAMPTZ,
        findings TEXT,
        recommendations TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_vehicles_status ON vehicles(status);`);
    await queryRunner.query(`CREATE INDEX idx_assignments_driver ON vehicle_assignments(driver_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS vehicle_inspections;`);
    await queryRunner.query(`DROP TABLE IF EXISTS trip_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS vehicle_assignments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS vehicles;`);
    await queryRunner.query(`DROP TABLE IF EXISTS vehicle_types;`);
    await queryRunner.query(`DROP TYPE IF EXISTS inspection_result_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS inspection_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS trip_purpose_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS assignment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS vehicle_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS fuel_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS vehicle_type_category_enum;`);
  }
}
