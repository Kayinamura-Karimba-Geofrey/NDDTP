export const CACHE_KEYS = {
  SITE: (id: string) => `visitor:site:${id}`,
  SITES: 'visitor:sites:active',
  VISITOR: (id: string) => `visitor:visitor:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  SITE_CREATED: 'visitor.site.created',
  VISITOR_REGISTERED: 'visitor.visitor.registered',
  VISIT_SUBMITTED: 'visitor.visit.submitted',
  VISIT_APPROVED: 'visitor.visit.approved',
  VISIT_REJECTED: 'visitor.visit.rejected',
  VISIT_COMPLETED: 'visitor.visit.completed',
  CHECKIN_RECORDED: 'visitor.checkin.recorded',
} as const;

export const VISIT_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['ACTIVE', 'CANCELLED'],
  ACTIVE: ['COMPLETED', 'CANCELLED'],
  REJECTED: [],
  COMPLETED: [],
  CANCELLED: [],
};

export const DEFAULT_VISIT_SITES = [
  { code: 'GATE-MAIN', name: 'Main Gate', siteType: 'MAIN_GATE', location: 'HQ Entrance' },
  { code: 'GATE-B', name: 'Barracks Gate B', siteType: 'SECONDARY_GATE', location: 'Accommodation Zone' },
] as const;

export const DEFAULT_VISITORS = [
  { idNumber: 'VST-001', firstName: 'John', lastName: 'Smith', organization: 'Defence Contractors Ltd', idDocumentType: 'NATIONAL_ID' },
] as const;
