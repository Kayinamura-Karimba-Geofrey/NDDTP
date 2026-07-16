import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE role_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'DEPRECATED');`);
    await queryRunner.query(`CREATE TYPE permission_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'DEPRECATED');`);
    await queryRunner.query(`CREATE TYPE assignment_status_enum AS ENUM ('ACTIVE', 'REVOKED', 'EXPIRED');`);
    await queryRunner.query(`CREATE TYPE scope_type_enum AS ENUM ('GLOBAL', 'ORGANIZATION', 'DEPARTMENT', 'UNIT');`);
    await queryRunner.query(`CREATE TYPE authorization_decision_enum AS ENUM ('ALLOW', 'DENY');`);

    await queryRunner.query(`
      CREATE TABLE roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        parent_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
        is_system BOOLEAN NOT NULL DEFAULT FALSE,
        status role_status_enum NOT NULL DEFAULT 'ACTIVE',
        priority INT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(150) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        module VARCHAR(100) NOT NULL,
        action VARCHAR(50) NOT NULL,
        resource VARCHAR(100) NOT NULL,
        is_system BOOLEAN NOT NULL DEFAULT FALSE,
        status permission_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE role_permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
        permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
        granted_by UUID,
        granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(role_id, permission_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_role_assignments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
        scope_type scope_type_enum NOT NULL DEFAULT 'GLOBAL',
        scope_id UUID,
        status assignment_status_enum NOT NULL DEFAULT 'ACTIVE',
        assigned_by UUID,
        revoked_by UUID,
        expires_at TIMESTAMPTZ,
        revoked_at TIMESTAMPTZ,
        revoke_reason VARCHAR(255),
        assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE authorization_decision_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        permission_code VARCHAR(150) NOT NULL,
        decision authorization_decision_enum NOT NULL,
        matched_roles JSONB,
        scope_type VARCHAR(50),
        scope_id UUID,
        resource_type VARCHAR(100),
        resource_id VARCHAR(255),
        ip_address VARCHAR(45),
        deny_reason VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_roles_code ON roles(code);`);
    await queryRunner.query(`CREATE INDEX idx_roles_status ON roles(status);`);
    await queryRunner.query(`CREATE INDEX idx_permissions_code ON permissions(code);`);
    await queryRunner.query(`CREATE INDEX idx_permissions_module ON permissions(module);`);
    await queryRunner.query(`CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);`);
    await queryRunner.query(`CREATE INDEX idx_user_role_assignments_user_id ON user_role_assignments(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_authz_decision_user_id ON authorization_decision_logs(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS authorization_decision_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_role_assignments;`);
    await queryRunner.query(`DROP TABLE IF EXISTS role_permissions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS permissions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS roles;`);
    await queryRunner.query(`DROP TYPE IF EXISTS authorization_decision_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS scope_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS assignment_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS permission_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS role_status_enum;`);
  }
}
