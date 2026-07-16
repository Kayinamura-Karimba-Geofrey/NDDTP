import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE cycle_type_enum AS ENUM ('ANNUAL','QUARTERLY','PROBATION','PROJECT');`);
    await queryRunner.query(`CREATE TYPE cycle_status_enum AS ENUM ('PLANNED','ACTIVE','CLOSED');`);
    await queryRunner.query(`CREATE TYPE goal_status_enum AS ENUM ('DRAFT','ACTIVE','COMPLETED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE review_status_enum AS ENUM ('DRAFT','SELF_SUBMITTED','MANAGER_REVIEW','CALIBRATION','APPROVED','FINALIZED','REJECTED');`);
    await queryRunner.query(`CREATE TYPE rating_level_enum AS ENUM ('EXCEEDS','MEETS','PARTIALLY_MEETS','BELOW','UNSATISFACTORY');`);
    await queryRunner.query(`CREATE TYPE plan_status_enum AS ENUM ('DRAFT','ACTIVE','COMPLETED','CANCELLED');`);

    await queryRunner.query(`
      CREATE TABLE performance_cycles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        type cycle_type_enum NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status cycle_status_enum NOT NULL DEFAULT 'PLANNED',
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE rating_criteria (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        weight INT NOT NULL DEFAULT 0,
        description TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE performance_goals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        cycle_id UUID NOT NULL REFERENCES performance_cycles(id),
        title VARCHAR(300) NOT NULL,
        description TEXT,
        target_date DATE,
        status goal_status_enum NOT NULL DEFAULT 'DRAFT',
        progress_percent INT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE performance_reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        review_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        cycle_id UUID NOT NULL REFERENCES performance_cycles(id),
        reviewer_id UUID,
        status review_status_enum NOT NULL DEFAULT 'DRAFT',
        self_assessment TEXT,
        manager_comments TEXT,
        overall_rating rating_level_enum,
        submitted_at TIMESTAMPTZ,
        finalized_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE review_ratings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        review_id UUID NOT NULL REFERENCES performance_reviews(id) ON DELETE CASCADE,
        criteria_id UUID NOT NULL REFERENCES rating_criteria(id),
        rating rating_level_enum NOT NULL,
        comments TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE improvement_plans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        plan_number VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        review_id UUID,
        manager_id UUID NOT NULL,
        status plan_status_enum NOT NULL DEFAULT 'DRAFT',
        objectives TEXT NOT NULL,
        milestones TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        activated_at TIMESTAMPTZ,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_performance_goals_user ON performance_goals(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_performance_reviews_user ON performance_reviews(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_performance_reviews_status ON performance_reviews(status);`);
    await queryRunner.query(`CREATE INDEX idx_improvement_plans_user ON improvement_plans(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS improvement_plans;`);
    await queryRunner.query(`DROP TABLE IF EXISTS review_ratings;`);
    await queryRunner.query(`DROP TABLE IF EXISTS performance_reviews;`);
    await queryRunner.query(`DROP TABLE IF EXISTS performance_goals;`);
    await queryRunner.query(`DROP TABLE IF EXISTS rating_criteria;`);
    await queryRunner.query(`DROP TABLE IF EXISTS performance_cycles;`);
    await queryRunner.query(`DROP TYPE IF EXISTS plan_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS rating_level_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS review_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS goal_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS cycle_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS cycle_type_enum;`);
  }
}
