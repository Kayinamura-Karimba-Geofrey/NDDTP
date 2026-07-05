import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE workflow_entity_type_enum AS ENUM ('LEAVE','EXPENDITURE','PROCUREMENT','VISIT','PERSONNEL','OTHER');`);
    await queryRunner.query(`CREATE TYPE definition_status_enum AS ENUM ('ACTIVE','INACTIVE','DEPRECATED');`);
    await queryRunner.query(`CREATE TYPE instance_status_enum AS ENUM ('DRAFT','RUNNING','COMPLETED','REJECTED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE task_status_enum AS ENUM ('PENDING','APPROVED','REJECTED','SKIPPED');`);

    await queryRunner.query(`
      CREATE TABLE workflow_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        entity_type workflow_entity_type_enum NOT NULL,
        description TEXT,
        status definition_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE workflow_steps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        definition_id UUID NOT NULL REFERENCES workflow_definitions(id) ON DELETE CASCADE,
        step_order INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        approver_role VARCHAR(50) NOT NULL,
        is_required BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(definition_id, step_order)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE workflow_instances (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        instance_number VARCHAR(50) NOT NULL UNIQUE,
        definition_id UUID NOT NULL REFERENCES workflow_definitions(id),
        entity_type workflow_entity_type_enum NOT NULL,
        entity_id UUID NOT NULL,
        initiated_by UUID NOT NULL,
        status instance_status_enum NOT NULL DEFAULT 'DRAFT',
        current_step INT NOT NULL DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE workflow_tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        instance_id UUID NOT NULL REFERENCES workflow_instances(id) ON DELETE CASCADE,
        step_id UUID NOT NULL REFERENCES workflow_steps(id),
        step_order INT NOT NULL,
        approver_role VARCHAR(50) NOT NULL,
        assignee_id UUID,
        status task_status_enum NOT NULL DEFAULT 'PENDING',
        comments TEXT,
        decided_by UUID,
        decided_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(instance_id, step_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE workflow_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        instance_id UUID NOT NULL REFERENCES workflow_instances(id) ON DELETE CASCADE,
        event_type VARCHAR(50) NOT NULL,
        notes TEXT,
        recorded_by UUID NOT NULL,
        recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_workflow_instances_status ON workflow_instances(status);`);
    await queryRunner.query(`CREATE INDEX idx_workflow_instances_entity ON workflow_instances(entity_type, entity_id);`);
    await queryRunner.query(`CREATE INDEX idx_workflow_tasks_status ON workflow_tasks(status);`);
    await queryRunner.query(`CREATE INDEX idx_workflow_tasks_assignee ON workflow_tasks(assignee_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS workflow_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workflow_tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workflow_instances;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workflow_steps;`);
    await queryRunner.query(`DROP TABLE IF EXISTS workflow_definitions;`);
    await queryRunner.query(`DROP TYPE IF EXISTS task_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS instance_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS definition_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS workflow_entity_type_enum;`);
  }
}
