export enum VendorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum VendorCategory {
  GENERAL = 'GENERAL',
  MEDICAL = 'MEDICAL',
  IT = 'IT',
  CONSTRUCTION = 'CONSTRUCTION',
  UNIFORM = 'UNIFORM',
  VEHICLE = 'VEHICLE',
}

export enum RequisitionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ORDERED = 'ORDERED',
  CANCELLED = 'CANCELLED',
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

export enum ProcurementPriority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  CRITICAL = 'CRITICAL',
}

export enum ReceiptStatus {
  COMPLETED = 'COMPLETED',
  VOIDED = 'VOIDED',
}

export enum ProcurementPublishedEvent {
  VENDOR_CREATED = 'procurement.vendor.created',
  REQUISITION_SUBMITTED = 'procurement.requisition.submitted',
  REQUISITION_APPROVED = 'procurement.requisition.approved',
  REQUISITION_REJECTED = 'procurement.requisition.rejected',
  ORDER_CREATED = 'procurement.order.created',
  ORDER_ISSUED = 'procurement.order.issued',
  RECEIPT_RECORDED = 'procurement.receipt.recorded',
}
