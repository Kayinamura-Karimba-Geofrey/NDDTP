import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE personnel_type_enum AS ENUM ('OFFICER','NCO','ENLISTED','CIVILIAN','CONTRACTOR');`);
    await queryRunner.query(`CREATE TYPE service_status_enum AS ENUM ('ACTIVE','RESERVE','ON_LEAVE','SUSPENDED','RETIRED','SEPARATED');`);
    await queryRunner.query(`CREATE TYPE service_branch_enum AS ENUM ('ARMY','NAVY','AIR_FORCE','JOINT','CIVILIAN');`);
    await queryRunner.query(`CREATE TYPE rank_category_enum AS ENUM ('OFFICER','ENLISTED','CIVILIAN');`);
    await queryRunner.query(`CREATE TYPE unit_type_enum AS ENUM ('HEADQUARTERS','DIVISION','BRIGADE','BATTALION','COMPANY','PLATOON','SECTION','DEPARTMENT');`);
    await queryRunner.query(`CREATE TYPE assignment_type_enum AS ENUM ('PERMANENT','TEMPORARY','DEPLOYMENT','DETACHMENT');`);
    await queryRunner.query(`CREATE TYPE qualification_category_enum AS ENUM ('MILITARY','TECHNICAL','EDUCATION','CERTIFICATION','LANGUAGE');`);
    await queryRunner.query(`CREATE TYPE qualification_status_enum AS ENUM ('ACTIVE','EXPIRED','REVOKED','PENDING');`);
    await queryRunner.query(`CREATE TYPE service_event_type_enum AS ENUM ('ENLISTMENT','PROMOTION','DEMOTION','TRANSFER','DEPLOYMENT','SEPARATION','AWARD','DISCIPLINARY','TRAINING');`);

    await queryRunner.query(`
      CREATE TABLE personnel_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE,
        service_number VARCHAR(50) NOT NULL UNIQUE,
        employee_number VARCHAR(50),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        personnel_type personnel_type_enum NOT NULL DEFAULT 'ENLISTED',
        service_status service_status_enum NOT NULL DEFAULT 'ACTIVE',
        branch service_branch_enum NOT NULL DEFAULT 'ARMY',
        blood_group VARCHAR(10),
        marital_status VARCHAR(30),
        national_id VARCHAR(50),
        enlistment_date DATE,
        separation_date DATE,
        years_of_service DECIMAL(5,2),
        security_clearance VARCHAR(50),
        notes TEXT,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE ranks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(20) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        abbreviation VARCHAR(20) NOT NULL,
        level INT NOT NULL,
        category rank_category_enum NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE units (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        unit_type unit_type_enum NOT NULL,
        parent_unit_id UUID REFERENCES units(id),
        commander_personnel_id UUID,
        location VARCHAR(200),
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE rank_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        personnel_record_id UUID NOT NULL REFERENCES personnel_records(id) ON DELETE CASCADE,
        rank_id UUID NOT NULL REFERENCES ranks(id),
        effective_date DATE NOT NULL,
        end_date DATE,
        order_number VARCHAR(100),
        is_current BOOLEAN NOT NULL DEFAULT TRUE,
        promoted_by UUID,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        personnel_record_id UUID NOT NULL REFERENCES personnel_records(id) ON DELETE CASCADE,
        unit_id UUID NOT NULL REFERENCES units(id),
        position_title VARCHAR(200) NOT NULL,
        assignment_type assignment_type_enum NOT NULL DEFAULT 'PERMANENT',
        start_date DATE NOT NULL,
        end_date DATE,
        is_current BOOLEAN NOT NULL DEFAULT TRUE,
        order_number VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE qualifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category qualification_category_enum NOT NULL,
        description TEXT,
        validity_months INT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE personnel_qualifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        personnel_record_id UUID NOT NULL REFERENCES personnel_records(id) ON DELETE CASCADE,
        qualification_id UUID NOT NULL REFERENCES qualifications(id),
        obtained_date DATE NOT NULL,
        expiry_date DATE,
        certification_number VARCHAR(100),
        issuing_authority VARCHAR(200),
        status qualification_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE service_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        personnel_record_id UUID NOT NULL REFERENCES personnel_records(id) ON DELETE CASCADE,
        event_type service_event_type_enum NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        reference_number VARCHAR(100),
        recorded_by UUID,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_personnel_user_id ON personnel_records(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_personnel_service_number ON personnel_records(service_number);`);
    await queryRunner.query(`CREATE INDEX idx_personnel_status ON personnel_records(service_status);`);
    await queryRunner.query(`CREATE INDEX idx_rank_history_personnel ON rank_history(personnel_record_id);`);
    await queryRunner.query(`CREATE INDEX idx_assignments_personnel ON assignments(personnel_record_id);`);
    await queryRunner.query(`CREATE INDEX idx_service_history_personnel ON service_history(personnel_record_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS service_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS personnel_qualifications;`);
    await queryRunner.query(`DROP TABLE IF EXISTS qualifications;`);
    await queryRunner.query(`DROP TABLE IF EXISTS assignments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS rank_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS units;`);
    await queryRunner.query(`DROP TABLE IF EXISTS ranks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS personnel_records;`);
    await queryRunner.query(`DROP TYPE IF EXISTS service_event_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS qualification_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS qualification_category_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS assignment_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS unit_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS rank_category_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS service_branch_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS service_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS personnel_type_enum;`);
  }
}
