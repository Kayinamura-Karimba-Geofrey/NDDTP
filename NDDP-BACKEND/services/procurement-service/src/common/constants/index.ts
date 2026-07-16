export const CACHE_KEYS = {
  VENDOR: (id: string) => `procurement:vendor:${id}`,
  VENDORS: 'procurement:vendors:active',
  REQUISITION: (id: string) => `procurement:requisition:${id}`,
  ORDER: (id: string) => `procurement:order:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  VENDOR_CREATED: 'procurement.vendor.created',
  REQUISITION_SUBMITTED: 'procurement.requisition.submitted',
  REQUISITION_APPROVED: 'procurement.requisition.approved',
  REQUISITION_REJECTED: 'procurement.requisition.rejected',
  ORDER_CREATED: 'procurement.order.created',
  ORDER_ISSUED: 'procurement.order.issued',
  RECEIPT_RECORDED: 'procurement.receipt.recorded',
} as const;

export const REQUISITION_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['ORDERED', 'CANCELLED'],
  REJECTED: [],
  ORDERED: [],
  CANCELLED: [],
};

export const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['ISSUED', 'CANCELLED'],
  ISSUED: ['PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'],
  PARTIALLY_RECEIVED: ['RECEIVED', 'CANCELLED'],
  RECEIVED: [],
  CANCELLED: [],
};

export const DEFAULT_VENDORS = [
  { code: 'VND-GEN', name: 'General Defence Supplies Ltd', category: 'GENERAL', contactEmail: 'orders@gds.example.mil' },
  { code: 'VND-MED', name: 'MedEquip Defence', category: 'MEDICAL', contactEmail: 'supply@medequip.example.mil' },
  { code: 'VND-IT', name: 'SecureTech Systems', category: 'IT', contactEmail: 'procurement@securetech.example.mil' },
] as const;
