import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { BackupPolicy, BackupJob, BackupRestore } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_backup',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_backup',
  entities: [BackupPolicy, BackupJob, BackupRestore],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
