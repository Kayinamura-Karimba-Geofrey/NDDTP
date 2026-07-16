import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { MedicalFacility, MedicalAppointment, MedicalRecord, FitnessAssessment, MedicalCertificate } from './entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nddtp_medical',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nddtp_medical',
  entities: [MedicalFacility, MedicalAppointment, MedicalRecord, FitnessAssessment, MedicalCertificate],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
