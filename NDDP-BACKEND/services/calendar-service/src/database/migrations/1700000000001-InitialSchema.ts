import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE calendar_type_enum AS ENUM ('ORGANIZATIONAL','DEPARTMENT','PERSONAL');`);
    await queryRunner.query(`CREATE TYPE calendar_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE calendar_event_type_enum AS ENUM ('MEETING','TRAINING','CEREMONY','LEAVE_BLOCK','OTHER');`);
    await queryRunner.query(`CREATE TYPE event_status_enum AS ENUM ('DRAFT','SCHEDULED','CANCELLED','COMPLETED');`);
    await queryRunner.query(`CREATE TYPE rsvp_status_enum AS ENUM ('PENDING','ACCEPTED','DECLINED','TENTATIVE');`);

    await queryRunner.query(`
      CREATE TABLE calendars (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        calendar_type calendar_type_enum NOT NULL,
        owner_id UUID,
        department_id UUID,
        status calendar_status_enum NOT NULL DEFAULT 'ACTIVE',
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE calendar_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_number VARCHAR(50) NOT NULL UNIQUE,
        calendar_id UUID NOT NULL REFERENCES calendars(id),
        title VARCHAR(200) NOT NULL,
        description TEXT,
        event_type calendar_event_type_enum NOT NULL DEFAULT 'MEETING',
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ NOT NULL,
        location VARCHAR(300),
        status event_status_enum NOT NULL DEFAULT 'DRAFT',
        created_by UUID NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE event_attendees (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id UUID NOT NULL REFERENCES calendar_events(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        rsvp_status rsvp_status_enum NOT NULL DEFAULT 'PENDING',
        invited_by UUID NOT NULL,
        responded_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(event_id, user_id)
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_calendar_events_calendar ON calendar_events(calendar_id);`);
    await queryRunner.query(`CREATE INDEX idx_calendar_events_status ON calendar_events(status);`);
    await queryRunner.query(`CREATE INDEX idx_calendar_events_time ON calendar_events(start_time, end_time);`);
    await queryRunner.query(`CREATE INDEX idx_event_attendees_user ON event_attendees(user_id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS event_attendees;`);
    await queryRunner.query(`DROP TABLE IF EXISTS calendar_events;`);
    await queryRunner.query(`DROP TABLE IF EXISTS calendars;`);
    await queryRunner.query(`DROP TYPE IF EXISTS rsvp_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS event_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS calendar_event_type_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS calendar_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS calendar_type_enum;`);
  }
}
