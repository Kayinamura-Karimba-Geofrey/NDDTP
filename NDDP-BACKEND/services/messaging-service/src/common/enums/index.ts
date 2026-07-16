export enum ChannelType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  DEPARTMENT = 'DEPARTMENT',
  BROADCAST = 'BROADCAST',
}

export enum ChannelStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum MessageType {
  TEXT = 'TEXT',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
  DELETED = 'DELETED',
}

export enum ReceiptStatus {
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

export enum MessagingPublishedEvent {
  CHANNEL_CREATED = 'messaging.channel.created',
  MEMBER_ADDED = 'messaging.member.added',
  MESSAGE_SENT = 'messaging.message.sent',
  MESSAGE_DELIVERED = 'messaging.message.delivered',
  MESSAGE_READ = 'messaging.message.read',
}
