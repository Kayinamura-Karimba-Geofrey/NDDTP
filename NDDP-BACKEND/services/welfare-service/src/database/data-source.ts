import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { WelfareProgram, Dependent, WelfareClaim, ClaimStatusHistory, Disbursement } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_welfare',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_welfare',
  entities: [WelfareProgram, Dependent, WelfareClaim, ClaimStatusHistory, Disbursement],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
