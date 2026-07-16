import { Client } from 'pg';

const dbs = [
  { port: 5433, db: 'nddtp_auth', user: 'nddtp_auth' },
  { port: 5439, db: 'nddtp_authorization', user: 'nddtp_authorization' },
  { port: 5435, db: 'nddtp_user', user: 'nddtp_user' },
  { port: 5436, db: 'nddtp_notification', user: 'nddtp_notification' },
  { port: 5438, db: 'nddtp_personnel', user: 'nddtp_personnel' },
  { port: 5440, db: 'nddtp_recruitment', user: 'nddtp_recruitment' },
];

async function run() {
  for (const config of dbs) {
    const client = new Client({
      host: '127.0.0.1',
      port: config.port,
      database: config.db,
      user: config.user,
      password: 'change_me_secure_password',
    });
    try {
      await client.connect();
      await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
      console.log(`Cleared DB ${config.db}`);
    } catch (e) {
      console.error(`Error on ${config.db}:`, e.message);
    } finally {
      await client.end();
    }
  }
}

run();
