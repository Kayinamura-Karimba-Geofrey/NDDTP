export const CACHE_KEYS = {
  WAREHOUSE: (id: string) => `inventory:warehouse:${id}`,
  WAREHOUSES: 'inventory:warehouses:active',
  ITEM: (id: string) => `inventory:item:${id}`,
  STOCK: (warehouseId: string, itemId: string) => `inventory:stock:${warehouseId}:${itemId}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  WAREHOUSE_CREATED: 'inventory.warehouse.created',
  ITEM_CREATED: 'inventory.item.created',
  STOCK_RECEIVED: 'inventory.stock.received',
  STOCK_ISSUED: 'inventory.stock.issued',
  STOCK_ADJUSTED: 'inventory.stock.adjusted',
  REQUEST_SUBMITTED: 'inventory.request.submitted',
  REQUEST_APPROVED: 'inventory.request.approved',
  REQUEST_FULFILLED: 'inventory.request.fulfilled',
} as const;

export const REQUEST_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['FULFILLED', 'CANCELLED'],
  REJECTED: [],
  FULFILLED: [],
  CANCELLED: [],
};

export const DEFAULT_WAREHOUSES = [
  { code: 'WH-HQ', name: 'HQ Central Warehouse', location: 'Headquarters Supply Depot' },
  { code: 'WH-FIELD', name: 'Field Supply Depot', location: 'Training Ground Alpha' },
  { code: 'WH-MED', name: 'Medical Supply Store', location: 'Medical Wing Storage' },
] as const;

export const DEFAULT_ITEMS = [
  { sku: 'UNI-COMBAT', name: 'Combat Uniform Set', category: 'UNIFORM', unit: 'SET', reorderLevel: 50 },
  { sku: 'MED-FAK', name: 'First Aid Kit', category: 'MEDICAL_SUPPLY', unit: 'EACH', reorderLevel: 100 },
  { sku: 'SPARE-FILTER', name: 'Engine Air Filter', category: 'SPARE_PART', unit: 'EACH', reorderLevel: 20 },
  { sku: 'CONS-RATION', name: 'Field Ration Pack', category: 'CONSUMABLE', unit: 'BOX', reorderLevel: 200 },
] as const;
