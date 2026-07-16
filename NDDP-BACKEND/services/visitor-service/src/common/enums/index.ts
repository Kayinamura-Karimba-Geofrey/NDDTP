export enum SiteType {
  MAIN_GATE = 'MAIN_GATE',
  SECONDARY_GATE = 'SECONDARY_GATE',
  BUILDING = 'BUILDING',
  RESTRICTED = 'RESTRICTED',
  OTHER = 'OTHER',
}

export enum SiteStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED',
}

export enum VisitorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLACKLISTED = 'BLACKLISTED',
}

export enum IdDocumentType {
  NATIONAL_ID = 'NATIONAL_ID',
  PASSPORT = 'PASSPORT',
  MILITARY_ID = 'MILITARY_ID',
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  OTHER = 'OTHER',
}

export enum VisitStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum CheckInType {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
}

export enum VisitorPublishedEvent {
  SITE_CREATED = 'visitor.site.created',
  VISITOR_REGISTERED = 'visitor.visitor.registered',
  VISIT_SUBMITTED = 'visitor.visit.submitted',
  VISIT_APPROVED = 'visitor.visit.approved',
  VISIT_REJECTED = 'visitor.visit.rejected',
  VISIT_COMPLETED = 'visitor.visit.completed',
  CHECKIN_RECORDED = 'visitor.checkin.recorded',
}
