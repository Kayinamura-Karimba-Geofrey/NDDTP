import jwtConfig from '../../src/config/jwt.config';
import { envValidationSchema } from '../../src/config/env.schema';

describe('jwt config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.JWT_ACCESS_SECRET;
    delete process.env.JWT_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('refuses to fall back to the public default access secret in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_REFRESH_SECRET = 'r'.repeat(40);
    expect(() => jwtConfig()).toThrow('JWT_ACCESS_SECRET must be set in production');
  });

  it('refuses to fall back to the public default refresh secret in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_ACCESS_SECRET = 'a'.repeat(40);
    expect(() => jwtConfig()).toThrow('JWT_REFRESH_SECRET must be set in production');
  });

  it('accepts JWT_SECRET as an alias for the access secret', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 's'.repeat(40);
    process.env.JWT_REFRESH_SECRET = 'r'.repeat(40);
    expect(jwtConfig().accessSecret).toBe(process.env.JWT_SECRET);
  });

  it('prefers JWT_ACCESS_SECRET over the JWT_SECRET alias', () => {
    process.env.JWT_ACCESS_SECRET = 'a'.repeat(40);
    process.env.JWT_SECRET = 's'.repeat(40);
    expect(jwtConfig().accessSecret).toBe(process.env.JWT_ACCESS_SECRET);
  });

  it('uses dev fallbacks outside production', () => {
    process.env.NODE_ENV = 'development';
    expect(jwtConfig().accessSecret).toBe('change_me_access_secret');
  });
});

describe('env validation schema', () => {
  const validate = (env: Record<string, string>) =>
    envValidationSchema.validate(env, { allowUnknown: true }).error?.message;

  it('requires JWT_REFRESH_SECRET in production', () => {
    expect(validate({ NODE_ENV: 'production' })).toContain('JWT_REFRESH_SECRET');
  });

  it('rejects short secrets', () => {
    expect(validate({ JWT_ACCESS_SECRET: 'short' })).toContain('JWT_ACCESS_SECRET');
  });

  it('passes in development with no secrets set', () => {
    expect(validate({})).toBeUndefined();
  });
});
