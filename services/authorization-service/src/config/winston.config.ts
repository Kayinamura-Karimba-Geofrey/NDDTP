import { transports, format } from 'winston';

export const winstonConfig = {
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'logs/security.log',
      level: 'warn',
      format: format.combine(format.timestamp(), format.label({ label: 'SECURITY' }), format.json()),
    }),
  ],
};
