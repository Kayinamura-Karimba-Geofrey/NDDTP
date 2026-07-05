import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE course_category_enum AS ENUM ('COMBAT','LEADERSHIP','TECHNICAL','COMPLIANCE','SPECIALIZED');`);
    await queryRunner.query(`CREATE TYPE course_status_enum AS ENUM ('ACTIVE','INACTIVE','ARCHIVED');`);
    await queryRunner.query(`CREATE TYPE session_status_enum AS ENUM ('SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE enrollment_status_enum AS ENUM ('PENDING','APPROVED','REJECTED','ENROLLED','IN_PROGRESS','COMPLETED','WITHDRAWN','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE attendance_status_enum AS ENUM ('PRESENT','ABSENT','LATE','EXCUSED');`);
    await queryRunner.query(`CREATE TYPE certification_status_enum AS ENUM ('DRAFT','ISSUED','REVOKED','EXPIRED');`);

    await queryRunner.query(`
      CREATE TABLE training_courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category course_category_enum NOT NULL,
        description TEXT,
        duration_days INT NOT NULL DEFAULT 1,
        max_participants INT NOT NULL DEFAULT 0,
        prerequisites JSONB,
        status course_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE training_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_code VARCHAR(50) NOT NULL UNIQUE,
        course_id UUID NOT NULL REFERENCES training_courses(id),
        instructor_id UUID,
        location VARCHAR(300),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        capacity INT NOT NULL DEFAULT 0,
        status session_status_enum NOT NULL DEFAULT 'SCHEDULED',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE training_enrollments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        session_id UUID NOT NULL REFERENCES training_sessions(id),
        status enrollment_status_enum NOT NULL DEFAULT 'PENDING',
        justification TEXT,
        reviewer_id UUID,
        rejection_reason TEXT,
        score DECIMAL(5,2),
        submitted_at TIMESTAMPTZ,
        approved_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE session_attendance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id UUID NOT NULL REFERENCES training_enrollments(id) ON DELETE CASCADE,
        attendance_date DATE NOT NULL,
        status attendance_status_enum NOT NULL,
        notes TEXT,
        recorded_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE training_certifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        certificate_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        enrollment_id UUID NOT NULL REFERENCES training_enrollments(id),
        course_id UUID NOT NULL REFERENCES training_courses(id),
        status certification_status_enum NOT NULL DEFAULT 'DRAFT',
        score DECIMAL(5,2),
        valid_until DATE,
        issued_by UUID,
        issued_at TIMESTAMPTZ,
        revoked_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_training_sessions_course ON training_sessions(course_id);`);
    await queryRunner.query(`CREATE INDEX idx_training_enrollments_user ON training_enrollments(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_training_enrollments_session ON training_enrollments(session_id);`);
    await queryRunner.query(`CREATE INDEX idx_session_attendance_enrollment ON session_attendance(enrollment_id);`);
    await queryRunner.query(`CREATE INDEX idx_training_certifications_user ON training_certifications(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS training_certifications;`);
    await queryRunner.query(`DROP TABLE IF EXISTS session_attendance;`);
    await queryRunner.query(`DROP TABLE IF EXISTS training_enrollments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS training_sessions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS training_courses;`);
    await queryRunner.query(`DROP TYPE IF EXISTS certification_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS attendance_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS enrollment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS session_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS course_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS course_category_enum;`);
  }
}
