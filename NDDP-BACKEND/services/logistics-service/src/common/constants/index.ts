export const CACHE_KEYS = {
  LOCATION: (id: string) => `logistics:location:${id}`,
  LOCATIONS: 'logistics:locations:active',
  ROUTE: (id: string) => `logistics:route:${id}`,
  ROUTES: 'logistics:routes:active',
  SHIPMENT: (id: string) => `logistics:shipment:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  LOCATION_CREATED: 'logistics.location.created',
  ROUTE_CREATED: 'logistics.route.created',
  SHIPMENT_CREATED: 'logistics.shipment.created',
  SHIPMENT_SCHEDULED: 'logistics.shipment.scheduled',
  SHIPMENT_DISPATCHED: 'logistics.shipment.dispatched',
  SHIPMENT_DELIVERED: 'logistics.shipment.delivered',
  SHIPMENT_CANCELLED: 'logistics.shipment.cancelled',
  TRACKING_UPDATED: 'logistics.tracking.updated',
} as const;

export const SHIPMENT_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SCHEDULED', 'CANCELLED'],
  SCHEDULED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['IN_TRANSIT', 'FAILED', 'CANCELLED'],
  IN_TRANSIT: ['DELIVERED', 'DELAYED', 'FAILED'],
  DELAYED: ['IN_TRANSIT', 'DELIVERED', 'FAILED'],
  DELIVERED: [],
  CANCELLED: [],
  FAILED: [],
};

export const DEFAULT_LOCATIONS = [
  { code: 'LOC-HQ', name: 'HQ Central Depot', type: 'DEPOT', address: 'Headquarters Supply Depot' },
  { code: 'LOC-FIELD', name: 'Field Alpha Base', type: 'FIELD_SITE', address: 'Training Ground Alpha' },
  { code: 'LOC-MED', name: 'Medical Wing', type: 'MEDICAL_FACILITY', address: 'Medical Facility Storage' },
  { code: 'LOC-NORTH', name: 'Northern Checkpoint', type: 'CHECKPOINT', address: 'Northern Sector Gate' },
] as const;

export const DEFAULT_ROUTES = [
  { code: 'RT-HQ-FIELD', name: 'HQ to Field Alpha', originCode: 'LOC-HQ', destCode: 'LOC-FIELD', mode: 'GROUND', distanceKm: 45, estimatedHours: 2 },
  { code: 'RT-HQ-MED', name: 'HQ to Medical Wing', originCode: 'LOC-HQ', destCode: 'LOC-MED', mode: 'GROUND', distanceKm: 5, estimatedHours: 0.5 },
] as const;
