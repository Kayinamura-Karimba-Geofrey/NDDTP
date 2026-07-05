import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { NotificationTemplate, Notification, NotificationDelivery, UserNotificationPreference } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_notification',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_notification',
  entities: [NotificationTemplate, Notification, NotificationDelivery, UserNotificationPreference],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
