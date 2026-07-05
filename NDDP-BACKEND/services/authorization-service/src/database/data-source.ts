import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Role, Permission, RolePermission, UserRoleAssignment, AuthorizationDecisionLog } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_authorization',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_authorization',
  entities: [Role, Permission, RolePermission, UserRoleAssignment, AuthorizationDecisionLog],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

export default new DataSource(dataSourceOptions);
