import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE notification_channel_enum AS ENUM ('EMAIL','SMS','PUSH','IN_APP');`);
    await queryRunner.query(`CREATE TYPE notification_status_enum AS ENUM ('PENDING','QUEUED','SENT','DELIVERED','FAILED','CANCELLED');`);
    await queryRunner.query(`CREATE TYPE delivery_status_enum AS ENUM ('PENDING','SENT','DELIVERED','FAILED','BOUNCED');`);
    await queryRunner.query(`CREATE TYPE template_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE notification_priority_enum AS ENUM ('LOW','NORMAL','HIGH','URGENT');`);

    await queryRunner.query(`
      CREATE TABLE notification_templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        channel notification_channel_enum NOT NULL,
        subject VARCHAR(500),
        body TEXT NOT NULL,
        variables JSONB,
        status template_status_enum NOT NULL DEFAULT 'ACTIVE',
        is_system BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        template_code VARCHAR(100),
        channel notification_channel_enum NOT NULL,
        status notification_status_enum NOT NULL DEFAULT 'PENDING',
        priority notification_priority_enum NOT NULL DEFAULT 'NORMAL',
        subject VARCHAR(500),
        body TEXT NOT NULL,
        recipient_email VARCHAR(255),
        recipient_phone VARCHAR(30),
        variables JSONB,
        metadata JSONB,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        read_at TIMESTAMPTZ,
        sent_at TIMESTAMPTZ,
        correlation_id VARCHAR(100),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE notification_deliveries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
        status delivery_status_enum NOT NULL DEFAULT 'PENDING',
        attempt_number INT NOT NULL DEFAULT 1,
        provider_response TEXT,
        error_message TEXT,
        delivered_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_notification_preferences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        notification_type VARCHAR(100) NOT NULL,
        channel notification_channel_enum NOT NULL,
        is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, notification_type, channel)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_notifications_user_id ON notifications(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_notifications_status ON notifications(status);`);
    await queryRunner.query(`CREATE INDEX idx_notification_deliveries_notification_id ON notification_deliveries(notification_id);`);
    await queryRunner.query(`CREATE INDEX idx_user_notification_preferences_user_id ON user_notification_preferences(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_notification_preferences;`);
    await queryRunner.query(`DROP TABLE IF EXISTS notification_deliveries;`);
    await queryRunner.query(`DROP TABLE IF EXISTS notifications;`);
    await queryRunner.query(`DROP TABLE IF EXISTS notification_templates;`);
    await queryRunner.query(`DROP TYPE IF EXISTS notification_priority_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS template_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS delivery_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS notification_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS notification_channel_enum;`);
  }
}
