import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import {
  AuthCredential,
  UserSession,
  RefreshToken,
  MfaSetting,
  MfaBackupCode,
  LoginAttempt,
  PasswordResetToken,
} from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_auth',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_auth',
  entities: [
    AuthCredential,
    UserSession,
    RefreshToken,
    MfaSetting,
    MfaBackupCode,
    LoginAttempt,
    PasswordResetToken,
  ],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
