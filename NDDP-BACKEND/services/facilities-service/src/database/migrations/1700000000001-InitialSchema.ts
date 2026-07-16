import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE facility_type_category_enum AS ENUM ('BARRACKS','OFFICE','TRAINING','MEDICAL','WAREHOUSE','OTHER');`);
    await queryRunner.query(`CREATE TYPE facility_status_enum AS ENUM ('ACTIVE','INACTIVE','UNDER_RENOVATION','CLOSED');`);
    await queryRunner.query(`CREATE TYPE space_type_enum AS ENUM ('ROOM','HALL','OFFICE','STORAGE','LAB','OTHER');`);
    await queryRunner.query(`CREATE TYPE space_status_enum AS ENUM ('AVAILABLE','OCCUPIED','RESERVED','MAINTENANCE','CLOSED');`);
    await queryRunner.query(`CREATE TYPE booking_status_enum AS ENUM ('PENDING','APPROVED','REJECTED','ACTIVE','COMPLETED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE facility_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category facility_type_category_enum NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE facilities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type_id UUID NOT NULL REFERENCES facility_types(id),
        location VARCHAR(300),
        capacity INT NOT NULL DEFAULT 0,
        status facility_status_enum NOT NULL DEFAULT 'ACTIVE',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE facility_spaces (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
        code VARCHAR(50) NOT NULL,
        name VARCHAR(200) NOT NULL,
        space_type space_type_enum NOT NULL,
        capacity INT NOT NULL DEFAULT 1,
        status space_status_enum NOT NULL DEFAULT 'AVAILABLE',
        floor VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(facility_id, code)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE space_bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_number VARCHAR(50) NOT NULL UNIQUE,
        space_id UUID NOT NULL REFERENCES facility_spaces(id),
        booked_by UUID NOT NULL,
        purpose VARCHAR(300) NOT NULL,
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ NOT NULL,
        attendees INT NOT NULL DEFAULT 1,
        status booking_status_enum NOT NULL DEFAULT 'PENDING',
        reviewer_id UUID,
        rejection_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE booking_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_id UUID NOT NULL REFERENCES space_bookings(id) ON DELETE CASCADE,
        event_type VARCHAR(50) NOT NULL,
        notes TEXT,
        recorded_by UUID NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_facilities_status ON facilities(status);`);
    await queryRunner.query(`CREATE INDEX idx_spaces_status ON facility_spaces(status);`);
    await queryRunner.query(`CREATE INDEX idx_bookings_space_time ON space_bookings(space_id, start_time, end_time);`);
    await queryRunner.query(`CREATE INDEX idx_bookings_status ON space_bookings(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS booking_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS space_bookings;`);
    await queryRunner.query(`DROP TABLE IF EXISTS facility_spaces;`);
    await queryRunner.query(`DROP TABLE IF EXISTS facilities;`);
    await queryRunner.query(`DROP TABLE IF EXISTS facility_types;`);
    await queryRunner.query(`DROP TYPE IF EXISTS booking_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS space_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS space_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS facility_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS facility_type_category_enum;`);
  }
}
