import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000001 implements MigrationInterface {
  name = 'InitialSchema1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE api_protocol_enum AS ENUM ('REST','GRAPHQL','GRPC');`);
    await queryRunner.query(`CREATE TYPE product_status_enum AS ENUM ('ACTIVE','INACTIVE','DEPRECATED');`);
    await queryRunner.query(`CREATE TYPE route_status_enum AS ENUM ('ACTIVE','INACTIVE');`);
    await queryRunner.query(`CREATE TYPE http_method_enum AS ENUM ('GET','POST','PUT','PATCH','DELETE','ANY');`);
    await queryRunner.query(`CREATE TYPE consumer_status_enum AS ENUM ('ACTIVE','SUSPENDED');`);
    await queryRunner.query(`CREATE TYPE api_key_status_enum AS ENUM ('ACTIVE','REVOKED');`);

    await queryRunner.query(`
      CREATE TABLE api_products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        version VARCHAR(20) NOT NULL DEFAULT 'v1',
        base_path VARCHAR(200) NOT NULL,
        protocol api_protocol_enum NOT NULL DEFAULT 'REST',
        description TEXT,
        status product_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE api_routes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID NOT NULL REFERENCES api_products(id),
        code VARCHAR(50) NOT NULL,
        name VARCHAR(200) NOT NULL,
        path VARCHAR(500) NOT NULL,
        http_method http_method_enum NOT NULL DEFAULT 'GET',
        upstream_url VARCHAR(500) NOT NULL,
        description TEXT,
        status route_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(product_id, code)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE api_consumers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(200) NOT NULL,
        contact_email VARCHAR(200),
        description TEXT,
        status consumer_status_enum NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE api_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        consumer_id UUID NOT NULL REFERENCES api_consumers(id),
        key_prefix VARCHAR(20) NOT NULL UNIQUE,
        key_hash VARCHAR(128) NOT NULL,
        status api_key_status_enum NOT NULL DEFAULT 'ACTIVE',
        issued_by UUID NOT NULL,
        expires_at TIMESTAMPTZ,
        revoked_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`CREATE INDEX idx_api_routes_product ON api_routes(product_id);`);
    await queryRunner.query(`CREATE INDEX idx_api_keys_consumer ON api_keys(consumer_id);`);
    await queryRunner.query(`CREATE INDEX idx_api_keys_status ON api_keys(status);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS api_keys;`);
    await queryRunner.query(`DROP TABLE IF EXISTS api_consumers;`);
    await queryRunner.query(`DROP TABLE IF EXISTS api_routes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS api_products;`);
    await queryRunner.query(`DROP TYPE IF EXISTS api_key_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS consumer_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS http_method_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS route_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS product_status_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS api_protocol_enum;`);
  }
}
