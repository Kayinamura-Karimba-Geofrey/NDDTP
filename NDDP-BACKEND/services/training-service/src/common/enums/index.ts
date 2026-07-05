export enum CourseCategory {
  COMBAT = 'COMBAT',
  LEADERSHIP = 'LEADERSHIP',
  TECHNICAL = 'TECHNICAL',
  COMPLIANCE = 'COMPLIANCE',
  SPECIALIZED = 'SPECIALIZED',
}

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ENROLLED = 'ENROLLED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  WITHDRAWN = 'WITHDRAWN',
  CANCELLED = 'CANCELLED',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum CertificationStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}

export enum TrainingPublishedEvent {
  COURSE_CREATED = 'training.course.created',
  SESSION_SCHEDULED = 'training.session.scheduled',
  ENROLLMENT_SUBMITTED = 'training.enrollment.submitted',
  ENROLLMENT_APPROVED = 'training.enrollment.approved',
  ENROLLMENT_REJECTED = 'training.enrollment.rejected',
  ENROLLMENT_COMPLETED = 'training.enrollment.completed',
  ATTENDANCE_RECORDED = 'training.attendance.recorded',
  CERTIFICATION_ISSUED = 'training.certification.issued',
}
