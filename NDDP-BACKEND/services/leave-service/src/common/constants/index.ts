export const CACHE_KEYS = {
  BALANCE: (userId: string, year: number) => `leave:balance:${userId}:${year}`,
  REQUEST: (id: string) => `leave:request:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  REQUEST_SUBMITTED: 'leave.request.submitted',
  REQUEST_APPROVED: 'leave.request.approved',
  REQUEST_REJECTED: 'leave.request.rejected',
  REQUEST_CANCELLED: 'leave.request.cancelled',
  BALANCE_UPDATED: 'leave.balance.updated',
} as const;

export const LEAVE_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['PENDING_APPROVAL', 'CANCELLED'],
  PENDING_APPROVAL: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: [],
  REJECTED: [],
  CANCELLED: [],
};

export const DEFAULT_LEAVE_TYPES = [
  { code: 'ANNUAL', name: 'Annual Leave', defaultDays: 30, accrualType: 'ANNUAL', requiresApproval: true, maxConsecutiveDays: 15 },
  { code: 'SICK', name: 'Sick Leave', defaultDays: 14, accrualType: 'ANNUAL', requiresApproval: true, maxConsecutiveDays: 7 },
  { code: 'MATERNITY', name: 'Maternity Leave', defaultDays: 90, accrualType: 'NONE', requiresApproval: true, maxConsecutiveDays: 90 },
  { code: 'PATERNITY', name: 'Paternity Leave', defaultDays: 14, accrualType: 'NONE', requiresApproval: true, maxConsecutiveDays: 14 },
  { code: 'COMPASSIONATE', name: 'Compassionate Leave', defaultDays: 5, accrualType: 'ANNUAL', requiresApproval: true, maxConsecutiveDays: 5 },
  { code: 'UNPAID', name: 'Unpaid Leave', defaultDays: 0, accrualType: 'NONE', requiresApproval: true, maxConsecutiveDays: 30 },
] as const;
