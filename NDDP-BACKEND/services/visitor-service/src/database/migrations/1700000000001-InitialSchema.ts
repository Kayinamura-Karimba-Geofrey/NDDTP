import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE site_type_enum AS ENUM ('MAIN_GATE','SECONDARY_GATE','BUILDING','RESTRICTED','OTHER');`);
    await queryRunner.query(`CREATE TYPE site_status_enum AS ENUM ('ACTIVE','INACTIVE','CLOSED');`);
    await queryRunner.query(`CREATE TYPE visitor_status_enum AS ENUM ('ACTIVE','INACTIVE','BLACKLISTED');`);
    await queryRunner.query(`CREATE TYPE id_document_type_enum AS ENUM ('NATIONAL_ID','PASSPORT','MILITARY_ID','DRIVERS_LICENSE','OTHER');`);
    await queryRunner.query(`CREATE TYPE visit_status_enum AS ENUM ('PENDING','APPROVED','REJECTED','ACTIVE','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE check_in_type_enum AS ENUM ('CHECK_IN','CHECK_OUT');`);

    await queryRunner.query(`
      CREATE TABLE visit_sites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        site_type site_type_enum NOT NULL,
        location VARCHAR(300),
        status site_status_enum NOT NULL DEFAULT 'ACTIVE',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE visitors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        id_number VARCHAR(50) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        organization VARCHAR(200),
        id_document_type id_document_type_enum NOT NULL,
        phone VARCHAR(30),
        email VARCHAR(200),
        status visitor_status_enum NOT NULL DEFAULT 'ACTIVE',
        registered_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE visit_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        visit_number VARCHAR(50) NOT NULL UNIQUE,
        visitor_id UUID NOT NULL REFERENCES visitors(id),
        site_id UUID NOT NULL REFERENCES visit_sites(id),
        host_id UUID NOT NULL,
        purpose VARCHAR(300) NOT NULL,
        scheduled_at TIMESTAMPTZ NOT NULL,
        expected_departure TIMESTAMPTZ,
        status visit_status_enum NOT NULL DEFAULT 'PENDING',
        reviewer_id UUID,
        rejection_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE check_in_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        visit_id UUID NOT NULL REFERENCES visit_requests(id),
        site_id UUID NOT NULL REFERENCES visit_sites(id),
        check_type check_in_type_enum NOT NULL,
        recorded_by UUID NOT NULL,
        notes TEXT,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_visit_requests_status ON visit_requests(status);`);
    await queryRunner.query(`CREATE INDEX idx_visit_requests_visitor ON visit_requests(visitor_id);`);
    await queryRunner.query(`CREATE INDEX idx_visitors_status ON visitors(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS check_in_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS visit_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS visitors;`);
    await queryRunner.query(`DROP TABLE IF EXISTS visit_sites;`);
    await queryRunner.query(`DROP TYPE IF EXISTS check_in_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS visit_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS id_document_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS visitor_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS site_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS site_type_enum;`);
  }
}
