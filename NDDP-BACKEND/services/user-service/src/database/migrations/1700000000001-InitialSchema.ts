import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE user_status_enum AS ENUM ('PENDING','ACTIVE','INACTIVE','SUSPENDED','TERMINATED');`);
    await queryRunner.query(`CREATE TYPE gender_enum AS ENUM ('MALE','FEMALE','OTHER','PREFER_NOT_TO_SAY');`);
    await queryRunner.query(`CREATE TYPE address_type_enum AS ENUM ('HOME','WORK','MAILING');`);
    await queryRunner.query(`CREATE TYPE department_type_enum AS ENUM ('HEADQUARTERS','COMMAND','UNIT','SECTION','DEPARTMENT');`);
    await queryRunner.query(`CREATE TYPE department_status_enum AS ENUM ('ACTIVE','INACTIVE');`);

    await queryRunner.query(`
      CREATE TABLE departments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        type department_type_enum NOT NULL DEFAULT 'DEPARTMENT',
        parent_id UUID REFERENCES departments(id) ON DELETE SET NULL,
        status department_status_enum NOT NULL DEFAULT 'ACTIVE',
        head_user_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        employee_number VARCHAR(50) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        middle_name VARCHAR(100),
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(30),
        alternate_phone VARCHAR(30),
        date_of_birth DATE,
        gender gender_enum,
        nationality VARCHAR(100),
        rank VARCHAR(100),
        job_title VARCHAR(150),
        department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
        unit_id UUID,
        supervisor_id UUID REFERENCES users(id) ON DELETE SET NULL,
        status user_status_enum NOT NULL DEFAULT 'PENDING',
        hire_date DATE,
        termination_date DATE,
        profile_photo_url VARCHAR(500),
        has_credentials BOOLEAN NOT NULL DEFAULT FALSE,
        credentials_registered_at TIMESTAMPTZ,
        last_login_at TIMESTAMPTZ,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_addresses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type address_type_enum NOT NULL DEFAULT 'HOME',
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100) NOT NULL,
        is_primary BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_emergency_contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(200) NOT NULL,
        relationship VARCHAR(50),
        phone VARCHAR(30) NOT NULL,
        email VARCHAR(255),
        is_primary BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_preferences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        key VARCHAR(100) NOT NULL,
        value JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, key)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_users_email ON users(email);`);
    await queryRunner.query(`CREATE INDEX idx_users_employee_number ON users(employee_number);`);
    await queryRunner.query(`CREATE INDEX idx_users_status ON users(status);`);
    await queryRunner.query(`CREATE INDEX idx_users_department_id ON users(department_id);`);
    await queryRunner.query(`CREATE INDEX idx_departments_code ON departments(code);`);
    await queryRunner.query(`CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_user_emergency_contacts_user_id ON user_emergency_contacts(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_preferences;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_emergency_contacts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_addresses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    await queryRunner.query(`DROP TABLE IF EXISTS departments;`);
    await queryRunner.query(`DROP TYPE IF EXISTS department_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS department_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS address_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS gender_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS user_status_enum;`);
  }
}
