export const CACHE_KEYS = {
  COURSE: (id: string) => `training:course:${id}`,
  ACTIVE_COURSES: 'training:courses:active',
  SESSION: (id: string) => `training:session:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  COURSE_CREATED: 'training.course.created',
  SESSION_SCHEDULED: 'training.session.scheduled',
  ENROLLMENT_SUBMITTED: 'training.enrollment.submitted',
  ENROLLMENT_APPROVED: 'training.enrollment.approved',
  ENROLLMENT_REJECTED: 'training.enrollment.rejected',
  ENROLLMENT_COMPLETED: 'training.enrollment.completed',
  ATTENDANCE_RECORDED: 'training.attendance.recorded',
  CERTIFICATION_ISSUED: 'training.certification.issued',
} as const;

export const ENROLLMENT_STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['ENROLLED', 'CANCELLED'],
  REJECTED: [],
  ENROLLED: ['IN_PROGRESS', 'WITHDRAWN', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'WITHDRAWN'],
  COMPLETED: [],
  WITHDRAWN: [],
  CANCELLED: [],
};

export const DEFAULT_COURSES = [
  { code: 'BASIC-COMBAT', name: 'Basic Combat Training', category: 'COMBAT', durationDays: 14, maxParticipants: 40, description: 'Foundational combat skills and tactics' },
  { code: 'LEAD-101', name: 'Leadership Fundamentals', category: 'LEADERSHIP', durationDays: 7, maxParticipants: 25, description: 'Core leadership principles for junior officers' },
  { code: 'TECH-MAINT', name: 'Equipment Maintenance', category: 'TECHNICAL', durationDays: 5, maxParticipants: 20, description: 'Technical maintenance and repair procedures' },
  { code: 'COMP-SEC', name: 'Security Compliance', category: 'COMPLIANCE', durationDays: 3, maxParticipants: 50, description: 'Mandatory security and compliance training' },
  { code: 'SPEC-OPS', name: 'Specialized Operations', category: 'SPECIALIZED', durationDays: 21, maxParticipants: 15, description: 'Advanced specialized operations training' },
] as const;
