export enum CycleType {
  ANNUAL = 'ANNUAL',
  QUARTERLY = 'QUARTERLY',
  PROBATION = 'PROBATION',
  PROJECT = 'PROJECT',
}

export enum CycleStatus {
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export enum GoalStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ReviewStatus {
  DRAFT = 'DRAFT',
  SELF_SUBMITTED = 'SELF_SUBMITTED',
  MANAGER_REVIEW = 'MANAGER_REVIEW',
  CALIBRATION = 'CALIBRATION',
  APPROVED = 'APPROVED',
  FINALIZED = 'FINALIZED',
  REJECTED = 'REJECTED',
}

export enum RatingLevel {
  EXCEEDS = 'EXCEEDS',
  MEETS = 'MEETS',
  PARTIALLY_MEETS = 'PARTIALLY_MEETS',
  BELOW = 'BELOW',
  UNSATISFACTORY = 'UNSATISFACTORY',
}

export enum PlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PerformancePublishedEvent {
  CYCLE_CREATED = 'performance.cycle.created',
  GOAL_CREATED = 'performance.goal.created',
  GOAL_COMPLETED = 'performance.goal.completed',
  REVIEW_SUBMITTED = 'performance.review.submitted',
  REVIEW_APPROVED = 'performance.review.approved',
  REVIEW_FINALIZED = 'performance.review.finalized',
  PLAN_CREATED = 'performance.plan.created',
  PLAN_ACTIVATED = 'performance.plan.activated',
  PLAN_COMPLETED = 'performance.plan.completed',
}
