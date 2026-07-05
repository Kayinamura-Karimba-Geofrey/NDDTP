import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE channel_type_enum AS ENUM ('DIRECT','GROUP','DEPARTMENT','BROADCAST');`);
    await queryRunner.query(`CREATE TYPE channel_status_enum AS ENUM ('ACTIVE','ARCHIVED');`);
    await queryRunner.query(`CREATE TYPE member_role_enum AS ENUM ('OWNER','ADMIN','MEMBER');`);
    await queryRunner.query(`CREATE TYPE message_type_enum AS ENUM ('TEXT','FILE','SYSTEM');`);
    await queryRunner.query(`CREATE TYPE message_status_enum AS ENUM ('SENT','DELIVERED','READ','FAILED','DELETED');`);
    await queryRunner.query(`CREATE TYPE receipt_status_enum AS ENUM ('DELIVERED','READ');`);

    await queryRunner.query(`
      CREATE TABLE message_channels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        channel_type channel_type_enum NOT NULL,
        created_by UUID NOT NULL,
        status channel_status_enum NOT NULL DEFAULT 'ACTIVE',
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE channel_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        channel_id UUID NOT NULL REFERENCES message_channels(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        role member_role_enum NOT NULL DEFAULT 'MEMBER',
        joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(channel_id, user_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        channel_id UUID NOT NULL REFERENCES message_channels(id),
        sender_id UUID NOT NULL,
        content TEXT NOT NULL,
        message_type message_type_enum NOT NULL DEFAULT 'TEXT',
        status message_status_enum NOT NULL DEFAULT 'SENT',
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE message_receipts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
        recipient_id UUID NOT NULL,
        status receipt_status_enum NOT NULL,
        acknowledged_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(message_id, recipient_id)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_channel_members_user ON channel_members(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_messages_channel_created ON messages(channel_id, created_at);`);
    await queryRunner.query(`CREATE INDEX idx_message_channels_status ON message_channels(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS message_receipts;`);
    await queryRunner.query(`DROP TABLE IF EXISTS messages;`);
    await queryRunner.query(`DROP TABLE IF EXISTS channel_members;`);
    await queryRunner.query(`DROP TABLE IF EXISTS message_channels;`);
    await queryRunner.query(`DROP TYPE IF EXISTS receipt_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS message_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS message_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS member_role_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS channel_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS channel_type_enum;`);
  }
}
