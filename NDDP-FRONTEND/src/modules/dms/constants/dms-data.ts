export type DmsStatus =
  | 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'PENDING_SIGNATURE' | 'SIGNED'
  | 'ARCHIVED' | 'PENDING_DISPOSAL' | 'DISPOSED' | 'ACTIVE' | 'INACTIVE'
  | 'REJECTED' | 'IN_REVIEW' | 'LEGAL_HOLD' | 'EXPIRED' | 'SHARED';

export interface DmsDocument {
  id: string;
  documentNumber: string;
  title: string;
  category: string;
  owner: string;
  department: string;
  version: string;
  status: DmsStatus;
  createdDate: string;
  lastModified: string;
  fileType: string;
  sizeKb: number;
  classification?: string;
  retentionClass?: string;
  tags?: string[];
  relatedEntity?: string;
}

export interface SharedDocument {
  id: string;
  document: string;
  documentNumber: string;
  sharedBy: string;
  accessLevel: string;
  dateShared: string;
  expiry?: string;
}

export interface DmsFolder {
  id: string;
  name: string;
  path: string;
  children?: DmsFolder[];
  documentCount: number;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: string;
  notes: string;
  author: string;
  date: string;
  current?: boolean;
}

export interface SignatureRequest {
  id: string;
  document: string;
  documentNumber: string;
  signatories: { name: string; status: string; signedAt?: string }[];
  status: DmsStatus;
  requestedBy: string;
  dueDate: string;
}

export interface ApprovalItem {
  id: string;
  document: string;
  documentNumber: string;
  stage: string;
  requester: string;
  submittedDate: string;
  priority: string;
  status: DmsStatus;
}

export interface RetentionRule {
  id: string;
  recordType: string;
  retentionPeriod: string;
  legalHold: boolean;
  activeRecords: number;
  nearExpiry: number;
}

export interface ArchiveRecord {
  id: string;
  documentNumber: string;
  title: string;
  archivedDate: string;
  dispositionDate?: string;
  status: DmsStatus;
}

export interface DmsPermission {
  id: string;
  subject: string;
  subjectType: string;
  document: string;
  permissions: string[];
  expires?: string;
}

export interface DmsAuditEvent {
  id: string;
  event: string;
  document: string;
  actor: string;
  detail: string;
  date: string;
}

export const DMS_DASHBOARD_KPIS = {
  totalDocuments: '1,248,540',
  uploadedToday: 419,
  pendingApprovals: 184,
  awaitingSignature: 73,
  archivedRecords: '42,180',
  sharedDocuments: 1256,
  expiringRecords: 311,
  storageUsed: '2.4 TB',
  recentDownloads: 4862,
  retentionActionsDue: 27,
};

export const DOCS_BY_CATEGORY = [
  { name: 'Personnel', value: 32 },
  { name: 'Procurement', value: 24 },
  { name: 'Finance', value: 18 },
  { name: 'Training', value: 14 },
  { name: 'Medical', value: 6 },
  { name: 'Other', value: 6 },
];

export const MONTHLY_UPLOADS = [
  { month: 'Jan', count: 8200 }, { month: 'Feb', count: 9100 },
  { month: 'Mar', count: 8800 }, { month: 'Apr', count: 10200 },
  { month: 'May', count: 11500 }, { month: 'Jun', count: 12100 },
  { month: 'Jul', count: 9800 },
];

export const APPROVAL_STATUS_DIST = [
  { name: 'Pending', value: 184 },
  { name: 'Approved', value: 419 },
  { name: 'Rejected', value: 28 },
  { name: 'Returned', value: 41 },
];

export const STORAGE_BY_DEPT = [
  { name: 'HQ', value: 420 },
  { name: 'Procurement', value: 310 },
  { name: 'Finance', value: 280 },
  { name: 'Medical', value: 190 },
  { name: 'Training', value: 150 },
  { name: 'HR', value: 220 },
];

export const ARCHIVED_VS_ACTIVE = [
  { name: 'Active', value: 72 },
  { name: 'Archived', value: 28 },
];

export const MOCK_DOCUMENTS: DmsDocument[] = [
  { id: 'd1', documentNumber: 'DMS-2026-0142', title: 'Procurement Contract – Office Equipment', category: 'Procurement', owner: 'Alice N.', department: 'Procurement', version: 'v3.2', status: 'APPROVED', createdDate: '2026-07-01', lastModified: '2026-07-08T09:42:00', fileType: 'PDF', sizeKb: 2450, classification: 'Confidential', retentionClass: '7 Years', tags: ['contract', 'office equipment'], relatedEntity: 'PO-2026-0881' },
  { id: 'd2', documentNumber: 'DMS-2026-0138', title: 'Annual Training Plan 2026', category: 'Training', owner: 'Training Office', department: 'Training', version: 'v2.0', status: 'PENDING_SIGNATURE', createdDate: '2026-06-15', lastModified: '2026-07-08T08:15:00', fileType: 'PDF', sizeKb: 1800, classification: 'Internal', retentionClass: '5 Years', tags: ['training', 'plan'] },
  { id: 'd3', documentNumber: 'DMS-2026-0119', title: 'Personnel Transfer Letter', category: 'Personnel', owner: 'HR Officer', department: 'HR', version: 'v1.1', status: 'ARCHIVED', createdDate: '2026-05-10', lastModified: '2026-07-07T16:00:00', fileType: 'DOCX', sizeKb: 320, classification: 'Confidential', retentionClass: '10 Years' },
  { id: 'd4', documentNumber: 'DMS-2026-0150', title: 'Budget Revision Q3 2026', category: 'Finance', owner: 'Finance Manager', department: 'Finance', version: 'v1.0', status: 'PENDING_APPROVAL', createdDate: '2026-07-07', lastModified: '2026-07-08T07:30:00', fileType: 'XLSX', sizeKb: 890, classification: 'Restricted', retentionClass: '7 Years', relatedEntity: 'BUD-2026-Q3' },
  { id: 'd5', documentNumber: 'DMS-2026-0148', title: 'Medical Clearance – PER-1042', category: 'Medical', owner: 'Medical Officer', department: 'Medical', version: 'v1.0', status: 'SIGNED', createdDate: '2026-07-06', lastModified: '2026-07-06T14:20:00', fileType: 'PDF', sizeKb: 540, classification: 'Confidential', retentionClass: 'Policy' },
  { id: 'd6', documentNumber: 'DMS-2026-0145', title: 'RFQ Package – Uniforms 2026', category: 'Procurement', owner: 'Procurement Officer', department: 'Procurement', version: 'v1.3', status: 'DRAFT', createdDate: '2026-07-05', lastModified: '2026-07-07T11:00:00', fileType: 'PDF', sizeKb: 4100, classification: 'Internal', retentionClass: 'Contract + 5Y' },
];

export const MOCK_SHARED: SharedDocument[] = [
  { id: 's1', document: 'Procurement Contract – Office Equipment', documentNumber: 'DMS-2026-0142', sharedBy: 'Alice N. / Procurement', accessLevel: 'View', dateShared: '2026-07-08', expiry: '2026-08-08' },
  { id: 's2', document: 'Annual Training Plan 2026', documentNumber: 'DMS-2026-0138', sharedBy: 'Training Office', accessLevel: 'Comment', dateShared: '2026-07-07' },
  { id: 's3', document: 'Budget Revision Q3 2026', documentNumber: 'DMS-2026-0150', sharedBy: 'Finance Manager', accessLevel: 'Edit', dateShared: '2026-07-07', expiry: '2026-07-20' },
];

export const MOCK_FOLDERS: DmsFolder[] = [
  {
    id: 'f1', name: 'Personnel', path: '/Personnel', documentCount: 4200,
    children: [
      { id: 'f1a', name: 'Contracts', path: '/Personnel/Contracts', documentCount: 1100 },
      { id: 'f1b', name: 'Transfers', path: '/Personnel/Transfers', documentCount: 890 },
      { id: 'f1c', name: 'Promotions', path: '/Personnel/Promotions', documentCount: 640 },
      { id: 'f1d', name: 'Training Records', path: '/Personnel/Training Records', documentCount: 1570 },
    ],
  },
  {
    id: 'f2', name: 'Finance', path: '/Finance', documentCount: 3800,
    children: [
      { id: 'f2a', name: 'Budgets', path: '/Finance/Budgets', documentCount: 920 },
      { id: 'f2b', name: 'Invoices', path: '/Finance/Invoices', documentCount: 2100 },
      { id: 'f2c', name: 'Payments', path: '/Finance/Payments', documentCount: 780 },
    ],
  },
  {
    id: 'f3', name: 'Procurement', path: '/Procurement', documentCount: 5100,
    children: [
      { id: 'f3a', name: 'RFQs', path: '/Procurement/RFQs', documentCount: 980 },
      { id: 'f3b', name: 'Tenders', path: '/Procurement/Tenders', documentCount: 720 },
      { id: 'f3c', name: 'Contracts', path: '/Procurement/Contracts', documentCount: 1450 },
      { id: 'f3d', name: 'Purchase Orders', path: '/Procurement/Purchase Orders', documentCount: 1950 },
    ],
  },
];

export const MOCK_VERSIONS: DocumentVersion[] = [
  { id: 'v1', documentId: 'd1', version: 'v3.2', notes: 'Updated procurement terms', author: 'Alice N.', date: '2026-07-08T09:42:00', current: true },
  { id: 'v2', documentId: 'd1', version: 'v3.1', notes: 'Added delivery schedule', author: 'Procurement Officer', date: '2026-07-05T14:10:00' },
  { id: 'v3', documentId: 'd1', version: 'v3.0', notes: 'Initial approved contract', author: 'Procurement Manager', date: '2026-07-01T11:25:00' },
];

export const MOCK_SIGNATURES: SignatureRequest[] = [
  {
    id: 'sig1', document: 'Annual Training Plan 2026', documentNumber: 'DMS-2026-0138', status: 'PENDING_SIGNATURE', requestedBy: 'Training Office', dueDate: '2026-07-10',
    signatories: [
      { name: 'Procurement Manager', status: 'Signed', signedAt: '2026-07-08T09:12:00' },
      { name: 'Finance Director', status: 'Signed', signedAt: '2026-07-08T09:27:00' },
      { name: 'Chief Administrator', status: 'Waiting' },
    ],
  },
  {
    id: 'sig2', document: 'Medical Clearance – PER-1042', documentNumber: 'DMS-2026-0145', status: 'SIGNED', requestedBy: 'Medical Officer', dueDate: '2026-07-06',
    signatories: [
      { name: 'Medical Officer', status: 'Signed', signedAt: '2026-07-06T14:00:00' },
      { name: 'Fitness Board Chair', status: 'Signed', signedAt: '2026-07-06T14:20:00' },
    ],
  },
];

export const MOCK_APPROVALS: ApprovalItem[] = [
  { id: 'a1', document: 'Budget Revision Q3 2026', documentNumber: 'DMS-2026-0150', stage: 'Finance Review', requester: 'Budget Officer', submittedDate: '2026-07-07', priority: 'Urgent', status: 'PENDING_APPROVAL' },
  { id: 'a2', document: 'RFQ Package – Uniforms 2026', documentNumber: 'DMS-2026-0145', stage: 'Department Review', requester: 'Procurement Officer', submittedDate: '2026-07-05', priority: 'Normal', status: 'IN_REVIEW' },
  { id: 'a3', document: 'Procurement Contract – Office Equipment', documentNumber: 'DMS-2026-0142', stage: 'Final Approval', requester: 'Alice N.', submittedDate: '2026-07-01', priority: 'Normal', status: 'APPROVED' },
];

export const MOCK_RETENTION: RetentionRule[] = [
  { id: 'r1', recordType: 'Personnel Records', retentionPeriod: '10 Years', legalHold: false, activeRecords: 18400, nearExpiry: 42 },
  { id: 'r2', recordType: 'Financial Records', retentionPeriod: '7 Years', legalHold: false, activeRecords: 22100, nearExpiry: 88 },
  { id: 'r3', recordType: 'Procurement Contracts', retentionPeriod: 'Contract Life + 5 Years', legalHold: true, activeRecords: 9800, nearExpiry: 31 },
  { id: 'r4', recordType: 'Training Records', retentionPeriod: '5 Years', legalHold: false, activeRecords: 15600, nearExpiry: 120 },
  { id: 'r5', recordType: 'Medical Administrative Records', retentionPeriod: 'Organizational Policy', legalHold: false, activeRecords: 6400, nearExpiry: 30 },
];

export const MOCK_ARCHIVE: ArchiveRecord[] = [
  { id: 'ar1', documentNumber: 'DMS-2020-0881', title: 'Personnel Archive Batch 2020', archivedDate: '2026-07-08', status: 'ARCHIVED' },
  { id: 'ar2', documentNumber: 'DMS-2018-0442', title: 'Legacy Invoice Set FY2018', archivedDate: '2026-06-15', dispositionDate: '2026-08-01', status: 'PENDING_DISPOSAL' },
  { id: 'ar3', documentNumber: 'DMS-2015-0012', title: 'Closed Tender Archive', archivedDate: '2025-12-01', dispositionDate: '2026-06-01', status: 'DISPOSED' },
];

export const MOCK_PERMISSIONS: DmsPermission[] = [
  { id: 'p1', subject: 'Procurement Department', subjectType: 'Department', document: 'DMS-2026-0142', permissions: ['View', 'Download', 'Comment'] },
  { id: 'p2', subject: 'Alice N.', subjectType: 'User', document: 'DMS-2026-0142', permissions: ['View', 'Download', 'Edit', 'Share', 'Approve'] },
  { id: 'p3', subject: 'Finance Managers', subjectType: 'Role', document: 'DMS-2026-0150', permissions: ['View', 'Approve'], expires: '2026-07-20' },
];

export const MOCK_AUDIT: DmsAuditEvent[] = [
  { id: 'au1', event: 'Uploaded', document: 'Contract_2026_014.pdf', actor: 'Alice N. · Procurement', detail: 'Document DMS-2026-0142 uploaded', date: '2026-07-08T09:40:00' },
  { id: 'au2', event: 'Approved', document: 'Budget_Revision_Q3.xlsx', actor: 'Finance Manager', detail: 'Finance review approved', date: '2026-07-08T09:32:00' },
  { id: 'au3', event: 'Signed', document: 'Training_Certificate_7781.pdf', actor: 'Registrar', detail: 'Digital signature applied', date: '2026-07-08T09:26:00' },
  { id: 'au4', event: 'Archived', document: 'Personnel_Archive_2020.zip', actor: 'System', detail: 'Retention schedule executed automatically', date: '2026-07-08T09:13:00' },
  { id: 'au5', event: 'Viewed', document: 'DMS-2026-0142', actor: 'Jean Mukamana', detail: 'Opened document viewer', date: '2026-07-08T09:10:00' },
  { id: 'au6', event: 'Shared', document: 'DMS-2026-0138', actor: 'Training Office', detail: 'Access granted to HR (Comment)', date: '2026-07-07T16:00:00' },
];

export const RECENT_ACTIVITY = MOCK_AUDIT.slice(0, 4);
