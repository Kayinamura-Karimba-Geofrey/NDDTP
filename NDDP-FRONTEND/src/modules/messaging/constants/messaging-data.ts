export type MessagingStatus =
  | 'ACTIVE' | 'ARCHIVED' | 'MUTED' | 'SENT' | 'DELIVERED' | 'READ'
  | 'FAILED' | 'DRAFT' | 'ONLINE' | 'OFFLINE' | 'AWAY' | 'PENDING';

export type ChannelType = 'DIRECT' | 'GROUP' | 'DEPARTMENT' | 'BROADCAST';

export interface MessagingChannel {
  id: string;
  name: string;
  type: ChannelType;
  members: number;
  lastMessage?: string;
  lastMessageAt?: string;
  unread: number;
  status: MessagingStatus;
  owner?: string;
}

export interface MessagingMessage {
  id: string;
  channelId: string;
  channelName: string;
  sender: string;
  body: string;
  sentAt: string;
  status: MessagingStatus;
  attachments?: number;
}

export interface ChannelMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: MessagingStatus;
  joinedAt: string;
}

export interface MessageReceipt {
  id: string;
  messageId: string;
  recipient: string;
  deliveredAt?: string;
  readAt?: string;
  status: MessagingStatus;
}

export interface PresenceUser {
  id: string;
  name: string;
  department: string;
  status: MessagingStatus;
  lastSeen: string;
}

export const MESSAGING_DASHBOARD_KPIS = {
  myChannels: 24,
  unreadMessages: 18,
  directChats: 9,
  groupChannels: 8,
  departmentChannels: 4,
  broadcasts: 3,
  messagesToday: 312,
  activeMembers: 186,
  deliveryRate: '99.2%',
  avgResponseTime: '4.6m',
};

export const MESSAGES_BY_TYPE = [
  { name: 'Direct', value: 142 },
  { name: 'Group', value: 98 },
  { name: 'Department', value: 46 },
  { name: 'Broadcast', value: 26 },
];

export const DAILY_MESSAGE_VOLUME = [
  { day: 'Mon', count: 268 },
  { day: 'Tue', count: 312 },
  { day: 'Wed', count: 295 },
  { day: 'Thu', count: 340 },
  { day: 'Fri', count: 288 },
  { day: 'Sat', count: 64 },
  { day: 'Sun', count: 42 },
];

export const DELIVERY_STATUS = [
  { name: 'Read', value: 210 },
  { name: 'Delivered', value: 78 },
  { name: 'Sent', value: 18 },
  { name: 'Failed', value: 6 },
];

export const MOCK_CHANNELS: MessagingChannel[] = [
  { id: 'CH-001', name: 'Col. Nsengimana', type: 'DIRECT', members: 2, lastMessage: 'Approved — proceed with the leave package.', lastMessageAt: 'Today 09:42', unread: 1, status: 'ACTIVE' },
  { id: 'CH-002', name: 'HR Operations', type: 'GROUP', members: 14, lastMessage: 'Reminder: access review closes Friday.', lastMessageAt: 'Today 09:15', unread: 5, status: 'ACTIVE', owner: 'hr.ops' },
  { id: 'CH-003', name: 'Finance Division', type: 'DEPARTMENT', members: 42, lastMessage: 'Q2 budget pack uploaded to DMS.', lastMessageAt: 'Today 08:50', unread: 0, status: 'ACTIVE', owner: 'finance.dir' },
  { id: 'CH-004', name: 'Fleet Unit', type: 'GROUP', members: 11, lastMessage: 'Vehicle inspection schedule for Monday.', lastMessageAt: 'Yesterday', unread: 2, status: 'ACTIVE', owner: 'fleet.ops' },
  { id: 'CH-005', name: 'Platform Announcement Channel', type: 'BROADCAST', members: 4280, lastMessage: 'Maintenance window Saturday 02:00–04:00.', lastMessageAt: 'Yesterday', unread: 0, status: 'ACTIVE', owner: 'comms' },
  { id: 'CH-006', name: 'Medical Board', type: 'GROUP', members: 8, lastMessage: 'Clearance batch EMP-441 ready.', lastMessageAt: '2 days ago', unread: 0, status: 'MUTED', owner: 'medical' },
  { id: 'CH-007', name: 'Training Cohort A', type: 'GROUP', members: 26, lastMessage: 'Course materials shared.', lastMessageAt: '3 days ago', unread: 0, status: 'ARCHIVED', owner: 'training' },
];

export const MOCK_INBOX: MessagingMessage[] = [
  { id: 'MSG-901', channelId: 'CH-001', channelName: 'Col. Nsengimana', sender: 'Col. Nsengimana', body: 'Approved — proceed with the leave package.', sentAt: 'Today 09:42', status: 'DELIVERED' },
  { id: 'MSG-900', channelId: 'CH-002', channelName: 'HR Operations', sender: 'Alice Uwimana', body: 'Reminder: access review closes Friday.', sentAt: 'Today 09:15', status: 'READ' },
  { id: 'MSG-899', channelId: 'CH-004', channelName: 'Fleet Unit', sender: 'Fleet Ops', body: 'Vehicle inspection schedule for Monday.', sentAt: 'Yesterday', status: 'SENT' },
  { id: 'MSG-898', channelId: 'CH-003', channelName: 'Finance Division', sender: 'CFO Office', body: 'Q2 budget pack uploaded to DMS.', sentAt: 'Today 08:50', status: 'READ' },
];

export const MOCK_MEMBERS: ChannelMember[] = [
  { id: 'MB-01', name: 'Alice Uwimana', role: 'Admin', department: 'HR', status: 'ONLINE', joinedAt: '2026-01-10' },
  { id: 'MB-02', name: 'Jean Bizimana', role: 'Member', department: 'HR', status: 'AWAY', joinedAt: '2026-01-12' },
  { id: 'MB-03', name: 'Claire Mukamana', role: 'Member', department: 'Personnel', status: 'ONLINE', joinedAt: '2026-02-01' },
  { id: 'MB-04', name: 'Eric Habimana', role: 'Member', department: 'Training', status: 'OFFLINE', joinedAt: '2026-03-15' },
];

export const MOCK_RECEIPTS: MessageReceipt[] = [
  { id: 'RCT-01', messageId: 'MSG-901', recipient: 'you', deliveredAt: '09:42:02', readAt: undefined, status: 'DELIVERED' },
  { id: 'RCT-02', messageId: 'MSG-900', recipient: 'Jean Bizimana', deliveredAt: '09:15:04', readAt: '09:18:11', status: 'READ' },
  { id: 'RCT-03', messageId: 'MSG-900', recipient: 'Claire Mukamana', deliveredAt: '09:15:05', readAt: '09:16:02', status: 'READ' },
  { id: 'RCT-04', messageId: 'MSG-899', recipient: 'Fleet Members', deliveredAt: undefined, status: 'SENT' },
];

export const MOCK_PRESENCE: PresenceUser[] = [
  { id: 'PR-01', name: 'Alice Uwimana', department: 'HR', status: 'ONLINE', lastSeen: 'Now' },
  { id: 'PR-02', name: 'Col. Nsengimana', department: 'Operations', status: 'ONLINE', lastSeen: 'Now' },
  { id: 'PR-03', name: 'Jean Bizimana', department: 'HR', status: 'AWAY', lastSeen: '12m ago' },
  { id: 'PR-04', name: 'Eric Habimana', department: 'Training', status: 'OFFLINE', lastSeen: '2h ago' },
];

export const MOCK_FILES = [
  { id: 'F-01', name: 'Q2-Budget-Pack.pdf', channel: 'Finance Division', uploadedBy: 'CFO Office', size: '2.4 MB', uploadedAt: 'Today 08:48' },
  { id: 'F-02', name: 'Inspection-Schedule.xlsx', channel: 'Fleet Unit', uploadedBy: 'Fleet Ops', size: '180 KB', uploadedAt: 'Yesterday' },
  { id: 'F-03', name: 'Access-Review-Checklist.docx', channel: 'HR Operations', uploadedBy: 'Alice Uwimana', size: '96 KB', uploadedAt: 'Today 09:10' },
];
