export enum VehicleTypeCategory {
  LIGHT = 'LIGHT',
  HEAVY = 'HEAVY',
  ARMORED = 'ARMORED',
  MOTORCYCLE = 'MOTORCYCLE',
  SPECIALIZED = 'SPECIALIZED',
}

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

export enum VehicleStatus {
  REGISTERED = 'REGISTERED',
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  IN_MAINTENANCE = 'IN_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  DECOMMISSIONED = 'DECOMMISSIONED',
}

export enum AssignmentStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

export enum TripPurpose {
  PATROL = 'PATROL',
  TRANSPORT = 'TRANSPORT',
  TRAINING = 'TRAINING',
  EMERGENCY = 'EMERGENCY',
  OTHER = 'OTHER',
}

export enum InspectionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum InspectionResult {
  PASS = 'PASS',
  FAIL = 'FAIL',
  CONDITIONAL = 'CONDITIONAL',
}

export enum FleetPublishedEvent {
  TYPE_CREATED = 'fleet.type.created',
  VEHICLE_REGISTERED = 'fleet.vehicle.registered',
  VEHICLE_ASSIGNED = 'fleet.vehicle.assigned',
  VEHICLE_RETURNED = 'fleet.vehicle.returned',
  TRIP_LOGGED = 'fleet.trip.logged',
  INSPECTION_COMPLETED = 'fleet.inspection.completed',
}
