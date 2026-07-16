import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { MaintenanceCategory, MaintenanceRequest, WorkOrder, WorkOrderTask, MaintenanceLog } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_maintenance',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_maintenance',
  entities: [MaintenanceCategory, MaintenanceRequest, WorkOrder, WorkOrderTask, MaintenanceLog],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
