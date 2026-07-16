import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE job_posting_status_enum AS ENUM ('DRAFT','PUBLISHED','CLOSED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE employment_type_enum AS ENUM ('FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP');`);
    await queryRunner.query(`CREATE TYPE application_status_enum AS ENUM ('SUBMITTED','SCREENING','INTERVIEW','OFFERED','HIRED','REJECTED','WITHDRAWN');`);
    await queryRunner.query(`CREATE TYPE interview_status_enum AS ENUM ('SCHEDULED','COMPLETED','CANCELLED','NO_SHOW');`);
    await queryRunner.query(`CREATE TYPE interview_type_enum AS ENUM ('PHONE','VIDEO','IN_PERSON','PANEL');`);

    await queryRunner.query(`
      CREATE TABLE job_postings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reference_number VARCHAR(50) NOT NULL UNIQUE,
        title VARCHAR(200) NOT NULL,
        department VARCHAR(150) NOT NULL,
        employment_type employment_type_enum NOT NULL DEFAULT 'FULL_TIME',
        location VARCHAR(200),
        description TEXT NOT NULL,
        requirements JSONB,
        positions_available INT NOT NULL DEFAULT 1,
        positions_filled INT NOT NULL DEFAULT 0,
        status job_posting_status_enum NOT NULL DEFAULT 'DRAFT',
        closing_date DATE,
        published_at TIMESTAMPTZ,
        created_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE candidates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(30),
        national_id VARCHAR(50),
        resume_url VARCHAR(500),
        linked_user_id UUID,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        job_posting_id UUID NOT NULL REFERENCES job_postings(id),
        candidate_id UUID NOT NULL REFERENCES candidates(id),
        application_number VARCHAR(50) NOT NULL UNIQUE,
        status application_status_enum NOT NULL DEFAULT 'SUBMITTED',
        cover_letter TEXT,
        assigned_recruiter_id UUID,
        rejection_reason TEXT,
        hired_at TIMESTAMPTZ,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(job_posting_id, candidate_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE application_status_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
        from_status application_status_enum,
        to_status application_status_enum NOT NULL,
        notes TEXT,
        changed_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE interviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
        type interview_type_enum NOT NULL DEFAULT 'IN_PERSON',
        status interview_status_enum NOT NULL DEFAULT 'SCHEDULED',
        scheduled_at TIMESTAMPTZ NOT NULL,
        duration_minutes INT NOT NULL DEFAULT 60,
        location VARCHAR(200),
        interviewer_ids JSONB,
        notes TEXT,
        feedback TEXT,
        rating INT,
        completed_at TIMESTAMPTZ,
        scheduled_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_job_postings_status ON job_postings(status);`);
    await queryRunner.query(`CREATE INDEX idx_applications_posting ON applications(job_posting_id);`);
    await queryRunner.query(`CREATE INDEX idx_applications_candidate ON applications(candidate_id);`);
    await queryRunner.query(`CREATE INDEX idx_applications_status ON applications(status);`);
    await queryRunner.query(`CREATE INDEX idx_interviews_application ON interviews(application_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS interviews;`);
    await queryRunner.query(`DROP TABLE IF EXISTS application_status_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS applications;`);
    await queryRunner.query(`DROP TABLE IF EXISTS candidates;`);
    await queryRunner.query(`DROP TABLE IF EXISTS job_postings;`);
    await queryRunner.query(`DROP TYPE IF EXISTS interview_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS interview_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS application_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS employment_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS job_posting_status_enum;`);
  }
}
