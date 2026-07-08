import type { NavItem } from '@/types';

export const calendarNav: NavItem = {
    id: 'calendar',
    label: 'Calendar',
    path: '/calendar/dashboard',
    icon: 'FiCalendar',
    module: 'calendar',
    permissions: ['calendar:read:events'],
    children: [
      { id: 'calendar-dashboard', label: 'Dashboard', path: '/calendar/dashboard', icon: 'FiGrid', module: 'calendar' },
      { id: 'calendar-view', label: 'Calendar View', path: '/calendar/view', icon: 'FiCalendar', module: 'calendar' },
      { id: 'calendar-my-events', label: 'My Events', path: '/calendar/my-events', icon: 'FiInbox', module: 'calendar' },
      { id: 'calendar-events', label: 'All Events', path: '/calendar/events', icon: 'FiList', module: 'calendar' },
      { id: 'calendar-calendars', label: 'Calendars', path: '/calendar/calendars', icon: 'FiLayers', module: 'calendar' },
      { id: 'calendar-invitations', label: 'Invitations', path: '/calendar/invitations', icon: 'FiMail', module: 'calendar' },
      { id: 'calendar-rooms', label: 'Rooms', path: '/calendar/rooms', icon: 'FiHome', module: 'calendar' },
      { id: 'calendar-holidays', label: 'Holidays', path: '/calendar/holidays', icon: 'FiStar', module: 'calendar' },
      { id: 'calendar-reports', label: 'Reports', path: '/calendar/reports', icon: 'FiFileText', module: 'calendar' },
      { id: 'calendar-settings', label: 'Settings', path: '/calendar/settings', icon: 'FiSliders', module: 'calendar' },
    ],
  };
