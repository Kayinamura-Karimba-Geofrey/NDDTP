import dataSource from '../data-source';
import { NotificationTemplate } from '../entities/notification-template.entity';
import { NotificationChannel, TemplateStatus } from '../../common/enums';

const TEMPLATES = [
  {
    code: 'PASSWORD_RESET',
    name: 'Password Reset',
    channel: NotificationChannel.EMAIL,
    subject: 'NDDTP - Password Reset Request',
    body: 'Hello {{firstName}},\n\nA password reset was requested for your account.\n\nReset link: {{resetLink}}\n\nThis link expires in 1 hour.\n\nIf you did not request this, please contact support.',
    variables: ['firstName', 'resetLink'],
  },
  {
    code: 'ACCOUNT_LOCKED',
    name: 'Account Locked',
    channel: NotificationChannel.EMAIL,
    subject: 'NDDTP - Account Locked',
    body: 'Hello {{firstName}},\n\nYour account has been locked due to multiple failed login attempts.\n\nLocked until: {{lockedUntil}}\n\nContact your administrator if you need assistance.',
    variables: ['firstName', 'lockedUntil'],
  },
  {
    code: 'WELCOME',
    name: 'Welcome Email',
    channel: NotificationChannel.EMAIL,
    subject: 'Welcome to NDDTP',
    body: 'Hello {{firstName}} {{lastName}},\n\nWelcome to the National Defence Digital Transformation Platform.\n\nYour account has been created. Please complete credential registration to activate your account.\n\nEmail: {{email}}',
    variables: ['firstName', 'lastName', 'email'],
  },
  {
    code: 'ROLE_ASSIGNED',
    name: 'Role Assigned',
    channel: NotificationChannel.IN_APP,
    subject: 'New Role Assigned',
    body: 'You have been assigned the role: {{roleCode}}. This may grant you additional permissions on the platform.',
    variables: ['roleCode'],
  },
  {
    code: 'MFA_ENABLED',
    name: 'MFA Enabled',
    channel: NotificationChannel.EMAIL,
    subject: 'NDDTP - Multi-Factor Authentication Enabled',
    body: 'Hello {{firstName}},\n\nMulti-factor authentication has been enabled on your account.\n\nIf you did not enable MFA, contact support immediately.',
    variables: ['firstName'],
  },
];

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(NotificationTemplate);

  for (const t of TEMPLATES) {
    const existing = await repo.findOne({ where: { code: t.code } });
    if (!existing) {
      await repo.save(repo.create({ ...t, status: TemplateStatus.ACTIVE, isSystem: true }));
      console.log(`Created template: ${t.code}`);
    }
  }

  console.log('Seed completed');
  await dataSource.destroy();
}

seed().catch((e) => { console.error(e); process.exit(1); });
