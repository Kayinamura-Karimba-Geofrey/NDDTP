import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE agent_type_enum AS ENUM ('GENERAL','HR','OPERATIONS','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE agent_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE conversation_status_enum AS ENUM ('ACTIVE','CLOSED','ARCHIVED');`);
    await queryRunner.query(`CREATE TYPE message_role_enum AS ENUM ('USER','ASSISTANT','SYSTEM');`);
    await queryRunner.query(`CREATE TYPE message_status_enum AS ENUM ('PENDING','COMPLETED','FAILED');`);

    await queryRunner.query(`
      CREATE TABLE ai_agents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        agent_type agent_type_enum NOT NULL,
        model_name VARCHAR(100) NOT NULL DEFAULT 'gpt-4',
        system_prompt TEXT NOT NULL,
        description TEXT,
        status agent_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE ai_conversations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_number VARCHAR(50) NOT NULL UNIQUE,
        agent_id UUID NOT NULL REFERENCES ai_agents(id),
        user_id UUID NOT NULL,
        title VARCHAR(200),
        status conversation_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE ai_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
        role message_role_enum NOT NULL,
        content TEXT NOT NULL,
        status message_status_enum NOT NULL DEFAULT 'COMPLETED',
        token_count INT,
        error_message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_ai_conversations_user ON ai_conversations(user_id);`);
    await queryRunner.query(`CREATE INDEX idx_ai_conversations_agent ON ai_conversations(agent_id);`);
    await queryRunner.query(`CREATE INDEX idx_ai_messages_status ON ai_messages(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ai_messages;`);
    await queryRunner.query(`DROP TABLE IF EXISTS ai_conversations;`);
    await queryRunner.query(`DROP TABLE IF EXISTS ai_agents;`);
    await queryRunner.query(`DROP TYPE IF EXISTS message_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS message_role_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS conversation_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS agent_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS agent_type_enum;`);
  }
}
