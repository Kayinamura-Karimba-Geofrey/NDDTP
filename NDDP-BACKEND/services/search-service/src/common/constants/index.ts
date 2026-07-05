export const CACHE_KEYS = {
  INDEX: (id: string) => `search:index:${id}`,
  INDEXES: 'search:indexes:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  INDEX_CREATED: 'search.index.created',
  DOCUMENT_INDEXED: 'search.document.indexed',
  DOCUMENT_DELETED: 'search.document.deleted',
  QUERY_SUBMITTED: 'search.query.submitted',
  QUERY_COMPLETED: 'search.query.completed',
} as const;

export const QUERY_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['COMPLETED', 'FAILED'],
  COMPLETED: [],
  FAILED: [],
};

export const DEFAULT_SEARCH_INDEXES = [
  { code: 'IDX-PERSONNEL', name: 'Personnel Index', indexType: 'PERSONNEL' },
  { code: 'IDX-DOCUMENTS', name: 'Documents Index', indexType: 'DOCUMENT' },
  { code: 'IDX-ASSETS', name: 'Assets Index', indexType: 'ASSET' },
] as const;
