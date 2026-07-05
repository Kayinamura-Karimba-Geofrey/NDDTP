import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE announcement_priority_enum AS ENUM ('LOW','NORMAL','HIGH','URGENT');`);
    await queryRunner.query(`CREATE TYPE announcement_status_enum AS ENUM ('DRAFT','PUBLISHED','EXPIRED','WITHDRAWN');`);
    await queryRunner.query(`CREATE TYPE audience_type_enum AS ENUM ('ALL','DEPARTMENT','ROLE','UNIT');`);
    await queryRunner.query(`CREATE TYPE category_status_enum AS ENUM ('ACTIVE','INACTIVE');`);

    await queryRunner.query(`
      CREATE TABLE announcement_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        status category_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE announcements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reference_number VARCHAR(50) NOT NULL UNIQUE,
        category_id UUID NOT NULL REFERENCES announcement_categories(id),
        title VARCHAR(300) NOT NULL,
        content TEXT NOT NULL,
        priority announcement_priority_enum NOT NULL DEFAULT 'NORMAL',
        status announcement_status_enum NOT NULL DEFAULT 'DRAFT',
        audience_type audience_type_enum NOT NULL DEFAULT 'ALL',
        audience_ref VARCHAR(100),
        created_by UUID NOT NULL,
        published_by UUID,
        published_at TIMESTAMPTZ,
        expires_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE announcement_audiences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
        audience_type VARCHAR(50) NOT NULL,
        audience_ref VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE announcement_acknowledgements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        acknowledged_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(announcement_id, user_id)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_announcements_status ON announcements(status);`);
    await queryRunner.query(`CREATE INDEX idx_announcement_audiences_announcement ON announcement_audiences(announcement_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS announcement_acknowledgements;`);
    await queryRunner.query(`DROP TABLE IF EXISTS announcement_audiences;`);
    await queryRunner.query(`DROP TABLE IF EXISTS announcements;`);
    await queryRunner.query(`DROP TABLE IF EXISTS announcement_categories;`);
    await queryRunner.query(`DROP TYPE IF EXISTS category_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS audience_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS announcement_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS announcement_priority_enum;`);
  }
}
