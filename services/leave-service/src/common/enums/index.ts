export enum LeaveRequestStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum LeaveApprovalDecision {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum AccrualType {
  ANNUAL = 'ANNUAL',
  MONTHLY = 'MONTHLY',
  NONE = 'NONE',
}

export enum LeavePublishedEvent {
  REQUEST_SUBMITTED = 'leave.request.submitted',
  REQUEST_APPROVED = 'leave.request.approved',
  REQUEST_REJECTED = 'leave.request.rejected',
  REQUEST_CANCELLED = 'leave.request.cancelled',
  BALANCE_UPDATED = 'leave.balance.updated',
}
