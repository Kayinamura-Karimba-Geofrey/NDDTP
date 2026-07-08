export type VisitorModuleStatus =
  | 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  | 'CHECKED_IN' | 'CHECKED_OUT' | 'BLACKLISTED' | 'COMPLETED' | 'SCHEDULED'
  | 'AVAILABLE' | 'OCCUPIED' | 'EXPIRED';

export type SiteType = 'HQ' | 'BASE' | 'CLINIC' | 'WAREHOUSE' | 'OTHER';
export type IdDocumentType = 'NATIONAL_ID' | 'PASSPORT' | 'DRIVERS_LICENSE' | 'MILITARY_ID' | 'OTHER';
export type CheckInType = 'CHECK_IN' | 'CHECK_OUT';

export interface VisitSite {
  id: string;
  name: string;
  type: SiteType;
  location: string;
  capacity: number;
  activeVisits: number;
  status: VisitorModuleStatus;
}

export interface VisitorRecord {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  idType: IdDocumentType;
  idNumber: string;
  visits: number;
  status: VisitorModuleStatus;
  lastVisit?: string;
}

export interface VisitRequest {
  id: string;
  visitor: string;
  host: string;
  site: string;
  purpose: string;
  scheduledAt: string;
  status: VisitorModuleStatus;
  badge?: string;
}

export interface CheckInLog {
  id: string;
  visitId: string;
  visitor: string;
  site: string;
  type: CheckInType;
  timestamp: string;
  officer: string;
}

export interface VisitorBadge {
  id: string;
  visitor: string;
  visitId: string;
  issuedAt: string;
  expiresAt: string;
  status: VisitorModuleStatus;
}

export interface BlacklistEntry {
  id: string;
  name: string;
  reason: string;
  addedBy: string;
  addedAt: string;
  status: VisitorModuleStatus;
}

export const VISITOR_DASHBOARD_KPIS = {
  visitorsToday: 64,
  currentlyOnSite: 18,
  pendingApprovals: 7,
  checkInsToday: 42,
  checkOutsToday: 24,
  activeSites: 6,
  blacklisted: 3,
  scheduledTomorrow: 11,
  avgVisitDuration: '2.4h',
  approvalRate: '91%',
};

export const VISITS_BY_SITE = [
  { name: 'HQ', value: 28 },
  { name: 'Training Wing', value: 14 },
  { name: 'Medical Clinic', value: 9 },
  { name: 'Logistics Depot', value: 7 },
  { name: 'Warehouse A', value: 6 },
];

export const DAILY_CHECKINS = [
  { hour: '07', count: 4 },
  { hour: '08', count: 12 },
  { hour: '09', count: 18 },
  { hour: '10', count: 14 },
  { hour: '11', count: 8 },
  { hour: '12', count: 5 },
  { hour: '13', count: 7 },
  { hour: '14', count: 9 },
];

export const VISIT_STATUS_BREAKDOWN = [
  { name: 'Approved', value: 36 },
  { name: 'Pending', value: 7 },
  { name: 'Checked In', value: 18 },
  { name: 'Completed', value: 24 },
  { name: 'Rejected', value: 3 },
];

export const MOCK_SITES: VisitSite[] = [
  { id: 'SITE-01', name: 'HQ Main Gate', type: 'HQ', location: 'Kigali HQ', capacity: 80, activeVisits: 12, status: 'ACTIVE' },
  { id: 'SITE-02', name: 'Training Wing', type: 'BASE', location: 'Training Complex', capacity: 40, activeVisits: 5, status: 'ACTIVE' },
  { id: 'SITE-03', name: 'Medical Clinic', type: 'CLINIC', location: 'Medical Block', capacity: 20, activeVisits: 2, status: 'ACTIVE' },
  { id: 'SITE-04', name: 'Logistics Depot', type: 'WAREHOUSE', location: 'Depot North', capacity: 25, activeVisits: 3, status: 'ACTIVE' },
  { id: 'SITE-05', name: 'Warehouse A', type: 'WAREHOUSE', location: 'Industrial Park', capacity: 15, activeVisits: 0, status: 'INACTIVE' },
];

export const MOCK_VISITORS: VisitorRecord[] = [
  { id: 'VIS-1001', name: 'Paul Kagabo', organization: 'Rwanda Utilities', phone: '+250788***211', email: 'p.kagabo@example.rw', idType: 'NATIONAL_ID', idNumber: '1198*****01', visits: 6, status: 'ACTIVE', lastVisit: '2026-07-08' },
  { id: 'VIS-1002', name: 'Diane Mutoni', organization: 'External Auditor', phone: '+250788***422', email: 'd.mutoni@example.rw', idType: 'PASSPORT', idNumber: 'PC*******2', visits: 2, status: 'ACTIVE', lastVisit: '2026-07-07' },
  { id: 'VIS-1003', name: 'Mark Johnson', organization: 'UN Partner', phone: '+250788***733', email: 'm.johnson@example.org', idType: 'PASSPORT', idNumber: 'UN*******9', visits: 11, status: 'ACTIVE', lastVisit: '2026-07-06' },
  { id: 'VIS-1004', name: 'Blocked Subject', organization: 'N/A', phone: '—', email: '—', idType: 'NATIONAL_ID', idNumber: '1199*****88', visits: 0, status: 'BLACKLISTED', lastVisit: '2025-11-12' },
];

export const MOCK_VISITS: VisitRequest[] = [
  { id: 'VST-501', visitor: 'Paul Kagabo', host: 'HR Manager', site: 'HQ Main Gate', purpose: 'Contract review meeting', scheduledAt: '2026-07-08 10:00', status: 'CHECKED_IN', badge: 'BDG-7841' },
  { id: 'VST-502', visitor: 'Diane Mutoni', host: 'Finance Director', site: 'HQ Main Gate', purpose: 'Audit fieldwork', scheduledAt: '2026-07-08 11:30', status: 'APPROVED', badge: 'BDG-7842' },
  { id: 'VST-503', visitor: 'Mark Johnson', host: 'Training Dir', site: 'Training Wing', purpose: 'Programme observation', scheduledAt: '2026-07-09 08:00', status: 'PENDING' },
  { id: 'VST-504', visitor: 'Paul Kagabo', host: 'Procurement Officer', site: 'Logistics Depot', purpose: 'Supplier briefing', scheduledAt: '2026-07-07 14:00', status: 'COMPLETED', badge: 'BDG-7820' },
  { id: 'VST-505', visitor: 'Unknown Applicant', host: 'Ops Desk', site: 'HQ Main Gate', purpose: 'Unclear purpose', scheduledAt: '2026-07-08 09:00', status: 'REJECTED' },
];

export const MOCK_PENDING = MOCK_VISITS.filter((v) => v.status === 'PENDING');
export const MOCK_MY_VISITS = MOCK_VISITS.filter((v) => ['VST-501', 'VST-504'].includes(v.id));

export const MOCK_CHECKINS: CheckInLog[] = [
  { id: 'CK-01', visitId: 'VST-501', visitor: 'Paul Kagabo', site: 'HQ Main Gate', type: 'CHECK_IN', timestamp: '2026-07-08 09:52', officer: 'Gate Officer A' },
  { id: 'CK-02', visitId: 'VST-504', visitor: 'Paul Kagabo', site: 'Logistics Depot', type: 'CHECK_IN', timestamp: '2026-07-07 13:55', officer: 'Gate Officer B' },
  { id: 'CK-03', visitId: 'VST-504', visitor: 'Paul Kagabo', site: 'Logistics Depot', type: 'CHECK_OUT', timestamp: '2026-07-07 16:10', officer: 'Gate Officer B' },
];

export const MOCK_BADGES: VisitorBadge[] = [
  { id: 'BDG-7841', visitor: 'Paul Kagabo', visitId: 'VST-501', issuedAt: '2026-07-08 09:52', expiresAt: '2026-07-08 18:00', status: 'ACTIVE' },
  { id: 'BDG-7842', visitor: 'Diane Mutoni', visitId: 'VST-502', issuedAt: '2026-07-08 08:00', expiresAt: '2026-07-08 18:00', status: 'AVAILABLE' },
  { id: 'BDG-7820', visitor: 'Paul Kagabo', visitId: 'VST-504', issuedAt: '2026-07-07 13:55', expiresAt: '2026-07-07 18:00', status: 'EXPIRED' },
];

export const MOCK_BLACKLIST: BlacklistEntry[] = [
  { id: 'BL-01', name: 'Blocked Subject', reason: 'Security directive — unauthorized access attempt', addedBy: 'Security Officer', addedAt: '2025-11-12', status: 'BLACKLISTED' },
  { id: 'BL-02', name: 'Redacted Person B', reason: 'Repeated policy violations', addedBy: 'Protocol', addedAt: '2026-02-03', status: 'BLACKLISTED' },
  { id: 'BL-03', name: 'Redacted Person C', reason: 'Watchlist match', addedBy: 'Intel Desk', addedAt: '2026-05-19', status: 'BLACKLISTED' },
];
