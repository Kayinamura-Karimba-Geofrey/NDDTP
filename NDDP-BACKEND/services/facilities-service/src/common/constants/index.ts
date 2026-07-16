export const CACHE_KEYS = {
  TYPE: (id: string) => `facilities:type:${id}`,
  TYPES: 'facilities:types:active',
  FACILITY: (id: string) => `facilities:facility:${id}`,
  FACILITIES: 'facilities:facilities:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  TYPE_CREATED: 'facilities.type.created',
  FACILITY_CREATED: 'facilities.facility.created',
  SPACE_CREATED: 'facilities.space.created',
  BOOKING_SUBMITTED: 'facilities.booking.submitted',
  BOOKING_APPROVED: 'facilities.booking.approved',
  BOOKING_REJECTED: 'facilities.booking.rejected',
  BOOKING_COMPLETED: 'facilities.booking.completed',
} as const;

export const BOOKING_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['ACTIVE', 'CANCELLED'],
  ACTIVE: ['COMPLETED', 'CANCELLED'],
  REJECTED: [],
  COMPLETED: [],
  CANCELLED: [],
};

export const DEFAULT_FACILITY_TYPES = [
  { code: 'FAC-BARR', name: 'Barracks', category: 'BARRACKS', description: 'Personnel accommodation' },
  { code: 'FAC-OFF', name: 'Administrative Office', category: 'OFFICE', description: 'Office and admin buildings' },
  { code: 'FAC-TRN', name: 'Training Facility', category: 'TRAINING', description: 'Training grounds and classrooms' },
  { code: 'FAC-MED', name: 'Medical Facility', category: 'MEDICAL', description: 'Medical and health buildings' },
] as const;

export const DEFAULT_FACILITIES = [
  { code: 'HQ-MAIN', name: 'HQ Main Building', typeCode: 'FAC-OFF', location: 'Headquarters Campus', capacity: 200 },
  { code: 'BAR-A', name: 'Barracks Block A', typeCode: 'FAC-BARR', location: 'Accommodation Zone', capacity: 120 },
] as const;
