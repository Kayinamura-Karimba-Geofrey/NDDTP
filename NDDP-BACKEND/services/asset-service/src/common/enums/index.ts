export enum AssetType {
  EQUIPMENT = 'EQUIPMENT',
  VEHICLE = 'VEHICLE',
  WEAPON = 'WEAPON',
  IT = 'IT',
  FURNITURE = 'FURNITURE',
  OTHER = 'OTHER',
}

export enum AssetStatus {
  REGISTERED = 'REGISTERED',
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  IN_MAINTENANCE = 'IN_MAINTENANCE',
  DISPOSED = 'DISPOSED',
  LOST = 'LOST',
}

export enum AssignmentStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
}

export enum MovementType {
  ASSIGNMENT = 'ASSIGNMENT',
  RETURN = 'RETURN',
  TRANSFER = 'TRANSFER',
  DISPOSAL = 'DISPOSAL',
  MAINTENANCE = 'MAINTENANCE',
}

export enum AuditStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum AuditResult {
  VERIFIED = 'VERIFIED',
  MISSING = 'MISSING',
  DAMAGED = 'DAMAGED',
  DISCREPANCY = 'DISCREPANCY',
}

export enum AssetPublishedEvent {
  CATEGORY_CREATED = 'asset.category.created',
  ASSET_REGISTERED = 'asset.registered',
  ASSET_ASSIGNED = 'asset.assigned',
  ASSET_RETURNED = 'asset.returned',
  ASSET_TRANSFERRED = 'asset.transferred',
  ASSET_DISPOSED = 'asset.disposed',
  AUDIT_COMPLETED = 'asset.audit.completed',
}
