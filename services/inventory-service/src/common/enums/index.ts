export enum ItemCategory {
  CONSUMABLE = 'CONSUMABLE',
  SPARE_PART = 'SPARE_PART',
  AMMUNITION = 'AMMUNITION',
  MEDICAL_SUPPLY = 'MEDICAL_SUPPLY',
  UNIFORM = 'UNIFORM',
  OTHER = 'OTHER',
}

export enum UnitOfMeasure {
  EACH = 'EACH',
  BOX = 'BOX',
  KG = 'KG',
  LITER = 'LITER',
  SET = 'SET',
}

export enum WarehouseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum StockMovementType {
  RECEIPT = 'RECEIPT',
  ISSUE = 'ISSUE',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
}

export enum InventoryPublishedEvent {
  WAREHOUSE_CREATED = 'inventory.warehouse.created',
  ITEM_CREATED = 'inventory.item.created',
  STOCK_RECEIVED = 'inventory.stock.received',
  STOCK_ISSUED = 'inventory.stock.issued',
  STOCK_ADJUSTED = 'inventory.stock.adjusted',
  REQUEST_SUBMITTED = 'inventory.request.submitted',
  REQUEST_APPROVED = 'inventory.request.approved',
  REQUEST_FULFILLED = 'inventory.request.fulfilled',
}
