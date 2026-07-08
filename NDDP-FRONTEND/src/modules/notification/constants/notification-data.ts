export type NotificationStatus =
  | 'QUEUED' | 'SENT' | 'DELIVERED' | 'OPENED' | 'FAILED' | 'EXPIRED' | 'PENDING'
  | 'READ' | 'UNREAD' | 'ARCHIVED' | 'RETRIED' | 'ACTIVE' | 'INACTIVE' | 'SCHEDULED'
  | 'PUBLISHED' | 'DRAFT' | 'CANCELLED';

export type NotificationChannel = 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';

export interface InboxNotification {
  id: string;
  time: string;
  title: string;
  service: string;
  status: NotificationStatus;
  channel: NotificationChannel;
  priority: string;
  actionRequired?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  audience: string;
  priority: string;
  publishDate: string;
  expiryDate: string;
  status: NotificationStatus;
}

export interface BroadcastMessage {
  id: string;
  title: string;
  audience: string;
  channels: string;
  sentAt: string;
  recipients: number;
  status: NotificationStatus;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  code: string;
  channel: NotificationChannel | 'MULTI';
  subject?: string;
  language: string;
  priority: string;
  status: NotificationStatus;
  lastModified: string;
}

export interface ScheduledNotification {
  id: string;
  title: string;
  channel: NotificationChannel;
  scheduledFor: string;
  audience: string;
  status: NotificationStatus;
}

export interface ReminderRule {
  id: string;
  name: string;
  trigger: string;
  channel: string;
  leadTime: string;
  status: NotificationStatus;
}

export interface DeliveryRecord {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  sentTime: string;
  deliveredTime?: string;
  opened?: boolean;
  status: NotificationStatus;
  service: string;
}

export interface FailedDelivery {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  reason: string;
  attempts: number;
  lastAttempt: string;
  status: NotificationStatus;
}

export interface RetryQueueItem {
  id: string;
  notificationId: string;
  channel: NotificationChannel;
  attempt: number;
  nextRetry: string;
  status: NotificationStatus;
}

export interface CommunicationHistoryEvent {
  id: string;
  event: string;
  channel: NotificationChannel;
  recipient: string;
  timestamp: string;
}

export const NOTIFICATION_DASHBOARD_KPIS = {
  sentToday: 4287,
  emailsSent: 1842,
  smsSent: 624,
  pushSent: 891,
  inAppSent: 930,
  failedDeliveries: 23,
  pending: 156,
  scheduled: 84,
  avgDeliveryTime: '2.4s',
  successRate: '99.5%',
};

export const NOTIFICATIONS_BY_CHANNEL = [
  { name: 'Email', value: 1842 },
  { name: 'SMS', value: 624 },
  { name: 'Push', value: 891 },
  { name: 'In-App', value: 930 },
];

export const DAILY_NOTIFICATION_VOLUME = [
  { day: 'Mon', count: 3820 },
  { day: 'Tue', count: 4102 },
  { day: 'Wed', count: 4287 },
  { day: 'Thu', count: 3954 },
  { day: 'Fri', count: 3618 },
  { day: 'Sat', count: 842 },
  { day: 'Sun', count: 624 },
];

export const DELIVERY_STATUS_BREAKDOWN = [
  { name: 'Delivered', value: 4124 },
  { name: 'Pending', value: 156 },
  { name: 'Failed', value: 23 },
  { name: 'Retried', value: 18 },
];

export const NOTIFICATIONS_BY_SERVICE = [
  { name: 'Personnel', value: 842 },
  { name: 'Workflow', value: 624 },
  { name: 'Procurement', value: 418 },
  { name: 'Training', value: 356 },
  { name: 'Fleet', value: 284 },
  { name: 'Medical', value: 198 },
  { name: 'Finance', value: 176 },
];

export const MOCK_INBOX: InboxNotification[] = [
  { id: '1', time: 'Today 09:30', title: 'Leave Approved', service: 'Personnel', status: 'UNREAD', channel: 'IN_APP', priority: 'Normal' },
  { id: '2', time: 'Today 08:10', title: 'Purchase Order Approved', service: 'Procurement', status: 'READ', channel: 'IN_APP', priority: 'Normal' },
  { id: '3', time: 'Yesterday', title: 'Training Reminder', service: 'Training', status: 'READ', channel: 'EMAIL', priority: 'High' },
  { id: '4', time: 'Yesterday', title: 'Approval Pending — Vehicle Request', service: 'Fleet', status: 'UNREAD', channel: 'IN_APP', priority: 'High', actionRequired: true },
  { id: '5', time: '2 days ago', title: 'Medical Clearance Complete', service: 'Medical', status: 'ARCHIVED', channel: 'SMS', priority: 'Normal' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ANN-001', title: 'Public Holiday — Liberation Day', category: 'Holiday Notice', audience: 'All Staff', priority: 'High', publishDate: '2026-06-28', expiryDate: '2026-07-05', status: 'PUBLISHED' },
  { id: 'ANN-002', title: 'Updated Security Policy v3.2', category: 'Policy Update', audience: 'All Staff', priority: 'High', publishDate: '2026-07-01', expiryDate: '2026-08-01', status: 'PUBLISHED' },
  { id: 'ANN-003', title: 'System Maintenance Window', category: 'Maintenance', audience: 'IT Users', priority: 'Normal', publishDate: '2026-07-05', expiryDate: '2026-07-06', status: 'SCHEDULED' },
  { id: 'ANN-004', title: 'Leadership Development Programme', category: 'Training', audience: 'Officers', priority: 'Normal', publishDate: '2026-07-02', expiryDate: '2026-07-31', status: 'PUBLISHED' },
];

export const MOCK_BROADCASTS: BroadcastMessage[] = [
  { id: 'BC-101', title: 'Quarterly Town Hall Reminder', audience: 'Entire Organization', channels: 'Email, In-App', sentAt: '2026-07-07 08:00', recipients: 4280, status: 'DELIVERED' },
  { id: 'BC-102', title: 'Finance Department Briefing', audience: 'Finance Division', channels: 'Email, SMS', sentAt: '2026-07-06 14:30', recipients: 142, status: 'DELIVERED' },
  { id: 'BC-103', title: 'Emergency Weather Advisory', audience: 'All Units', channels: 'SMS, Push, In-App', sentAt: '2026-07-05 18:00', recipients: 4280, status: 'DELIVERED' },
];

export const MOCK_EMAIL_TEMPLATES: NotificationTemplate[] = [
  { id: 'ET-01', name: 'Welcome Email', code: 'WELCOME', channel: 'EMAIL', subject: 'Welcome to NDDTP', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-15' },
  { id: 'ET-02', name: 'Leave Approval', code: 'LEAVE_APPROVED', channel: 'EMAIL', subject: 'Your leave request has been approved', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-20' },
  { id: 'ET-03', name: 'Password Reset', code: 'PASSWORD_RESET', channel: 'EMAIL', subject: 'Reset your password', language: 'English', priority: 'High', status: 'ACTIVE', lastModified: '2026-05-10' },
  { id: 'ET-04', name: 'Procurement Approval', code: 'PO_APPROVED', channel: 'EMAIL', subject: 'Purchase order approved', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-28' },
];

export const MOCK_SMS_TEMPLATES: NotificationTemplate[] = [
  { id: 'ST-01', name: 'Leave Approved SMS', code: 'LEAVE_SMS', channel: 'SMS', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-18' },
  { id: 'ST-02', name: 'OTP Verification', code: 'OTP', channel: 'SMS', language: 'English', priority: 'Urgent', status: 'ACTIVE', lastModified: '2026-05-01' },
  { id: 'ST-03', name: 'Emergency Alert', code: 'EMERGENCY', channel: 'SMS', language: 'English', priority: 'Urgent', status: 'ACTIVE', lastModified: '2026-04-12' },
];

export const MOCK_PUSH_TEMPLATES: NotificationTemplate[] = [
  { id: 'PT-01', name: 'Training Reminder', code: 'TRAINING_REMINDER', channel: 'PUSH', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-22' },
  { id: 'PT-02', name: 'Approval Pending', code: 'APPROVAL_PENDING', channel: 'PUSH', language: 'English', priority: 'High', status: 'ACTIVE', lastModified: '2026-06-25' },
];

export const MOCK_MASTER_TEMPLATES: NotificationTemplate[] = [
  ...MOCK_EMAIL_TEMPLATES,
  ...MOCK_SMS_TEMPLATES,
  ...MOCK_PUSH_TEMPLATES,
  { id: 'MT-01', name: 'In-App Task Assigned', code: 'TASK_ASSIGNED', channel: 'IN_APP', language: 'English', priority: 'Normal', status: 'ACTIVE', lastModified: '2026-06-30' },
];

export const MOCK_SCHEDULED: ScheduledNotification[] = [
  { id: 'SCH-01', title: 'Birthday Greeting — Col. Nsengimana', channel: 'EMAIL', scheduledFor: '2026-07-10 08:00', audience: 'Individual', status: 'SCHEDULED' },
  { id: 'SCH-02', title: 'Contract Expiry Reminder', channel: 'EMAIL', scheduledFor: '2026-07-12 09:00', audience: 'HR Officers', status: 'SCHEDULED' },
  { id: 'SCH-03', title: 'Vehicle Inspection Due', channel: 'SMS', scheduledFor: '2026-07-09 07:00', audience: 'Fleet Unit', status: 'SCHEDULED' },
];

export const MOCK_REMINDERS: ReminderRule[] = [
  { id: 'REM-01', name: 'Approval Overdue', trigger: 'Task pending > 48h', channel: 'Email, In-App', leadTime: '48 hours', status: 'ACTIVE' },
  { id: 'REM-02', name: 'Contract Expiry', trigger: 'Contract ends in 30 days', channel: 'Email', leadTime: '30 days', status: 'ACTIVE' },
  { id: 'REM-03', name: 'Training Starts Tomorrow', trigger: 'Training session T-1', channel: 'Push, SMS', leadTime: '24 hours', status: 'ACTIVE' },
  { id: 'REM-04', name: 'Leave Balance Reminder', trigger: 'Unused leave > 15 days', channel: 'In-App', leadTime: 'Quarterly', status: 'ACTIVE' },
];

export const MOCK_DELIVERY: DeliveryRecord[] = [
  { id: 'DEL-8842', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', sentTime: '2026-07-08 09:30', deliveredTime: '2026-07-08 09:30', opened: true, status: 'OPENED', service: 'Personnel' },
  { id: 'DEL-8841', channel: 'SMS', recipient: '+250788***421', sentTime: '2026-07-08 09:15', deliveredTime: '2026-07-08 09:16', status: 'DELIVERED', service: 'Training' },
  { id: 'DEL-8840', channel: 'PUSH', recipient: 'device-token-***', sentTime: '2026-07-08 08:45', deliveredTime: '2026-07-08 08:45', status: 'DELIVERED', service: 'Workflow' },
  { id: 'DEL-8839', channel: 'IN_APP', recipient: 'user-uuid-***', sentTime: '2026-07-08 08:30', deliveredTime: '2026-07-08 08:30', opened: false, status: 'DELIVERED', service: 'Procurement' },
];

export const MOCK_FAILED: FailedDelivery[] = [
  { id: 'FAIL-12', channel: 'EMAIL', recipient: 'invalid@example', reason: 'Invalid Email', attempts: 3, lastAttempt: '2026-07-08 07:00', status: 'FAILED' },
  { id: 'FAIL-11', channel: 'SMS', recipient: '+250700***000', reason: 'Phone Unreachable', attempts: 2, lastAttempt: '2026-07-08 06:30', status: 'RETRIED' },
  { id: 'FAIL-10', channel: 'PUSH', recipient: 'expired-token', reason: 'Push Token Invalid', attempts: 1, lastAttempt: '2026-07-07 22:00', status: 'FAILED' },
];

export const MOCK_RETRY_QUEUE: RetryQueueItem[] = [
  { id: 'RQ-01', notificationId: 'NOT-4421', channel: 'EMAIL', attempt: 2, nextRetry: '2026-07-08 09:35', status: 'QUEUED' },
  { id: 'RQ-02', notificationId: 'NOT-4418', channel: 'SMS', attempt: 1, nextRetry: '2026-07-08 09:40', status: 'QUEUED' },
  { id: 'RQ-03', notificationId: 'NOT-4415', channel: 'EMAIL', attempt: 3, nextRetry: '2026-07-08 10:00', status: 'PENDING' },
];

export const MOCK_HISTORY: CommunicationHistoryEvent[] = [
  { id: 'H-01', event: 'Email Sent', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', timestamp: '2026-07-08 09:30:00' },
  { id: 'H-02', event: 'Delivered', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', timestamp: '2026-07-08 09:30:02' },
  { id: 'H-03', event: 'Opened', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', timestamp: '2026-07-08 09:45:12' },
  { id: 'H-04', event: 'Link Clicked', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', timestamp: '2026-07-08 09:46:30' },
  { id: 'H-05', event: 'Completed', channel: 'EMAIL', recipient: 'officer@mod.gov.rw', timestamp: '2026-07-08 09:46:31' },
];

export const MOCK_PREFERENCES = {
  email: true,
  sms: true,
  push: true,
  inApp: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '06:00',
  language: 'English',
  emergencyOverride: true,
};
