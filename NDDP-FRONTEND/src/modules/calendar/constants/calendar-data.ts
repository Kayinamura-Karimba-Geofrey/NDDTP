export type CalendarStatus =
  | 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'SCHEDULED' | 'CANCELLED' | 'COMPLETED'
  | 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'AVAILABLE' | 'BUSY' | 'CONFLICT' | 'RESOLVED';

export type CalendarType = 'ORGANIZATIONAL' | 'DEPARTMENT' | 'PERSONAL';
export type CalendarEventType = 'MEETING' | 'TRAINING' | 'CEREMONY' | 'LEAVE_BLOCK' | 'OTHER';

export interface CalendarRecord {
  id: string;
  name: string;
  type: CalendarType;
  owner: string;
  eventCount: number;
  status: CalendarStatus;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  calendar: string;
  startAt: string;
  endAt: string;
  location?: string;
  organizer: string;
  attendees: number;
  status: CalendarStatus;
}

export interface CalendarAttendee {
  id: string;
  event: string;
  name: string;
  email: string;
  rsvp: CalendarStatus;
  role: string;
}

export interface RoomBooking {
  id: string;
  room: string;
  event: string;
  date: string;
  time: string;
  capacity: number;
  status: CalendarStatus;
}

export interface HolidayItem {
  id: string;
  name: string;
  date: string;
  type: string;
  status: CalendarStatus;
}

export interface ConflictItem {
  id: string;
  eventA: string;
  eventB: string;
  user: string;
  overlap: string;
  status: CalendarStatus;
}

export const CALENDAR_DASHBOARD_KPIS = {
  totalCalendars: 48,
  myEvents: 12,
  upcomingThisWeek: 27,
  pendingInvites: 5,
  meetingsToday: 4,
  trainingsThisMonth: 9,
  roomBookings: 14,
  conflicts: 2,
  completedThisMonth: 36,
  cancelledThisMonth: 3,
};

export const EVENTS_BY_TYPE = [
  { name: 'Meeting', value: 84 },
  { name: 'Training', value: 42 },
  { name: 'Ceremony', value: 8 },
  { name: 'Leave Block', value: 56 },
  { name: 'Other', value: 18 },
];

export const WEEKLY_EVENT_VOLUME = [
  { day: 'Mon', count: 18 },
  { day: 'Tue', count: 24 },
  { day: 'Wed', count: 21 },
  { day: 'Thu', count: 27 },
  { day: 'Fri', count: 19 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 2 },
];

export const EVENT_STATUS_BREAKDOWN = [
  { name: 'Scheduled', value: 112 },
  { name: 'Draft', value: 14 },
  { name: 'Completed', value: 68 },
  { name: 'Cancelled', value: 9 },
];

export const MOCK_CALENDARS: CalendarRecord[] = [
  { id: 'CAL-01', name: 'Organization Calendar', type: 'ORGANIZATIONAL', owner: 'Admin', eventCount: 128, status: 'ACTIVE', description: 'Org-wide events and ceremonies' },
  { id: 'CAL-02', name: 'HR Department', type: 'DEPARTMENT', owner: 'HR Ops', eventCount: 42, status: 'ACTIVE' },
  { id: 'CAL-03', name: 'Training Directorate', type: 'DEPARTMENT', owner: 'Training Dir', eventCount: 56, status: 'ACTIVE' },
  { id: 'CAL-04', name: 'My Personal Calendar', type: 'PERSONAL', owner: 'You', eventCount: 12, status: 'ACTIVE' },
  { id: 'CAL-05', name: 'Finance Division', type: 'DEPARTMENT', owner: 'Finance', eventCount: 18, status: 'INACTIVE' },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'EVT-101', title: 'Leadership Stand-up', type: 'MEETING', calendar: 'Organization Calendar', startAt: '2026-07-08 09:00', endAt: '2026-07-08 09:30', location: 'HQ Boardroom', organizer: 'COO Office', attendees: 12, status: 'SCHEDULED' },
  { id: 'EVT-102', title: 'Officer Induction Course', type: 'TRAINING', calendar: 'Training Directorate', startAt: '2026-07-09 08:00', endAt: '2026-07-09 16:00', location: 'Training Wing A', organizer: 'Training Dir', attendees: 28, status: 'SCHEDULED' },
  { id: 'EVT-103', title: 'Liberation Day Ceremony', type: 'CEREMONY', calendar: 'Organization Calendar', startAt: '2026-07-04 10:00', endAt: '2026-07-04 12:00', location: 'Parade Ground', organizer: 'Protocol', attendees: 420, status: 'COMPLETED' },
  { id: 'EVT-104', title: 'Leave Block — Col. Nsengimana', type: 'LEAVE_BLOCK', calendar: 'HR Department', startAt: '2026-07-14 00:00', endAt: '2026-07-18 23:59', organizer: 'HR Ops', attendees: 1, status: 'SCHEDULED' },
  { id: 'EVT-105', title: 'Budget Review Workshop', type: 'MEETING', calendar: 'Finance Division', startAt: '2026-07-10 13:00', endAt: '2026-07-10 16:00', location: 'Finance Conf Room', organizer: 'CFO', attendees: 16, status: 'DRAFT' },
  { id: 'EVT-106', title: 'Medical Board Session', type: 'MEETING', calendar: 'My Personal Calendar', startAt: '2026-07-08 14:00', endAt: '2026-07-08 15:30', location: 'Clinic Boardroom', organizer: 'You', attendees: 6, status: 'CANCELLED' },
];

export const MOCK_MY_EVENTS = MOCK_EVENTS.filter((e) =>
  ['EVT-101', 'EVT-102', 'EVT-104', 'EVT-106'].includes(e.id),
);

export const MOCK_ATTENDEES: CalendarAttendee[] = [
  { id: 'ATT-01', event: 'Leadership Stand-up', name: 'Alice Uwimana', email: 'alice@mod.gov.rw', rsvp: 'ACCEPTED', role: 'Required' },
  { id: 'ATT-02', event: 'Leadership Stand-up', name: 'Jean Bizimana', email: 'jean@mod.gov.rw', rsvp: 'TENTATIVE', role: 'Optional' },
  { id: 'ATT-03', event: 'Officer Induction Course', name: 'Claire Mukamana', email: 'claire@mod.gov.rw', rsvp: 'PENDING', role: 'Required' },
  { id: 'ATT-04', event: 'Budget Review Workshop', name: 'Eric Habimana', email: 'eric@mod.gov.rw', rsvp: 'DECLINED', role: 'Required' },
];

export const MOCK_INVITATIONS: CalendarAttendee[] = [
  { id: 'INV-01', event: 'Leadership Stand-up', name: 'You', email: 'admin@mod.gov.rw', rsvp: 'PENDING', role: 'Required' },
  { id: 'INV-02', event: 'Officer Induction Course', name: 'You', email: 'admin@mod.gov.rw', rsvp: 'PENDING', role: 'Optional' },
  { id: 'INV-03', event: 'Budget Review Workshop', name: 'You', email: 'admin@mod.gov.rw', rsvp: 'ACCEPTED', role: 'Required' },
];

export const MOCK_ROOMS: RoomBooking[] = [
  { id: 'RM-01', room: 'HQ Boardroom', event: 'Leadership Stand-up', date: '2026-07-08', time: '09:00–09:30', capacity: 20, status: 'BUSY' },
  { id: 'RM-02', room: 'Training Wing A', event: 'Officer Induction Course', date: '2026-07-09', time: '08:00–16:00', capacity: 40, status: 'BUSY' },
  { id: 'RM-03', room: 'Finance Conf Room', event: 'Budget Review Workshop', date: '2026-07-10', time: '13:00–16:00', capacity: 18, status: 'AVAILABLE' },
];

export const MOCK_HOLIDAYS: HolidayItem[] = [
  { id: 'HOL-01', name: 'Liberation Day', date: '2026-07-04', type: 'National', status: 'ACTIVE' },
  { id: 'HOL-02', name: 'Assumption Day', date: '2026-08-15', type: 'National', status: 'ACTIVE' },
  { id: 'HOL-03', name: 'Organizational Founders Day', date: '2026-09-12', type: 'Organizational', status: 'ACTIVE' },
];

export const MOCK_CONFLICTS: ConflictItem[] = [
  { id: 'CF-01', eventA: 'Leadership Stand-up', eventB: 'Medical Board Session', user: 'You', overlap: '09:00–09:30 vs 14:00 cancelled', status: 'RESOLVED' },
  { id: 'CF-02', eventA: 'Officer Induction Course', eventB: 'Fleet Inspection Brief', user: 'Training Facilitator', overlap: '08:00–10:00', status: 'CONFLICT' },
];

export const MONTH_GRID = [
  { day: 1, events: 0 }, { day: 2, events: 1 }, { day: 3, events: 0 }, { day: 4, events: 2 },
  { day: 5, events: 1 }, { day: 6, events: 0 }, { day: 7, events: 1 }, { day: 8, events: 3 },
  { day: 9, events: 2 }, { day: 10, events: 1 }, { day: 11, events: 0 }, { day: 12, events: 1 },
  { day: 13, events: 0 }, { day: 14, events: 1 }, { day: 15, events: 0 }, { day: 16, events: 2 },
  { day: 17, events: 1 }, { day: 18, events: 0 }, { day: 19, events: 1 }, { day: 20, events: 0 },
  { day: 21, events: 1 }, { day: 22, events: 2 }, { day: 23, events: 0 }, { day: 24, events: 1 },
  { day: 25, events: 0 }, { day: 26, events: 1 }, { day: 27, events: 2 }, { day: 28, events: 0 },
  { day: 29, events: 1 }, { day: 30, events: 0 }, { day: 31, events: 1 },
];
