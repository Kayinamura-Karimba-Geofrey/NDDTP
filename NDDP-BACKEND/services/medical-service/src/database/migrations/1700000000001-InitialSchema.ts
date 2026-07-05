import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE facility_type_enum AS ENUM ('CLINIC','HOSPITAL','FIELD_UNIT','DENTAL','MENTAL_HEALTH');`);
    await queryRunner.query(`CREATE TYPE facility_status_enum AS ENUM ('ACTIVE','INACTIVE','MAINTENANCE');`);
    await queryRunner.query(`CREATE TYPE appointment_type_enum AS ENUM ('CHECKUP','CONSULTATION','VACCINATION','FOLLOW_UP','EMERGENCY');`);
    await queryRunner.query(`CREATE TYPE appointment_status_enum AS ENUM ('SCHEDULED','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED','NO_SHOW');`);
    await queryRunner.query(`CREATE TYPE record_type_enum AS ENUM ('CONSULTATION','LAB_RESULT','DIAGNOSIS','PRESCRIPTION','PROCEDURE','VACCINATION');`);
    await queryRunner.query(`CREATE TYPE fitness_classification_enum AS ENUM ('FIT','TEMPORARILY_UNFIT','PERMANENTLY_UNFIT','LIMITED_DUTY');`);
    await queryRunner.query(`CREATE TYPE fitness_status_enum AS ENUM ('ACTIVE','EXPIRED','REVOKED');`);
    await queryRunner.query(`CREATE TYPE certificate_type_enum AS ENUM ('SICK_LEAVE','FITNESS','MEDICAL_CLEARANCE','TRAVEL_CLEARANCE');`);
    await queryRunner.query(`CREATE TYPE certificate_status_enum AS ENUM ('DRAFT','ISSUED','REVOKED','EXPIRED');`);

    await queryRunner.query(`
      CREATE TABLE medical_facilities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type facility_type_enum NOT NULL,
        location VARCHAR(300),
        capacity INT NOT NULL DEFAULT 0,
        phone VARCHAR(50),
        status facility_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE medical_appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        appointment_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        facility_id UUID NOT NULL REFERENCES medical_facilities(id),
        provider_id UUID,
        type appointment_type_enum NOT NULL,
        status appointment_status_enum NOT NULL DEFAULT 'SCHEDULED',
        scheduled_at TIMESTAMPTZ NOT NULL,
        reason TEXT NOT NULL,
        notes TEXT,
        cancelled_reason TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE medical_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        appointment_id UUID,
        record_type record_type_enum NOT NULL,
        title VARCHAR(300) NOT NULL,
        diagnosis TEXT,
        notes TEXT,
        metadata JSONB,
        recorded_by UUID NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE fitness_assessments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        classification fitness_classification_enum NOT NULL,
        status fitness_status_enum NOT NULL DEFAULT 'ACTIVE',
        restrictions TEXT,
        notes TEXT,
        assessed_by UUID NOT NULL,
        valid_from DATE NOT NULL,
        valid_until DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE medical_certificates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        certificate_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        type certificate_type_enum NOT NULL,
        status certificate_status_enum NOT NULL DEFAULT 'DRAFT',
        description TEXT NOT NULL,
        valid_from DATE,
        valid_until DATE,
        issued_by UUID,
        issued_at TIMESTAMPTZ,
        revoked_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_medical_appointments_user ON medical_appointments(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_medical_appointments_status ON medical_appointments(status);`);
    await queryRunner.query(`CREATE INDEX idx_medical_records_user ON medical_records(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_fitness_assessments_user ON fitness_assessments(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_medical_certificates_user ON medical_certificates(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS medical_certificates;`);
    await queryRunner.query(`DROP TABLE IF EXISTS fitness_assessments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS medical_records;`);
    await queryRunner.query(`DROP TABLE IF EXISTS medical_appointments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS medical_facilities;`);
    await queryRunner.query(`DROP TYPE IF EXISTS certificate_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS certificate_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS fitness_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS fitness_classification_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS record_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS appointment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS appointment_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS facility_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS facility_type_enum;`);
  }
}
