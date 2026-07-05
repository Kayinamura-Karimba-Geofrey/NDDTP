import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE namespace_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE entry_value_type_enum AS ENUM ('STRING','NUMBER','BOOLEAN','JSON');`);
    await queryRunner.query(`CREATE TYPE entry_status_enum AS ENUM ('DRAFT','ACTIVE','DEPRECATED');`);
    await queryRunner.query(`CREATE TYPE environment_scope_enum AS ENUM ('ALL','DEVELOPMENT','STAGING','PRODUCTION');`);

    await queryRunner.query(`
      CREATE TABLE config_namespaces (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        status namespace_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE config_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        namespace_id UUID NOT NULL REFERENCES config_namespaces(id),
        key VARCHAR(200) NOT NULL,
        value TEXT NOT NULL,
        value_type entry_value_type_enum NOT NULL DEFAULT 'STRING',
        status entry_status_enum NOT NULL DEFAULT 'DRAFT',
        environment environment_scope_enum NOT NULL DEFAULT 'ALL',
        description TEXT,
        created_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(namespace_id, key)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE config_revisions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        entry_id UUID NOT NULL REFERENCES config_entries(id) ON DELETE CASCADE,
        previous_value TEXT,
        new_value TEXT NOT NULL,
        changed_by UUID NOT NULL,
        version INT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE config_overrides (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        scope_type VARCHAR(50) NOT NULL,
        scope_ref VARCHAR(100) NOT NULL,
        entry_key VARCHAR(200) NOT NULL,
        value TEXT NOT NULL,
        created_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(scope_type, scope_ref, entry_key)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_config_revisions_entry ON config_revisions(entry_id);`);
    await queryRunner.query(`CREATE INDEX idx_config_entries_status ON config_entries(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS config_overrides;`);
    await queryRunner.query(`DROP TABLE IF EXISTS config_revisions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS config_entries;`);
    await queryRunner.query(`DROP TABLE IF EXISTS config_namespaces;`);
    await queryRunner.query(`DROP TYPE IF EXISTS environment_scope_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS entry_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS entry_value_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS namespace_status_enum;`);
  }
}
