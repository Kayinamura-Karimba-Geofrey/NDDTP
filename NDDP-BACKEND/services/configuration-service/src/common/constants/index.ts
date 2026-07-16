export const CACHE_KEYS = {
  NAMESPACE: (id: string) => `configuration:namespace:${id}`,
  NAMESPACES: 'configuration:namespaces:active',
  ENTRY: (namespaceId: string, key: string) => `configuration:entry:${namespaceId}:${key}`,
  NAMESPACE_ENTRIES: (namespaceId: string) => `configuration:namespace:${namespaceId}:entries`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  NAMESPACE_CREATED: 'configuration.namespace.created',
  ENTRY_CREATED: 'configuration.entry.created',
  ENTRY_UPDATED: 'configuration.entry.updated',
  ENTRY_ACTIVATED: 'configuration.entry.activated',
  ENTRY_DEPRECATED: 'configuration.entry.deprecated',
} as const;

export const ENTRY_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['ACTIVE', 'DEPRECATED'],
  ACTIVE: ['DEPRECATED'],
  DEPRECATED: [],
};

export const DEFAULT_NAMESPACES = [
  { code: 'NS-PLATFORM', name: 'Platform Settings' },
  { code: 'NS-SECURITY', name: 'Security Settings' },
  { code: 'NS-NOTIFICATIONS', name: 'Notification Settings' },
] as const;

export const DEFAULT_ENTRIES = [
  { namespaceCode: 'NS-PLATFORM', key: 'platform.name', value: 'NDDTP', valueType: 'STRING' },
  { namespaceCode: 'NS-SECURITY', key: 'security.session.timeout', value: '3600', valueType: 'NUMBER' },
  { namespaceCode: 'NS-NOTIFICATIONS', key: 'notifications.email.enabled', value: 'true', valueType: 'BOOLEAN' },
] as const;
