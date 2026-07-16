import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE budget_category_type_enum AS ENUM ('PERSONNEL','OPERATIONS','CAPITAL','MAINTENANCE','TRAINING','OTHER');`);
    await queryRunner.query(`CREATE TYPE account_status_enum AS ENUM ('ACTIVE','INACTIVE','SUSPENDED');`);
    await queryRunner.query(`CREATE TYPE budget_status_enum AS ENUM ('DRAFT','ACTIVE','CLOSED');`);
    await queryRunner.query(`CREATE TYPE expenditure_status_enum AS ENUM ('DRAFT','SUBMITTED','APPROVED','REJECTED','PAID','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE expenditure_reference_type_enum AS ENUM ('MANUAL','PROCUREMENT','PAYROLL','MAINTENANCE');`);
    await queryRunner.query(`CREATE TYPE transaction_type_enum AS ENUM ('DEBIT','CREDIT');`);

    await queryRunner.query(`
      CREATE TABLE budget_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category_type budget_category_type_enum NOT NULL,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE cost_accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        category_id UUID NOT NULL REFERENCES budget_categories(id),
        department_id UUID,
        status account_status_enum NOT NULL DEFAULT 'ACTIVE',
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE budget_allocations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        account_id UUID NOT NULL REFERENCES cost_accounts(id),
        fiscal_year INT NOT NULL,
        allocated_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
        committed_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
        spent_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
        status budget_status_enum NOT NULL DEFAULT 'DRAFT',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(account_id, fiscal_year)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE expenditure_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_number VARCHAR(50) NOT NULL UNIQUE,
        account_id UUID NOT NULL REFERENCES cost_accounts(id),
        budget_id UUID NOT NULL REFERENCES budget_allocations(id),
        requested_by UUID NOT NULL,
        amount DECIMAL(14,2) NOT NULL,
        purpose VARCHAR(300) NOT NULL,
        status expenditure_status_enum NOT NULL DEFAULT 'DRAFT',
        reference_type expenditure_reference_type_enum NOT NULL DEFAULT 'MANUAL',
        reference_id UUID,
        reviewer_id UUID,
        rejection_reason TEXT,
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE finance_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        transaction_number VARCHAR(50) NOT NULL UNIQUE,
        expenditure_id UUID NOT NULL REFERENCES expenditure_requests(id),
        account_id UUID NOT NULL REFERENCES cost_accounts(id),
        budget_id UUID NOT NULL REFERENCES budget_allocations(id),
        amount DECIMAL(14,2) NOT NULL,
        transaction_type transaction_type_enum NOT NULL DEFAULT 'DEBIT',
        recorded_by UUID NOT NULL,
        notes TEXT,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_expenditure_requests_status ON expenditure_requests(status);`);
    await queryRunner.query(`CREATE INDEX idx_expenditure_requests_account ON expenditure_requests(account_id);`);
    await queryRunner.query(`CREATE INDEX idx_budget_allocations_status ON budget_allocations(status);`);
    await queryRunner.query(`CREATE INDEX idx_finance_transactions_expenditure ON finance_transactions(expenditure_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS finance_transactions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS expenditure_requests;`);
    await queryRunner.query(`DROP TABLE IF EXISTS budget_allocations;`);
    await queryRunner.query(`DROP TABLE IF EXISTS cost_accounts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS budget_categories;`);
    await queryRunner.query(`DROP TYPE IF EXISTS transaction_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS expenditure_reference_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS expenditure_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS budget_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS account_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS budget_category_type_enum;`);
  }
}
