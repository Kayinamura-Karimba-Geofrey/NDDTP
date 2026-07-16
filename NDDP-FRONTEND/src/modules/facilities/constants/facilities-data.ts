export type FacilitiesStatus =
  | 'ACTIVE' | 'INACTIVE' | 'UNDER_RENOVATION' | 'CLOSED'
  | 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE'
  | 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export type FacilityTypeCategory = 'BARRACKS' | 'OFFICE' | 'TRAINING' | 'MEDICAL' | 'WAREHOUSE' | 'OTHER';
export type SpaceType = 'ROOM' | 'HALL' | 'OFFICE' | 'STORAGE' | 'LAB' | 'OTHER';

export interface FacilityTypeRecord {
  id: string;
  name: string;
  category: FacilityTypeCategory;
  facilityCount: number;
  status: FacilitiesStatus;
}

export interface FacilityRecord {
  id: string;
  name: string;
  type: string;
  location: string;
  floors: number;
  capacity: number;
  occupancy: number;
  status: FacilitiesStatus;
}

export interface FacilitySpace {
  id: string;
  name: string;
  facility: string;
  type: SpaceType;
  capacity: number;
  floor: string;
  status: FacilitiesStatus;
}

export interface SpaceBooking {
  id: string;
  space: string;
  facility: string;
  requester: string;
  purpose: string;
  startAt: string;
  endAt: string;
  attendees: number;
  status: FacilitiesStatus;
}

export interface UtilityReading {
  id: string;
  facility: string;
  utility: string;
  period: string;
  consumption: string;
  cost: string;
  status: FacilitiesStatus;
}

export interface FacilityInspection {
  id: string;
  facility: string;
  type: string;
  scheduledAt: string;
  inspector: string;
  findings: string;
  status: FacilitiesStatus;
}

export interface AccessZone {
  id: string;
  name: string;
  facility: string;
  clearance: string;
  activeCredentials: number;
  status: FacilitiesStatus;
}

export const FACILITIES_DASHBOARD_KPIS = {
  totalFacilities: 36,
  activeFacilities: 31,
  spacesAvailable: 84,
  spacesOccupied: 42,
  pendingBookings: 9,
  bookingsToday: 16,
  underRenovation: 3,
  avgOccupancy: '67%',
  utilityAlerts: 2,
  inspectionsDue: 5,
};

export const FACILITIES_BY_TYPE = [
  { name: 'Office', value: 12 },
  { name: 'Barracks', value: 8 },
  { name: 'Training', value: 6 },
  { name: 'Medical', value: 4 },
  { name: 'Warehouse', value: 4 },
  { name: 'Other', value: 2 },
];

export const SPACE_STATUS_BREAKDOWN = [
  { name: 'Available', value: 84 },
  { name: 'Occupied', value: 42 },
  { name: 'Reserved', value: 18 },
  { name: 'Maintenance', value: 7 },
  { name: 'Closed', value: 3 },
];

export const WEEKLY_BOOKINGS = [
  { day: 'Mon', count: 14 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 16 },
  { day: 'Thu', count: 21 },
  { day: 'Fri', count: 12 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];

export const MOCK_TYPES: FacilityTypeRecord[] = [
  { id: 'FT-01', name: 'Headquarters Office', category: 'OFFICE', facilityCount: 8, status: 'ACTIVE' },
  { id: 'FT-02', name: 'Troop Barracks', category: 'BARRACKS', facilityCount: 8, status: 'ACTIVE' },
  { id: 'FT-03', name: 'Training Facility', category: 'TRAINING', facilityCount: 6, status: 'ACTIVE' },
  { id: 'FT-04', name: 'Medical Facility', category: 'MEDICAL', facilityCount: 4, status: 'ACTIVE' },
  { id: 'FT-05', name: 'Storage Warehouse', category: 'WAREHOUSE', facilityCount: 4, status: 'INACTIVE' },
];

export const MOCK_FACILITIES: FacilityRecord[] = [
  { id: 'FAC-01', name: 'HQ Complex', type: 'Headquarters Office', location: 'Kigali HQ Campus', floors: 5, capacity: 1200, occupancy: 820, status: 'ACTIVE' },
  { id: 'FAC-02', name: 'Barracks Block A', type: 'Troop Barracks', location: 'North Cantonment', floors: 3, capacity: 400, occupancy: 360, status: 'ACTIVE' },
  { id: 'FAC-03', name: 'Training Wing', type: 'Training Facility', location: 'Training Complex', floors: 2, capacity: 300, occupancy: 140, status: 'ACTIVE' },
  { id: 'FAC-04', name: 'Medical Block', type: 'Medical Facility', location: 'HQ Campus East', floors: 2, capacity: 80, occupancy: 45, status: 'ACTIVE' },
  { id: 'FAC-05', name: 'Depot Warehouse', type: 'Storage Warehouse', location: 'Logistics Park', floors: 1, capacity: 50, occupancy: 12, status: 'UNDER_RENOVATION' },
  { id: 'FAC-06', name: 'Annex Office B', type: 'Headquarters Office', location: 'HQ Campus West', floors: 2, capacity: 180, occupancy: 0, status: 'CLOSED' },
];

export const MOCK_SPACES: FacilitySpace[] = [
  { id: 'SPC-01', name: 'HQ Boardroom', facility: 'HQ Complex', type: 'HALL', capacity: 24, floor: '3F', status: 'AVAILABLE' },
  { id: 'SPC-02', name: 'Ops Conference Room', facility: 'HQ Complex', type: 'ROOM', capacity: 12, floor: '2F', status: 'RESERVED' },
  { id: 'SPC-03', name: 'Training Hall A', facility: 'Training Wing', type: 'HALL', capacity: 80, floor: '1F', status: 'OCCUPIED' },
  { id: 'SPC-04', name: 'Clinic Waiting Area', facility: 'Medical Block', type: 'ROOM', capacity: 30, floor: 'GF', status: 'AVAILABLE' },
  { id: 'SPC-05', name: 'Warehouse Bay 2', facility: 'Depot Warehouse', type: 'STORAGE', capacity: 0, floor: 'GF', status: 'MAINTENANCE' },
  { id: 'SPC-06', name: 'Science Lab 1', facility: 'Training Wing', type: 'LAB', capacity: 20, floor: '2F', status: 'CLOSED' },
];

export const MOCK_BOOKINGS: SpaceBooking[] = [
  { id: 'BK-401', space: 'HQ Boardroom', facility: 'HQ Complex', requester: 'COO Office', purpose: 'Leadership stand-up', startAt: '2026-07-08 09:00', endAt: '2026-07-08 09:30', attendees: 12, status: 'APPROVED' },
  { id: 'BK-402', space: 'Training Hall A', facility: 'Training Wing', requester: 'Training Dir', purpose: 'Officer induction', startAt: '2026-07-09 08:00', endAt: '2026-07-09 16:00', attendees: 48, status: 'ACTIVE' },
  { id: 'BK-403', space: 'Ops Conference Room', facility: 'HQ Complex', requester: 'You', purpose: 'Budget review workshop', startAt: '2026-07-10 13:00', endAt: '2026-07-10 16:00', attendees: 10, status: 'PENDING' },
  { id: 'BK-404', space: 'Clinic Waiting Area', facility: 'Medical Block', requester: 'Medical Admin', purpose: 'Clearance queue overflow', startAt: '2026-07-07 08:00', endAt: '2026-07-07 12:00', attendees: 20, status: 'COMPLETED' },
  { id: 'BK-405', space: 'HQ Boardroom', facility: 'HQ Complex', requester: 'Protocol', purpose: 'External delegation', startAt: '2026-07-06 10:00', endAt: '2026-07-06 12:00', attendees: 16, status: 'REJECTED' },
];

export const MOCK_MY_BOOKINGS = MOCK_BOOKINGS.filter((b) => ['BK-401', 'BK-403'].includes(b.id));
export const MOCK_AVAILABLE_SPACES = MOCK_SPACES.filter((s) => s.status === 'AVAILABLE');

export const MOCK_UTILITIES: UtilityReading[] = [
  { id: 'UT-01', facility: 'HQ Complex', utility: 'Electricity', period: 'Jun 2026', consumption: '84,200 kWh', cost: 'RWF 12.4M', status: 'ACTIVE' },
  { id: 'UT-02', facility: 'HQ Complex', utility: 'Water', period: 'Jun 2026', consumption: '1,240 m³', cost: 'RWF 1.8M', status: 'ACTIVE' },
  { id: 'UT-03', facility: 'Barracks Block A', utility: 'Electricity', period: 'Jun 2026', consumption: '52,100 kWh', cost: 'RWF 7.6M', status: 'ACTIVE' },
  { id: 'UT-04', facility: 'Training Wing', utility: 'Electricity', period: 'Jun 2026', consumption: '31,400 kWh', cost: 'RWF 4.5M', status: 'MAINTENANCE' },
];

export const MOCK_INSPECTIONS: FacilityInspection[] = [
  { id: 'INS-01', facility: 'HQ Complex', type: 'Fire Safety', scheduledAt: '2026-07-12', inspector: 'Safety Officer', findings: 'Pending', status: 'PENDING' },
  { id: 'INS-02', facility: 'Barracks Block A', type: 'Structural', scheduledAt: '2026-07-05', inspector: 'Civil Engineer', findings: 'Minor cracks — monitor', status: 'COMPLETED' },
  { id: 'INS-03', facility: 'Depot Warehouse', type: 'HSE', scheduledAt: '2026-07-15', inspector: 'HSE Desk', findings: 'Pending renovation clearance', status: 'PENDING' },
];

export const MOCK_ACCESS: AccessZone[] = [
  { id: 'AZ-01', name: 'HQ Restricted Floor', facility: 'HQ Complex', clearance: 'SECRET', activeCredentials: 42, status: 'ACTIVE' },
  { id: 'AZ-02', name: 'Ops Conference Wing', facility: 'HQ Complex', clearance: 'CONFIDENTIAL', activeCredentials: 86, status: 'ACTIVE' },
  { id: 'AZ-03', name: 'Medical Pharmacy Store', facility: 'Medical Block', clearance: 'RESTRICTED', activeCredentials: 12, status: 'ACTIVE' },
  { id: 'AZ-04', name: 'Depot Secure Cage', facility: 'Depot Warehouse', clearance: 'CONFIDENTIAL', activeCredentials: 8, status: 'INACTIVE' },
];
