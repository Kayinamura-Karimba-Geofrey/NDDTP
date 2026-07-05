export const CACHE_KEYS = {
  CHANNEL: (id: string) => `messaging:channel:${id}`,
  USER_CHANNELS: (userId: string) => `messaging:user:${userId}:channels`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CHANNEL_CREATED: 'messaging.channel.created',
  MEMBER_ADDED: 'messaging.member.added',
  MESSAGE_SENT: 'messaging.message.sent',
  MESSAGE_DELIVERED: 'messaging.message.delivered',
  MESSAGE_READ: 'messaging.message.read',
} as const;

export const MESSAGE_STATUS_TRANSITIONS: Record<string, string[]> = {
  SENT: ['DELIVERED', 'FAILED', 'DELETED'],
  DELIVERED: ['READ', 'DELETED'],
  READ: ['DELETED'],
  FAILED: [],
  DELETED: [],
};

export const DEFAULT_CHANNELS = [
  { code: 'CH-SYSTEM', name: 'System Broadcast', channelType: 'BROADCAST' },
] as const;
