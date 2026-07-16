import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE index_type_enum AS ENUM ('PERSONNEL','DOCUMENT','ASSET','ANNOUNCEMENT','CUSTOM');`);
    await queryRunner.query(`CREATE TYPE index_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE document_status_enum AS ENUM ('PENDING','INDEXED','FAILED','DELETED');`);
    await queryRunner.query(`CREATE TYPE query_status_enum AS ENUM ('PENDING','COMPLETED','FAILED');`);

    await queryRunner.query(`
      CREATE TABLE search_indexes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        index_type index_type_enum NOT NULL,
        description TEXT,
        status index_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE search_documents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        index_id UUID NOT NULL REFERENCES search_indexes(id),
        external_id VARCHAR(100) NOT NULL,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        metadata JSONB,
        status document_status_enum NOT NULL DEFAULT 'PENDING',
        indexed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(index_id, external_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE search_synonyms (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        term VARCHAR(100) NOT NULL UNIQUE,
        synonyms JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE search_queries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        query_number VARCHAR(50) NOT NULL UNIQUE,
        requested_by UUID NOT NULL,
        index_id UUID REFERENCES search_indexes(id),
        query VARCHAR(500) NOT NULL,
        status query_status_enum NOT NULL DEFAULT 'PENDING',
        hit_count INT NOT NULL DEFAULT 0,
        results JSONB,
        error_message TEXT,
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_search_documents_status ON search_documents(status);`);
    await queryRunner.query(`CREATE INDEX idx_search_queries_status ON search_queries(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS search_queries;`);
    await queryRunner.query(`DROP TABLE IF EXISTS search_synonyms;`);
    await queryRunner.query(`DROP TABLE IF EXISTS search_documents;`);
    await queryRunner.query(`DROP TABLE IF EXISTS search_indexes;`);
    await queryRunner.query(`DROP TYPE IF EXISTS query_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS document_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS index_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS index_type_enum;`);
  }
}
