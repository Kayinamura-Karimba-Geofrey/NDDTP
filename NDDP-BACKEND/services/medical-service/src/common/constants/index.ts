export const CACHE_KEYS = {
  FACILITY: (id: string) => `medical:facility:${id}`,
  ACTIVE_FACILITIES: 'medical:facilities:active',
  FITNESS: (userId: string) => `medical:fitness:${userId}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  FACILITY_CREATED: 'medical.facility.created',
  APPOINTMENT_SCHEDULED: 'medical.appointment.scheduled',
  APPOINTMENT_CONFIRMED: 'medical.appointment.confirmed',
  APPOINTMENT_COMPLETED: 'medical.appointment.completed',
  APPOINTMENT_CANCELLED: 'medical.appointment.cancelled',
  RECORD_CREATED: 'medical.record.created',
  FITNESS_ASSESSED: 'medical.fitness.assessed',
  CERTIFICATE_ISSUED: 'medical.certificate.issued',
  CERTIFICATE_REVOKED: 'medical.certificate.revoked',
} as const;

export const APPOINTMENT_STATUS_TRANSITIONS: Record<string, string[]> = {
  SCHEDULED: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED', 'NO_SHOW'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
};

export const DEFAULT_FACILITIES = [
  { code: 'MAIN-CLINIC', name: 'Main Base Clinic', type: 'CLINIC', location: 'HQ Medical Wing', capacity: 50 },
  { code: 'FIELD-MED', name: 'Field Medical Unit', type: 'FIELD_UNIT', location: 'Training Ground Alpha', capacity: 20 },
  { code: 'DENTAL-01', name: 'Dental Centre', type: 'DENTAL', location: 'HQ Medical Wing B', capacity: 15 },
  { code: 'MENTAL-01', name: 'Mental Health Centre', type: 'MENTAL_HEALTH', location: 'Wellness Block', capacity: 10 },
  { code: 'HOSP-01', name: 'Military Hospital', type: 'HOSPITAL', location: 'Defence Medical Complex', capacity: 200 },
] as const;
