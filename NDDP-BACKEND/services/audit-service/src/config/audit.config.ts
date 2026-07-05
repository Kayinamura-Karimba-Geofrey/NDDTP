import { registerAs } from '@nestjs/config';
export default registerAs('audit', () => ({
  retentionDays: parseInt(process.env.AUDIT_RETENTION_DAYS || '2555', 10),
  integritySecret: process.env.AUDIT_INTEGRITY_SECRET || 'change_me_audit_integrity_secret',
}));
