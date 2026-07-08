import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const CalendarDashboardPage = lazy(() => import('@/modules/calendar/pages/CalendarDashboardPage').then((m) => ({ default: m.CalendarDashboardPage })));
const CalendarViewPage = lazy(() => import('@/modules/calendar/pages/CalendarViewPage').then((m) => ({ default: m.CalendarViewPage })));
const CalendarMyEventsPage = lazy(() => import('@/modules/calendar/pages/CalendarMyEventsPage').then((m) => ({ default: m.CalendarMyEventsPage })));
const CalendarEventsPage = lazy(() => import('@/modules/calendar/pages/CalendarEventsPage').then((m) => ({ default: m.CalendarEventsPage })));
const CalendarCreateEventPage = lazy(() => import('@/modules/calendar/pages/CalendarCreateEventPage').then((m) => ({ default: m.CalendarCreateEventPage })));
const CalendarEventDetailPage = lazy(() => import('@/modules/calendar/pages/CalendarEventDetailPage').then((m) => ({ default: m.CalendarEventDetailPage })));
const CalendarCalendarsPage = lazy(() => import('@/modules/calendar/pages/CalendarCalendarsPage').then((m) => ({ default: m.CalendarCalendarsPage })));
const CalendarInvitationsPage = lazy(() => import('@/modules/calendar/pages/CalendarInvitationsPage').then((m) => ({ default: m.CalendarInvitationsPage })));
const CalendarAttendeesPage = lazy(() => import('@/modules/calendar/pages/CalendarAttendeesPage').then((m) => ({ default: m.CalendarAttendeesPage })));
const CalendarRoomsPage = lazy(() => import('@/modules/calendar/pages/CalendarRoomsPage').then((m) => ({ default: m.CalendarRoomsPage })));
const CalendarHolidaysPage = lazy(() => import('@/modules/calendar/pages/CalendarHolidaysPage').then((m) => ({ default: m.CalendarHolidaysPage })));
const CalendarConflictsPage = lazy(() => import('@/modules/calendar/pages/CalendarConflictsPage').then((m) => ({ default: m.CalendarConflictsPage })));
const CalendarTypesPage = lazy(() => import('@/modules/calendar/pages/CalendarTypesPage').then((m) => ({ default: m.CalendarTypesPage })));
const CalendarReportsPage = lazy(() => import('@/modules/calendar/pages/CalendarReportsPage').then((m) => ({ default: m.CalendarReportsPage })));
const CalendarSettingsPage = lazy(() => import('@/modules/calendar/pages/CalendarSettingsPage').then((m) => ({ default: m.CalendarSettingsPage })));

export const calendarRoutes: RouteObject[] = [
  { path: 'calendar', element: <Navigate to="/calendar/dashboard" replace /> },
  { path: 'calendar/dashboard', element: wrap(<CalendarDashboardPage />) },
  { path: 'calendar/view', element: wrap(<CalendarViewPage />) },
  { path: 'calendar/my-events', element: wrap(<CalendarMyEventsPage />) },
  { path: 'calendar/events', element: wrap(<CalendarEventsPage />) },
  { path: 'calendar/events/new', element: wrap(<CalendarCreateEventPage />) },
  { path: 'calendar/events/:id', element: wrap(<CalendarEventDetailPage />) },
  { path: 'calendar/calendars', element: wrap(<CalendarCalendarsPage />) },
  { path: 'calendar/invitations', element: wrap(<CalendarInvitationsPage />) },
  { path: 'calendar/attendees', element: wrap(<CalendarAttendeesPage />) },
  { path: 'calendar/rooms', element: wrap(<CalendarRoomsPage />) },
  { path: 'calendar/holidays', element: wrap(<CalendarHolidaysPage />) },
  { path: 'calendar/conflicts', element: wrap(<CalendarConflictsPage />) },
  { path: 'calendar/types', element: wrap(<CalendarTypesPage />) },
  { path: 'calendar/reports', element: wrap(<CalendarReportsPage />) },
  { path: 'calendar/settings', element: wrap(<CalendarSettingsPage />) },
];
