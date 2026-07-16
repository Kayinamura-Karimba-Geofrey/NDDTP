export const CACHE_KEYS = {
  TYPE: (id: string) => `fleet:type:${id}`,
  TYPES: 'fleet:types:active',
  VEHICLE: (id: string) => `fleet:vehicle:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  TYPE_CREATED: 'fleet.type.created',
  VEHICLE_REGISTERED: 'fleet.vehicle.registered',
  VEHICLE_ASSIGNED: 'fleet.vehicle.assigned',
  VEHICLE_RETURNED: 'fleet.vehicle.returned',
  TRIP_LOGGED: 'fleet.trip.logged',
  INSPECTION_COMPLETED: 'fleet.inspection.completed',
} as const;

export const VEHICLE_STATUS_TRANSITIONS: Record<string, string[]> = {
  REGISTERED: ['AVAILABLE', 'OUT_OF_SERVICE'],
  AVAILABLE: ['ASSIGNED', 'IN_MAINTENANCE', 'OUT_OF_SERVICE', 'DECOMMISSIONED'],
  ASSIGNED: ['AVAILABLE', 'IN_MAINTENANCE', 'OUT_OF_SERVICE'],
  IN_MAINTENANCE: ['AVAILABLE', 'OUT_OF_SERVICE', 'DECOMMISSIONED'],
  OUT_OF_SERVICE: ['AVAILABLE', 'IN_MAINTENANCE', 'DECOMMISSIONED'],
  DECOMMISSIONED: [],
};

export const DEFAULT_VEHICLE_TYPES = [
  { code: 'VLT-JEEP', name: 'Light Jeep', category: 'LIGHT', description: 'Light utility jeep' },
  { code: 'VHV-TRUCK', name: 'Heavy Transport Truck', category: 'HEAVY', description: 'Heavy cargo transport' },
  { code: 'VAR-APC', name: 'Armoured Personnel Carrier', category: 'ARMORED', description: 'Armoured troop transport' },
  { code: 'VMC-MOTO', name: 'Patrol Motorcycle', category: 'MOTORCYCLE', description: 'Light patrol motorcycle' },
] as const;
