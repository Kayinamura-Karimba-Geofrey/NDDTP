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
      const parsed = new URL(dbUrl);
      parsedHost = parsed.hostname;
      parsedPort = parseInt(parsed.port || '5432', 10);
      parsedUser = parsed.username;
      parsedPass = parsed.password;
      parsedDb = parsed.pathname.replace('/', '') || parsedDb;
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
