export enum JobPostingStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  SCREENING = 'SCREENING',
  INTERVIEW = 'INTERVIEW',
  OFFERED = 'OFFERED',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum InterviewType {
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
  IN_PERSON = 'IN_PERSON',
  PANEL = 'PANEL',
}

export enum RecruitmentPublishedEvent {
  POSTING_CREATED = 'recruitment.posting.created',
  POSTING_PUBLISHED = 'recruitment.posting.published',
  POSTING_CLOSED = 'recruitment.posting.closed',
  APPLICATION_SUBMITTED = 'recruitment.application.submitted',
  APPLICATION_STATUS_CHANGED = 'recruitment.application.status.changed',
  APPLICATION_HIRED = 'recruitment.application.hired',
  INTERVIEW_SCHEDULED = 'recruitment.interview.scheduled',
  INTERVIEW_COMPLETED = 'recruitment.interview.completed',
}
