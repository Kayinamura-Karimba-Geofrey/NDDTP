export const CACHE_KEYS = {
  CATEGORY: (id: string) => `asset:category:${id}`,
  CATEGORIES: 'asset:categories:active',
  ASSET: (id: string) => `asset:item:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CATEGORY_CREATED: 'asset.category.created',
  ASSET_REGISTERED: 'asset.registered',
  ASSET_ASSIGNED: 'asset.assigned',
  ASSET_RETURNED: 'asset.returned',
  ASSET_TRANSFERRED: 'asset.transferred',
  ASSET_DISPOSED: 'asset.disposed',
  AUDIT_COMPLETED: 'asset.audit.completed',
} as const;

export const ASSET_STATUS_TRANSITIONS: Record<string, string[]> = {
  REGISTERED: ['AVAILABLE'],
  AVAILABLE: ['ASSIGNED', 'IN_MAINTENANCE', 'DISPOSED', 'LOST'],
  ASSIGNED: ['AVAILABLE', 'IN_MAINTENANCE', 'LOST'],
  IN_MAINTENANCE: ['AVAILABLE', 'DISPOSED'],
  DISPOSED: [],
  LOST: ['AVAILABLE'],
};

export const DEFAULT_CATEGORIES = [
  { code: 'VEH-LIGHT', name: 'Light Vehicles', type: 'VEHICLE', description: 'Cars, jeeps, light transport' },
  { code: 'VEH-HEAVY', name: 'Heavy Vehicles', type: 'VEHICLE', description: 'Trucks, armoured transport' },
  { code: 'WPN-SMALL', name: 'Small Arms', type: 'WEAPON', description: 'Rifles, pistols, sidearms' },
  { code: 'IT-COMP', name: 'Computing Equipment', type: 'IT', description: 'Laptops, desktops, servers' },
  { code: 'EQP-FIELD', name: 'Field Equipment', type: 'EQUIPMENT', description: 'Tactical and field gear' },
] as const;
