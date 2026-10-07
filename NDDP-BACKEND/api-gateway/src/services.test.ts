import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { resolveService, upstreamBaseUrl } from './services.js';

beforeEach(() => {
  delete process.env.SERVICE_HOST;
  delete process.env.SERVICE_URL_AUTH;
  delete process.env.SERVICE_URL_BUSINESS_INTELLIGENCE;
});

test('defaults to SERVICE_HOST and the registry port', () => {
  assert.equal(upstreamBaseUrl('auth'), 'http://127.0.0.1:3001');
  process.env.SERVICE_HOST = 'auth.internal';
  assert.equal(upstreamBaseUrl('auth'), 'http://auth.internal:3001');
});

test('SERVICE_URL_<KEY> overrides the upstream and strips trailing slashes', () => {
  process.env.SERVICE_URL_AUTH = 'https://nddtp-auth-service.onrender.com/';
  assert.equal(upstreamBaseUrl('auth'), 'https://nddtp-auth-service.onrender.com');
});

test('override without a scheme defaults to http', () => {
  process.env.SERVICE_URL_AUTH = 'auth-service:3001';
  assert.equal(upstreamBaseUrl('auth'), 'http://auth-service:3001');
});

test('hyphenated service keys map to underscored env vars', () => {
  process.env.SERVICE_URL_BUSINESS_INTELLIGENCE = 'https://bi.example.com';
  assert.equal(upstreamBaseUrl('business-intelligence'), 'https://bi.example.com');
});

test('resolveService rejects unknown keys', () => {
  assert.equal(resolveService('does-not-exist'), null);
  assert.equal(resolveService('auth')?.port, 3001);
});
