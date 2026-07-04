import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE leave_request_status_enum AS ENUM ('DRAFT','SUBMITTED','PENDING_APPROVAL','APPROVED','REJECTED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE leave_approval_decision_enum AS ENUM ('APPROVED','REJECTED');`);
    await queryRunner.query(`CREATE TYPE accrual_type_enum AS ENUM ('ANNUAL','MONTHLY','NONE');`);

    await queryRunner.query(`
      CREATE TABLE leave_types (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(30) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        default_days DECIMAL(6,2) NOT NULL DEFAULT 0,
        accrual_type accrual_type_enum NOT NULL DEFAULT 'ANNUAL',
        requires_approval BOOLEAN NOT NULL DEFAULT TRUE,
        max_consecutive_days INT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE leave_balances (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        leave_type_id UUID NOT NULL REFERENCES leave_types(id),
        year INT NOT NULL,
        total_days DECIMAL(6,2) NOT NULL DEFAULT 0,
        used_days DECIMAL(6,2) NOT NULL DEFAULT 0,
        pending_days DECIMAL(6,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, leave_type_id, year)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE leave_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        leave_type_id UUID NOT NULL REFERENCES leave_types(id),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_days DECIMAL(6,2) NOT NULL,
        reason TEXT,
        status leave_request_status_enum NOT NULL DEFAULT 'DRAFT',
        approver_id UUID,
        submitted_at TIMESTAMPTZ,
        approved_at TIMESTAMPTZ,
        rejection_reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE leave_approvals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        leave_request_id UUID NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
        approver_id UUID NOT NULL,
        decision leave_approval_decision_enum NOT NULL,
        comments TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE leave_status_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        leave_request_id UUID NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
        from_status leave_request_status_enum,
        to_status leave_request_status_enum NOT NULL,
        notes TEXT,
        changed_by UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_leave_balances_user ON leave_balances(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_leave_requests_user ON leave_requests(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_leave_requests_status ON leave_requests(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS leave_status_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_approvals;`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_balances;`);
    await queryRunner.query(`DROP TABLE IF EXISTS leave_types;`);
    await queryRunner.query(`DROP TYPE IF EXISTS accrual_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS leave_approval_decision_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS leave_request_status_enum;`);
  }
}
