export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  EMERGENCY = 'EMERGENCY',
  INSPECTION = 'INSPECTION',
}

export enum AssetReferenceType {
  VEHICLE = 'VEHICLE',
  FACILITY = 'FACILITY',
  EQUIPMENT = 'EQUIPMENT',
  OTHER = 'OTHER',
}

export enum MaintenancePriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  CRITICAL = 'CRITICAL',
}

export enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum WorkOrderStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export enum MaintenancePublishedEvent {
  CATEGORY_CREATED = 'maintenance.category.created',
  REQUEST_SUBMITTED = 'maintenance.request.submitted',
  REQUEST_APPROVED = 'maintenance.request.approved',
  REQUEST_REJECTED = 'maintenance.request.rejected',
  WORKORDER_CREATED = 'maintenance.workorder.created',
  WORKORDER_STARTED = 'maintenance.workorder.started',
  WORKORDER_COMPLETED = 'maintenance.workorder.completed',
  TASK_COMPLETED = 'maintenance.task.completed',
}
