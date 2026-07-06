/**
 * Quick integration smoke test — prints HTTP status codes only.
 * Usage: node scripts/verify-integration-apis.mjs
 */
const GATEWAY = process.env.API_GATEWAY_URL || 'http://127.0.0.1:3000';
const EMAIL = process.env.NDDTP_TEST_EMAIL || 'admin@mod.gov.rw';
const PASSWORD = process.env.NDDTP_TEST_PASSWORD || 'Nddtp@Mod2026!';

async function status(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return res.status;
  } catch {
    return 0;
  }
}

const loginRes = await fetch(`${GATEWAY}/api/svc/auth/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: EMAIL, password: PASSWORD, deviceId: 'verify', deviceName: 'verify' }),
});
const loginBody = await loginRes.json();
const token = loginBody?.data?.accessToken;
const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

const checks = [
  ['gateway health', `${GATEWAY}/health`],
  ['users/me', `${GATEWAY}/api/svc/user/users/me`, { headers: authHeaders }],
  ['users list', `${GATEWAY}/api/svc/user/users?page=1&limit=5`, { headers: authHeaders }],
  ['personnel list', `${GATEWAY}/api/svc/personnel/personnel?page=1&limit=5`, { headers: authHeaders }],
  ['notifications inbox', `${GATEWAY}/api/svc/notification/notifications/inbox?page=1&limit=5`, { headers: authHeaders }],
];

console.log('NDDTP integration API status check\n');
console.log(`login: ${loginRes.status}${token ? ' (token ok)' : ' (no token)'}`);

for (const [label, url, opts] of checks.slice(1)) {
  const code = await status(url, opts);
  const ok = code >= 200 && code < 300 ? 'OK' : 'FAIL';
  console.log(`${label}: ${code} ${ok}`);
}
