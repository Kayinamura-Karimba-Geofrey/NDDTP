export enum ProgramCategory {
  FINANCIAL = 'FINANCIAL',
  HOUSING = 'HOUSING',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  COUNSELING = 'COUNSELING',
  EMERGENCY = 'EMERGENCY',
}

export enum ProgramStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DISBURSED = 'DISBURSED',
  CANCELLED = 'CANCELLED',
}

export enum DependentRelationship {
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  PARENT = 'PARENT',
  SIBLING = 'SIBLING',
  OTHER = 'OTHER',
}

export enum DisbursementStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export enum WelfarePublishedEvent {
  PROGRAM_CREATED = 'welfare.program.created',
  DEPENDENT_REGISTERED = 'welfare.dependent.registered',
  CLAIM_SUBMITTED = 'welfare.claim.submitted',
  CLAIM_APPROVED = 'welfare.claim.approved',
  CLAIM_REJECTED = 'welfare.claim.rejected',
  CLAIM_DISBURSED = 'welfare.claim.disbursed',
}
