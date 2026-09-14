import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const dbUrl = process.env.DATABASE_URL;
  let parsedHost = process.env.DB_HOST || 'localhost';
  let parsedPort = parseInt(process.env.DB_PORT || '5432', 10);
  let parsedUser = process.env.DB_USERNAME || 'nddtp_auth';
  let parsedPass = process.env.DB_PASSWORD || '';
  let parsedDb = process.env.DB_DATABASE || process.env.DB_NAME || 'nddtp_auth';

  if (dbUrl) {
    try {
      // Handle postgres:// or postgresql:// connection strings
      const match = dbUrl.match(/postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:/]+)(?::(\d+))?\/(.+)/);
      if (match) {
        parsedUser = decodeURIComponent(match[1]);
        parsedPass = decodeURIComponent(match[2]);
        parsedHost = match[3];
        parsedPort = match[4] ? parseInt(match[4], 10) : 5432;
        parsedDb = match[5].split('?')[0];
      }
    } catch {
      // Fallback
    }
  }

  return {
    url: dbUrl || undefined,
    host: parsedHost,
    port: parsedPort,
    username: parsedUser,
    password: parsedPass,
    name: parsedDb,
    ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true',
    logging: process.env.DB_LOGGING === 'true',
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  };
});
