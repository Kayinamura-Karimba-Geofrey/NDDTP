export type LogisticsStatus =
  | 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'SCHEDULED' | 'DISPATCHED'
  | 'IN_TRANSIT' | 'DELAYED' | 'DELIVERED' | 'CANCELLED'
  | 'PENDING' | 'COMPLETED';

export type LocationType = 'DEPOT' | 'BASE' | 'WAREHOUSE' | 'CHECKPOINT' | 'PORT' | 'AIRFIELD' | 'OTHER';
export type TransportMode = 'ROAD' | 'AIR' | 'RAIL' | 'SEA' | 'MULTIMODAL';
export type ShipmentPriority = 'ROUTINE' | 'PRIORITY' | 'URGENT' | 'CRITICAL';
export type TrackingEventType = 'CREATED' | 'SCHEDULED' | 'DISPATCHED' | 'IN_TRANSIT' | 'CHECKPOINT' | 'DELAYED' | 'DELIVERED' | 'CANCELLED';

export interface LogisticsLocation {
  id: string;
  code: string;
  name: string;
  type: LocationType;
  address: string;
  status: LogisticsStatus;
}

export interface TransportRoute {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  transportMode: TransportMode;
  distanceKm: number;
  estimatedHours: number;
  status: LogisticsStatus;
}

export interface LogisticsShipment {
  id: string;
  shipmentNumber: string;
  origin: string;
  destination: string;
  route: string;
  transportMode: TransportMode;
  priority: ShipmentPriority;
  status: LogisticsStatus;
  scheduledDate: string;
  items: number;
  createdBy: string;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  shipmentNumber: string;
  eventType: TrackingEventType;
  location: string;
  notes: string;
  recordedAt: string;
  recordedBy: string;
}

export const LOGISTICS_DASHBOARD_KPIS = {
  activeShipments: 28,
  inTransit: 14,
  delayed: 3,
  deliveredThisMonth: 96,
  pendingDispatch: 7,
  locations: 18,
  activeRoutes: 22,
  drafts: 5,
  criticalPriority: 2,
  onTimeRate: '94%',
};

export const SHIPMENTS_BY_STATUS = [
  { name: 'Draft', value: 5 },
  { name: 'Scheduled', value: 7 },
  { name: 'Dispatched', value: 4 },
  { name: 'In Transit', value: 14 },
  { name: 'Delayed', value: 3 },
  { name: 'Delivered', value: 96 },
];

export const SHIPMENTS_BY_MODE = [
  { name: 'Road', value: 78 },
  { name: 'Air', value: 22 },
  { name: 'Rail', value: 12 },
  { name: 'Sea', value: 6 },
  { name: 'Multimodal', value: 9 },
];

export const WEEKLY_DISPATCHES = [
  { day: 'Mon', count: 8 },
  { day: 'Tue', count: 12 },
  { day: 'Wed', count: 10 },
  { day: 'Thu', count: 14 },
  { day: 'Fri', count: 9 },
  { day: 'Sat', count: 3 },
  { day: 'Sun', count: 1 },
];

export const MOCK_LOCATIONS: LogisticsLocation[] = [
  { id: 'LOC-01', code: 'HQ-DEP', name: 'HQ Central Depot', type: 'DEPOT', address: 'Kigali HQ Campus', status: 'ACTIVE' },
  { id: 'LOC-02', code: 'NTH-BASE', name: 'North Cantonment', type: 'BASE', address: 'Northern Region', status: 'ACTIVE' },
  { id: 'LOC-03', code: 'LOG-WH', name: 'Logistics Park Warehouse', type: 'WAREHOUSE', address: 'Logistics Park East', status: 'ACTIVE' },
  { id: 'LOC-04', code: 'CP-MUZ', name: 'Muzanze Checkpoint', type: 'CHECKPOINT', address: 'Muzanze Corridor', status: 'ACTIVE' },
  { id: 'LOC-05', code: 'AF-KG', name: 'Kigali Airfield Staging', type: 'AIRFIELD', address: 'Kigali International Zone', status: 'ACTIVE' },
  { id: 'LOC-06', code: 'PORT-STG', name: 'Southern Port Staging', type: 'PORT', address: 'Southern Border Hub', status: 'INACTIVE' },
];

export const MOCK_ROUTES: TransportRoute[] = [
  { id: 'RT-01', code: 'RT-HQ-NTH', name: 'HQ to North Cantonment', origin: 'HQ Central Depot', destination: 'North Cantonment', transportMode: 'ROAD', distanceKm: 118, estimatedHours: 3.5, status: 'ACTIVE' },
  { id: 'RT-02', code: 'RT-HQ-LOG', name: 'HQ to Logistics Park', origin: 'HQ Central Depot', destination: 'Logistics Park Warehouse', transportMode: 'ROAD', distanceKm: 24, estimatedHours: 0.8, status: 'ACTIVE' },
  { id: 'RT-03', code: 'RT-AIR-NTH', name: 'Airlift to North', origin: 'Kigali Airfield Staging', destination: 'North Cantonment', transportMode: 'AIR', distanceKm: 95, estimatedHours: 0.6, status: 'ACTIVE' },
  { id: 'RT-04', code: 'RT-LOG-PORT', name: 'Park to Southern Port', origin: 'Logistics Park Warehouse', destination: 'Southern Port Staging', transportMode: 'MULTIMODAL', distanceKm: 210, estimatedHours: 8, status: 'INACTIVE' },
];

export const MOCK_SHIPMENTS: LogisticsShipment[] = [
  { id: 'SH-501', shipmentNumber: 'SHP-2026-0501', origin: 'HQ Central Depot', destination: 'North Cantonment', route: 'HQ to North Cantonment', transportMode: 'ROAD', priority: 'PRIORITY', status: 'IN_TRANSIT', scheduledDate: '2026-07-08', items: 12, createdBy: 'Logistics Desk' },
  { id: 'SH-502', shipmentNumber: 'SHP-2026-0502', origin: 'HQ Central Depot', destination: 'Logistics Park Warehouse', route: 'HQ to Logistics Park', transportMode: 'ROAD', priority: 'ROUTINE', status: 'SCHEDULED', scheduledDate: '2026-07-09', items: 4, createdBy: 'You' },
  { id: 'SH-503', shipmentNumber: 'SHP-2026-0503', origin: 'Kigali Airfield Staging', destination: 'North Cantonment', route: 'Airlift to North', transportMode: 'AIR', priority: 'CRITICAL', status: 'DISPATCHED', scheduledDate: '2026-07-08', items: 2, createdBy: 'Ops Coord' },
  { id: 'SH-504', shipmentNumber: 'SHP-2026-0504', origin: 'Logistics Park Warehouse', destination: 'Muzanze Checkpoint', route: '—', transportMode: 'ROAD', priority: 'URGENT', status: 'DELAYED', scheduledDate: '2026-07-07', items: 6, createdBy: 'Warehouse Lead' },
  { id: 'SH-505', shipmentNumber: 'SHP-2026-0505', origin: 'HQ Central Depot', destination: 'Logistics Park Warehouse', route: 'HQ to Logistics Park', transportMode: 'ROAD', priority: 'ROUTINE', status: 'DELIVERED', scheduledDate: '2026-07-05', items: 8, createdBy: 'You' },
  { id: 'SH-506', shipmentNumber: 'SHP-2026-0506', origin: 'HQ Central Depot', destination: 'North Cantonment', route: 'HQ to North Cantonment', transportMode: 'ROAD', priority: 'ROUTINE', status: 'DRAFT', scheduledDate: '2026-07-12', items: 3, createdBy: 'Logistics Desk' },
  { id: 'SH-507', shipmentNumber: 'SHP-2026-0507', origin: 'Logistics Park Warehouse', destination: 'Southern Port Staging', route: 'Park to Southern Port', transportMode: 'MULTIMODAL', priority: 'PRIORITY', status: 'CANCELLED', scheduledDate: '2026-07-06', items: 10, createdBy: 'Ops Coord' },
];

export const MOCK_MY_SHIPMENTS = MOCK_SHIPMENTS.filter((s) => ['SH-502', 'SH-505'].includes(s.id));

export const MOCK_TRACKING: TrackingEvent[] = [
  { id: 'TR-01', shipmentId: 'SH-501', shipmentNumber: 'SHP-2026-0501', eventType: 'CREATED', location: 'HQ Central Depot', notes: 'Shipment created', recordedAt: '2026-07-07 08:00', recordedBy: 'Logistics Desk' },
  { id: 'TR-02', shipmentId: 'SH-501', shipmentNumber: 'SHP-2026-0501', eventType: 'SCHEDULED', location: 'HQ Central Depot', notes: 'Scheduled for dispatch', recordedAt: '2026-07-07 10:30', recordedBy: 'Dispatch' },
  { id: 'TR-03', shipmentId: 'SH-501', shipmentNumber: 'SHP-2026-0501', eventType: 'DISPATCHED', location: 'HQ Central Depot', notes: 'Vehicle assigned VH-214', recordedAt: '2026-07-08 06:15', recordedBy: 'Dispatch' },
  { id: 'TR-04', shipmentId: 'SH-501', shipmentNumber: 'SHP-2026-0501', eventType: 'CHECKPOINT', location: 'Muzanze Checkpoint', notes: 'Cleared checkpoint', recordedAt: '2026-07-08 09:40', recordedBy: 'Escort Lead' },
  { id: 'TR-05', shipmentId: 'SH-501', shipmentNumber: 'SHP-2026-0501', eventType: 'IN_TRANSIT', location: 'Northern Corridor', notes: 'En route to destination', recordedAt: '2026-07-08 10:05', recordedBy: 'Driver' },
  { id: 'TR-06', shipmentId: 'SH-504', shipmentNumber: 'SHP-2026-0504', eventType: 'DELAYED', location: 'Eastern Spur', notes: 'Road closure — ETA +4h', recordedAt: '2026-07-07 15:20', recordedBy: 'Escort Lead' },
];
