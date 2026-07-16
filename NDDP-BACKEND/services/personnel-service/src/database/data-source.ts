import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import {
  PersonnelRecord, Rank, RankHistory, Unit, Assignment,
  Qualification, PersonnelQualification, ServiceHistory,
} from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_personnel',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_personnel',
  entities: [PersonnelRecord, Rank, RankHistory, Unit, Assignment, Qualification, PersonnelQualification, ServiceHistory],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
