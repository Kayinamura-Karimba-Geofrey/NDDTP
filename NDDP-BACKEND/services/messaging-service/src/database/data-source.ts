import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { MessageChannel, ChannelMember, Message, MessageReceipt } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_messaging',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_messaging',
  entities: [MessageChannel, ChannelMember, Message, MessageReceipt],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
