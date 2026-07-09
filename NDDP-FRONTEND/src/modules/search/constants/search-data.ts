export type SearchStatus =
  | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'INDEXED' | 'FAILED' | 'DELETED'
  | 'COMPLETED' | 'DRAFT';

export type IndexType = 'PERSONNEL' | 'DOCUMENT' | 'ASSET' | 'ANNOUNCEMENT' | 'CUSTOM';
export type QueryStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface SearchIndexRecord {
  id: string;
  code: string;
  name: string;
  indexType: IndexType;
  description: string;
  documentCount: number;
  status: SearchStatus;
  lastIndexedAt: string;
}

export interface SearchDocumentRecord {
  id: string;
  indexId: string;
  indexName: string;
  externalId: string;
  title: string;
  content: string;
  status: SearchStatus;
  indexedAt: string;
}

export interface SearchHit {
  documentId: string;
  title: string;
  score: number;
}

export interface SearchQueryRecord {
  id: string;
  query: string;
  indexName: string;
  status: QueryStatus;
  hitCount: number;
  results: SearchHit[];
  submittedBy: string;
  submittedAt: string;
}

export interface SearchSynonym {
  id: string;
  term: string;
  synonyms: string;
  status: SearchStatus;
}

export const SEARCH_DASHBOARD_KPIS = {
  activeIndexes: 5,
  indexedDocuments: 12480,
  queriesToday: 186,
  avgLatencyMs: 42,
  pendingDocuments: 18,
  failedIndexJobs: 2,
  savedQueries: 24,
  mineQueries: 11,
  hitRate: '91%',
  synonyms: 64,
};

export const QUERIES_BY_DAY = [
  { day: 'Mon', count: 142 },
  { day: 'Tue', count: 168 },
  { day: 'Wed', count: 155 },
  { day: 'Thu', count: 186 },
  { day: 'Fri', count: 174 },
  { day: 'Sat', count: 48 },
  { day: 'Sun', count: 32 },
];

export const INDEX_TYPE_BREAKDOWN = [
  { name: 'Document', value: 5200 },
  { name: 'Personnel', value: 3100 },
  { name: 'Asset', value: 2400 },
  { name: 'Announcement', value: 980 },
  { name: 'Custom', value: 800 },
];

export const QUERY_STATUS_BREAKDOWN = [
  { name: 'Completed', value: 410 },
  { name: 'Pending', value: 12 },
  { name: 'Failed', value: 6 },
];

export const MOCK_INDEXES: SearchIndexRecord[] = [
  { id: 'IDX-01', code: 'DOC-MAIN', name: 'Corporate Documents', indexType: 'DOCUMENT', description: 'Policies, circulars, and DMS records', documentCount: 5200, status: 'ACTIVE', lastIndexedAt: '2026-07-08 08:40' },
  { id: 'IDX-02', code: 'PER-CORE', name: 'Personnel Directory', indexType: 'PERSONNEL', description: 'People profiles and assignments', documentCount: 3100, status: 'ACTIVE', lastIndexedAt: '2026-07-08 07:15' },
  { id: 'IDX-03', code: 'AST-INV', name: 'Asset Inventory', indexType: 'ASSET', description: 'Assets and equipment metadata', documentCount: 2400, status: 'ACTIVE', lastIndexedAt: '2026-07-08 06:50' },
  { id: 'IDX-04', code: 'ANN-PUB', name: 'Announcements', indexType: 'ANNOUNCEMENT', description: 'Public and internal notices', documentCount: 980, status: 'ACTIVE', lastIndexedAt: '2026-07-07 18:20' },
  { id: 'IDX-05', code: 'CUST-OPS', name: 'Ops Knowledge Base', indexType: 'CUSTOM', description: 'Custom operational manuals', documentCount: 800, status: 'INACTIVE', lastIndexedAt: '2026-07-01 12:00' },
];

export const SEARCH_MOCK_DOCUMENTS: SearchDocumentRecord[] = [
  { id: 'DOC-9001', indexId: 'IDX-01', indexName: 'Corporate Documents', externalId: 'DMS-4412', title: 'Travel Allowance Policy 2026', content: 'Updated travel and per diem rules for staff deployments.', status: 'INDEXED', indexedAt: '2026-07-08 08:35' },
  { id: 'DOC-9002', indexId: 'IDX-01', indexName: 'Corporate Documents', externalId: 'DMS-4390', title: 'Vehicle Dispatch SOP', content: 'Standard operating procedure for convoy and courier dispatch.', status: 'INDEXED', indexedAt: '2026-07-08 08:20' },
  { id: 'DOC-9003', indexId: 'IDX-02', indexName: 'Personnel Directory', externalId: 'PER-11820', title: 'Capt. Uwimana Jean', content: 'Operations Directorate · HQ Complex', status: 'INDEXED', indexedAt: '2026-07-08 07:10' },
  { id: 'DOC-9004', indexId: 'IDX-03', indexName: 'Asset Inventory', externalId: 'AST-VH-214', title: 'Toyota Land Cruiser VH-214', content: 'Fleet vehicle assigned to Logistics Desk', status: 'PENDING', indexedAt: '—' },
  { id: 'DOC-9005', indexId: 'IDX-04', indexName: 'Announcements', externalId: 'ANN-772', title: 'Independence Day Stand-down', content: 'Campus access rules for the holiday weekend.', status: 'FAILED', indexedAt: '2026-07-07 18:18' },
];

export const MOCK_QUERIES: SearchQueryRecord[] = [
  {
    id: 'Q-701',
    query: 'travel allowance policy',
    indexName: 'Corporate Documents',
    status: 'COMPLETED',
    hitCount: 3,
    results: [
      { documentId: 'DOC-9001', title: 'Travel Allowance Policy 2026', score: 0.94 },
      { documentId: 'DOC-9002', title: 'Vehicle Dispatch SOP', score: 0.61 },
      { documentId: 'DOC-9005', title: 'Independence Day Stand-down', score: 0.42 },
    ],
    submittedBy: 'You',
    submittedAt: '2026-07-08 09:12',
  },
  {
    id: 'Q-702',
    query: 'Uwimana operations',
    indexName: 'Personnel Directory',
    status: 'COMPLETED',
    hitCount: 1,
    results: [{ documentId: 'DOC-9003', title: 'Capt. Uwimana Jean', score: 0.88 }],
    submittedBy: 'You',
    submittedAt: '2026-07-08 08:55',
  },
  {
    id: 'Q-703',
    query: 'land cruiser logistics',
    indexName: 'Asset Inventory',
    status: 'PENDING',
    hitCount: 0,
    results: [],
    submittedBy: 'Ops Coord',
    submittedAt: '2026-07-08 10:02',
  },
  {
    id: 'Q-704',
    query: 'convoy sop',
    indexName: 'All indexes',
    status: 'COMPLETED',
    hitCount: 2,
    results: [
      { documentId: 'DOC-9002', title: 'Vehicle Dispatch SOP', score: 0.91 },
      { documentId: 'DOC-9001', title: 'Travel Allowance Policy 2026', score: 0.55 },
    ],
    submittedBy: 'Logistics Desk',
    submittedAt: '2026-07-07 16:40',
  },
  {
    id: 'Q-705',
    query: '???',
    indexName: 'Ops Knowledge Base',
    status: 'FAILED',
    hitCount: 0,
    results: [],
    submittedBy: 'Analyst',
    submittedAt: '2026-07-07 11:05',
  },
];

export const MOCK_MY_QUERIES = MOCK_QUERIES.filter((q) => ['Q-701', 'Q-702'].includes(q.id));

export const MOCK_SYNONYMS: SearchSynonym[] = [
  { id: 'SYN-01', term: 'leave', synonyms: 'absence, furlough, time-off', status: 'ACTIVE' },
  { id: 'SYN-02', term: 'vehicle', synonyms: 'car, fleet, transport', status: 'ACTIVE' },
  { id: 'SYN-03', term: 'HQ', synonyms: 'headquarters, main campus', status: 'ACTIVE' },
  { id: 'SYN-04', term: 'SOP', synonyms: 'standard operating procedure, playbook', status: 'INACTIVE' },
];
