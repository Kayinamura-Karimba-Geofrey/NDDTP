export enum IndexType {
  PERSONNEL = 'PERSONNEL',
  DOCUMENT = 'DOCUMENT',
  ASSET = 'ASSET',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  CUSTOM = 'CUSTOM',
}

export enum IndexStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  INDEXED = 'INDEXED',
  FAILED = 'FAILED',
  DELETED = 'DELETED',
}

export enum QueryStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum SearchPublishedEvent {
  INDEX_CREATED = 'search.index.created',
  DOCUMENT_INDEXED = 'search.document.indexed',
  DOCUMENT_DELETED = 'search.document.deleted',
  QUERY_SUBMITTED = 'search.query.submitted',
  QUERY_COMPLETED = 'search.query.completed',
}
