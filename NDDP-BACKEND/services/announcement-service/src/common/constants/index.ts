export const CACHE_KEYS = {
  CATEGORY: (id: string) => `announcement:category:${id}`,
  CATEGORIES: 'announcement:categories:active',
  PUBLISHED: 'announcement:published:list',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CATEGORY_CREATED: 'announcement.category.created',
  CREATED: 'announcement.created',
  PUBLISHED: 'announcement.published',
  WITHDRAWN: 'announcement.withdrawn',
  ACKNOWLEDGED: 'announcement.acknowledged',
} as const;

export const ANNOUNCEMENT_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['PUBLISHED', 'WITHDRAWN'],
  PUBLISHED: ['EXPIRED', 'WITHDRAWN'],
  EXPIRED: [],
  WITHDRAWN: [],
};

export const DEFAULT_CATEGORIES = [
  { code: 'CAT-GENERAL', name: 'General Announcements' },
  { code: 'CAT-OPERATIONS', name: 'Operations Notices' },
  { code: 'CAT-POLICY', name: 'Policy Updates' },
] as const;
