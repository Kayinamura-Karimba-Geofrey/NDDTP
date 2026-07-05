export enum LocationType {
  DEPOT = 'DEPOT',
  BASE = 'BASE',
  FIELD_SITE = 'FIELD_SITE',
  MEDICAL_FACILITY = 'MEDICAL_FACILITY',
  CHECKPOINT = 'CHECKPOINT',
}

export enum LocationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum TransportMode {
  GROUND = 'GROUND',
  AIR = 'AIR',
  SEA = 'SEA',
  RAIL = 'RAIL',
}

export enum RouteStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  DISPATCHED = 'DISPATCHED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELAYED = 'DELAYED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export enum ShipmentPriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  CRITICAL = 'CRITICAL',
}

export enum TrackingEventType {
  CREATED = 'CREATED',
  SCHEDULED = 'SCHEDULED',
  DISPATCHED = 'DISPATCHED',
  IN_TRANSIT = 'IN_TRANSIT',
  LOCATION_UPDATE = 'LOCATION_UPDATE',
  DELAYED = 'DELAYED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export enum LogisticsPublishedEvent {
  LOCATION_CREATED = 'logistics.location.created',
  ROUTE_CREATED = 'logistics.route.created',
  SHIPMENT_CREATED = 'logistics.shipment.created',
  SHIPMENT_SCHEDULED = 'logistics.shipment.scheduled',
  SHIPMENT_DISPATCHED = 'logistics.shipment.dispatched',
  SHIPMENT_DELIVERED = 'logistics.shipment.delivered',
  SHIPMENT_CANCELLED = 'logistics.shipment.cancelled',
  TRACKING_UPDATED = 'logistics.tracking.updated',
}
