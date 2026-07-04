export const CACHE_KEYS = {
  PERSONNEL: (id: string) => `personnel:record:${id}`,
  PERSONNEL_BY_USER: (userId: string) => `personnel:user:${userId}`,
  UNIT: (id: string) => `personnel:unit:${id}`,
  RANK: (id: string) => `personnel:rank:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  RECORD_CREATED: 'personnel.record.created',
  RECORD_UPDATED: 'personnel.record.updated',
  RECORD_SEPARATED: 'personnel.record.separated',
  RANK_PROMOTED: 'personnel.rank.promoted',
  ASSIGNMENT_CREATED: 'personnel.assignment.created',
  ASSIGNMENT_ENDED: 'personnel.assignment.ended',
  QUALIFICATION_ADDED: 'personnel.qualification.added',
  SERVICE_EVENT_RECORDED: 'personnel.service.event.recorded',
} as const;

export const RABBITMQ_QUEUES = {
  USER_EVENTS: 'personnel-service.user.events',
  USER_EVENTS_DLQ: 'personnel-service.user.events.dlq',
} as const;

export const DEFAULT_RANKS = [
  { code: 'PVT', name: 'Private', abbreviation: 'PVT', level: 1, category: 'ENLISTED' },
  { code: 'CPL', name: 'Corporal', abbreviation: 'CPL', level: 2, category: 'ENLISTED' },
  { code: 'SGT', name: 'Sergeant', abbreviation: 'SGT', level: 3, category: 'ENLISTED' },
  { code: 'SSG', name: 'Staff Sergeant', abbreviation: 'SSG', level: 4, category: 'ENLISTED' },
  { code: 'LT', name: 'Lieutenant', abbreviation: 'LT', level: 10, category: 'OFFICER' },
  { code: 'CAPT', name: 'Captain', abbreviation: 'CAPT', level: 11, category: 'OFFICER' },
  { code: 'MAJ', name: 'Major', abbreviation: 'MAJ', level: 12, category: 'OFFICER' },
  { code: 'COL', name: 'Colonel', abbreviation: 'COL', level: 14, category: 'OFFICER' },
  { code: 'GEN', name: 'General', abbreviation: 'GEN', level: 16, category: 'OFFICER' },
  { code: 'CIV1', name: 'Civilian Grade 1', abbreviation: 'CG1', level: 1, category: 'CIVILIAN' },
] as const;

export const DEFAULT_UNITS = [
  { code: 'HQ', name: 'Defence Headquarters', unitType: 'HEADQUARTERS', parentCode: null },
  { code: 'HR-DIV', name: 'Human Resources Division', unitType: 'DEPARTMENT', parentCode: 'HQ' },
  { code: 'LOG-BN', name: 'Logistics Battalion', unitType: 'BATTALION', parentCode: 'HQ' },
] as const;
