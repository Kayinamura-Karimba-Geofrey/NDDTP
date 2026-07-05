export const CACHE_KEYS = {
  CALENDAR: (id: string) => `calendar:calendar:${id}`,
  CALENDARS: 'calendar:calendars:active',
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CALENDAR_CREATED: 'calendar.calendar.created',
  EVENT_SCHEDULED: 'calendar.event.scheduled',
  EVENT_CANCELLED: 'calendar.event.cancelled',
  EVENT_COMPLETED: 'calendar.event.completed',
  ATTENDEE_INVITED: 'calendar.attendee.invited',
  ATTENDEE_RESPONDED: 'calendar.attendee.responded',
} as const;

export const EVENT_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SCHEDULED', 'CANCELLED'],
  SCHEDULED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const DEFAULT_CALENDARS = [
  { code: 'CAL-HQ', name: 'HQ Master Calendar', calendarType: 'ORGANIZATIONAL' },
  { code: 'CAL-OPS', name: 'Operations Calendar', calendarType: 'DEPARTMENT' },
] as const;
