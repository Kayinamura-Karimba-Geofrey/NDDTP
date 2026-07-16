export const CACHE_KEYS = {
  PROGRAM: (id: string) => `welfare:program:${id}`,
  ACTIVE_PROGRAMS: 'welfare:programs:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  PROGRAM_CREATED: 'welfare.program.created',
  DEPENDENT_REGISTERED: 'welfare.dependent.registered',
  CLAIM_SUBMITTED: 'welfare.claim.submitted',
  CLAIM_APPROVED: 'welfare.claim.approved',
  CLAIM_REJECTED: 'welfare.claim.rejected',
  CLAIM_DISBURSED: 'welfare.claim.disbursed',
} as const;

export const CLAIM_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['UNDER_REVIEW', 'CANCELLED'],
  UNDER_REVIEW: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['DISBURSED'],
  REJECTED: [],
  DISBURSED: [],
  CANCELLED: [],
};

export const DEFAULT_PROGRAMS = [
  { code: 'HOUSING-ALLW', name: 'Housing Allowance', category: 'HOUSING', maxAmount: 5000, description: 'Monthly housing allowance for eligible personnel' },
  { code: 'HARDSHIP', name: 'Hardship Fund', category: 'EMERGENCY', maxAmount: 10000, description: 'Emergency financial assistance for personnel in hardship' },
  { code: 'EDU-GRANT', name: 'Education Grant', category: 'EDUCATION', maxAmount: 15000, description: 'Education support for dependents of personnel' },
  { code: 'MED-ASSIST', name: 'Medical Assistance', category: 'HEALTH', maxAmount: 8000, description: 'Supplementary medical expense coverage' },
  { code: 'COUNSEL', name: 'Counseling Support', category: 'COUNSELING', maxAmount: 0, description: 'Professional counseling and mental health referrals' },
  { code: 'BEREAVE', name: 'Bereavement Support', category: 'FINANCIAL', maxAmount: 3000, description: 'Financial support following bereavement of immediate family' },
] as const;
