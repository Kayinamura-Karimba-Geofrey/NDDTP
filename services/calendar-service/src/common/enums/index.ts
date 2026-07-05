export enum CalendarType {
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  DEPARTMENT = 'DEPARTMENT',
  PERSONAL = 'PERSONAL',
}

export enum CalendarStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CalendarEventType {
  MEETING = 'MEETING',
  TRAINING = 'TRAINING',
  CEREMONY = 'CEREMONY',
  LEAVE_BLOCK = 'LEAVE_BLOCK',
  OTHER = 'OTHER',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum RsvpStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  TENTATIVE = 'TENTATIVE',
}

export enum CalendarPublishedEvent {
  CALENDAR_CREATED = 'calendar.calendar.created',
  EVENT_SCHEDULED = 'calendar.event.scheduled',
  EVENT_CANCELLED = 'calendar.event.cancelled',
  EVENT_COMPLETED = 'calendar.event.completed',
  ATTENDEE_INVITED = 'calendar.attendee.invited',
  ATTENDEE_RESPONDED = 'calendar.attendee.responded',
}
