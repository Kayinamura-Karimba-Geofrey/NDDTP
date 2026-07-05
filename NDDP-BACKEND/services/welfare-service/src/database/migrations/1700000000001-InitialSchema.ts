import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE program_category_enum AS ENUM ('FINANCIAL','HOUSING','HEALTH','EDUCATION','COUNSELING','EMERGENCY');`);
    await queryRunner.query(`CREATE TYPE program_status_enum AS ENUM ('ACTIVE','INACTIVE','SUSPENDED');`);
    await queryRunner.query(`CREATE TYPE claim_status_enum AS ENUM ('DRAFT','SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED','DISBURSED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE dependent_relationship_enum AS ENUM ('SPOUSE','CHILD','PARENT','SIBLING','OTHER');`);
    await queryRunner.query(`CREATE TYPE disbursement_status_enum AS ENUM ('PENDING','PROCESSED','FAILED');`);

    await queryRunner.query(`
      CREATE TABLE welfare_programs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category program_category_enum NOT NULL,
        description TEXT,
        max_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
        eligibility_criteria JSONB,
        status program_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE dependents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        relationship dependent_relationship_enum NOT NULL,
        date_of_birth DATE,
        national_id VARCHAR(50),
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE welfare_claims (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        claim_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        program_id UUID NOT NULL REFERENCES welfare_programs(id),
        dependent_id UUID REFERENCES dependents(id),
        requested_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
        approved_amount DECIMAL(12,2),
        justification TEXT NOT NULL,
        status claim_status_enum NOT NULL DEFAULT 'DRAFT',
        reviewer_id UUID,
        rejection_reason TEXT,
        submitted_at TIMESTAMPTZ,
        approved_at TIMESTAMPTZ,
        attachments JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE claim_status_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        claim_id UUID NOT NULL REFERENCES welfare_claims(id) ON DELETE CASCADE,
        from_status claim_status_enum,
        to_status claim_status_enum NOT NULL,
        notes TEXT,
        changed_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE disbursements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        claim_id UUID NOT NULL UNIQUE REFERENCES welfare_claims(id),
        amount DECIMAL(12,2) NOT NULL,
        status disbursement_status_enum NOT NULL DEFAULT 'PENDING',
        payment_reference VARCHAR(100),
        processed_by UUID,
        processed_at TIMESTAMPTZ,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_welfare_claims_user ON welfare_claims(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_welfare_claims_status ON welfare_claims(status);`);
    await queryRunner.query(`CREATE INDEX idx_dependents_user ON dependents(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS disbursements;`);
    await queryRunner.query(`DROP TABLE IF EXISTS claim_status_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS welfare_claims;`);
    await queryRunner.query(`DROP TABLE IF EXISTS dependents;`);
    await queryRunner.query(`DROP TABLE IF EXISTS welfare_programs;`);
    await queryRunner.query(`DROP TYPE IF EXISTS disbursement_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS dependent_relationship_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS claim_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS program_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS program_category_enum;`);
  }
}
