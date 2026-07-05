export const CACHE_KEYS = {
  POSTING: (id: string) => `recruitment:posting:${id}`,
  PUBLISHED_POSTINGS: 'recruitment:postings:published',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  POSTING_CREATED: 'recruitment.posting.created',
  POSTING_PUBLISHED: 'recruitment.posting.published',
  POSTING_CLOSED: 'recruitment.posting.closed',
  APPLICATION_SUBMITTED: 'recruitment.application.submitted',
  APPLICATION_STATUS_CHANGED: 'recruitment.application.status.changed',
  APPLICATION_HIRED: 'recruitment.application.hired',
  INTERVIEW_SCHEDULED: 'recruitment.interview.scheduled',
  INTERVIEW_COMPLETED: 'recruitment.interview.completed',
} as const;

export const RABBITMQ_QUEUES = {
  USER_EVENTS: 'recruitment-service.user.events',
  USER_EVENTS_DLQ: 'recruitment-service.user.events.dlq',
} as const;

export const APPLICATION_STATUS_TRANSITIONS: Record<string, string[]> = {
  SUBMITTED: ['SCREENING', 'REJECTED', 'WITHDRAWN'],
  SCREENING: ['INTERVIEW', 'REJECTED', 'WITHDRAWN'],
  INTERVIEW: ['OFFERED', 'REJECTED', 'WITHDRAWN'],
  OFFERED: ['HIRED', 'REJECTED', 'WITHDRAWN'],
  HIRED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

export const DEFAULT_JOB_POSTINGS = [
  {
    referenceNumber: 'REC-2024-001',
    title: 'Administrative Officer',
    department: 'Human Resources',
    employmentType: 'FULL_TIME',
    location: 'Defence Headquarters',
    description: 'Support HR administrative operations and personnel records management.',
    requirements: ['Bachelor degree', '2+ years admin experience', 'Strong communication skills'],
    positionsAvailable: 2,
  },
  {
    referenceNumber: 'REC-2024-002',
    title: 'Logistics Coordinator',
    department: 'Logistics',
    employmentType: 'FULL_TIME',
    location: 'Logistics Battalion',
    description: 'Coordinate supply chain and inventory operations for defence units.',
    requirements: ['Supply chain experience', 'Valid driver license', 'Security clearance eligible'],
    positionsAvailable: 1,
  },
] as const;
