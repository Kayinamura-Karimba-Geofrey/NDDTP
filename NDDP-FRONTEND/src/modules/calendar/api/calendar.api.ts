import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_CALENDARS,
  MOCK_EVENTS,
  MOCK_MY_EVENTS,
  MOCK_INVITATIONS,
  MOCK_ROOMS,
  MOCK_HOLIDAYS,
  MOCK_CONFLICTS,
  type CalendarRecord,
  type CalendarEvent,
  type CalendarAttendee,
  type RoomBooking,
  type HolidayItem,
  type ConflictItem,
  type CalendarType,
  type CalendarEventType,
  type CalendarStatus,
} from '../constants/calendar-data';

function mapCalendar(raw: Record<string, unknown>): CalendarRecord {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    type: ((raw.type as string) ?? 'DEPARTMENT').toUpperCase() as CalendarType,
    owner: (raw.ownerName as string) ?? (raw.ownerId as string) ?? '—',
    eventCount: Number(raw.eventCount ?? 0),
    status: ((raw.status as string) ?? (raw.isActive ? 'ACTIVE' : 'INACTIVE')).toUpperCase() as CalendarStatus,
    description: raw.description as string | undefined,
  };
}

function mapEvent(raw: Record<string, unknown>): CalendarEvent {
  const cal = raw.calendar as { name?: string } | undefined;
  return {
    id: raw.id as string,
    title: (raw.title as string) ?? (raw.name as string) ?? '—',
    type: ((raw.eventType as string) ?? (raw.type as string) ?? 'MEETING').toUpperCase() as CalendarEventType,
    calendar: cal?.name ?? (raw.calendarName as string) ?? '—',
    startAt: (raw.startAt as string) ?? (raw.startsAt as string) ?? '',
    endAt: (raw.endAt as string) ?? (raw.endsAt as string) ?? '',
    location: raw.location as string | undefined,
    organizer: (raw.organizerName as string) ?? (raw.createdBy as string) ?? '—',
    attendees: Number(raw.attendeeCount ?? 0),
    status: ((raw.status as string) ?? 'SCHEDULED').toUpperCase() as CalendarStatus,
  };
}

function mapAttendee(raw: Record<string, unknown>): CalendarAttendee {
  const event = raw.event as { title?: string } | undefined;
  return {
    id: raw.id as string,
    event: event?.title ?? (raw.eventTitle as string) ?? '—',
    name: (raw.displayName as string) ?? (raw.userName as string) ?? '—',
    email: (raw.email as string) ?? '—',
    rsvp: ((raw.rsvpStatus as string) ?? (raw.status as string) ?? 'PENDING').toUpperCase() as CalendarStatus,
    role: (raw.role as string) ?? 'Required',
  };
}

export const calendarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getCalendars: builder.query<CalendarRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/calendars'));
        if (result.error) return { data: MOCK_CALENDARS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapCalendar) };
      },
      providesTags: ['Calendars'],
    }),

    getCalendarEvents: builder.query<CalendarEvent[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/events?limit=50'));
        if (result.error) return { data: MOCK_EVENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapEvent) };
      },
      providesTags: ['CalendarEvents'],
    }),

    getMyCalendarEvents: builder.query<CalendarEvent[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/events/me?limit=50'));
        if (result.error) return { data: MOCK_MY_EVENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapEvent) };
      },
      providesTags: ['CalendarEvents'],
    }),

    getMyInvitations: builder.query<CalendarAttendee[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/attendees/me'));
        if (result.error) return { data: MOCK_INVITATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAttendee) };
      },
      providesTags: ['CalendarAttendees'],
    }),

    getRoomBookings: builder.query<RoomBooking[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/rooms/bookings'));
        if (result.error) return { data: MOCK_ROOMS };
        const raw = unwrapApiResponse<RoomBooking[]>(result.data);
        return { data: raw };
      },
      providesTags: ['CalendarRooms'],
    }),

    getHolidays: builder.query<HolidayItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/holidays'));
        if (result.error) return { data: MOCK_HOLIDAYS };
        const raw = unwrapApiResponse<HolidayItem[]>(result.data);
        return { data: raw };
      },
      providesTags: ['CalendarHolidays'],
    }),

    getConflicts: builder.query<ConflictItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('calendar', '/conflicts'));
        if (result.error) return { data: MOCK_CONFLICTS };
        const raw = unwrapApiResponse<ConflictItem[]>(result.data);
        return { data: raw };
      },
      providesTags: ['CalendarConflicts'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createCalendar: builder.mutation<void, any>({
      query: (body) => serviceQuery('calendar', '/calendars', { method: 'POST', body }),
      invalidatesTags: ['Calendars'],
    }),

    createCalendarEvent: builder.mutation<void, any>({
      query: (body) => serviceQuery('calendar', '/events', { method: 'POST', body }),
      invalidatesTags: ['CalendarEvents', 'CalendarConflicts'],
    }),

    respondToInvitation: builder.mutation<void, { id: string; rsvp: 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' }>({
      query: ({ id, rsvp }) => serviceQuery('calendar', `/attendees/${id}/rsvp`, { method: 'POST', body: { rsvp } }),
      invalidatesTags: ['CalendarAttendees', 'CalendarEvents'],
    }),

    bookRoom: builder.mutation<void, any>({
      query: (body) => serviceQuery('calendar', '/rooms/bookings', { method: 'POST', body }),
      invalidatesTags: ['CalendarRooms'],
    }),

    createHoliday: builder.mutation<void, any>({
      query: (body) => serviceQuery('calendar', '/holidays', { method: 'POST', body }),
      invalidatesTags: ['CalendarHolidays', 'CalendarEvents'],
    }),

    resolveConflict: builder.mutation<void, { id: string; resolution: string }>({
      query: ({ id, resolution }) => serviceQuery('calendar', `/conflicts/${id}/resolve`, { method: 'POST', body: { resolution } }),
      invalidatesTags: ['CalendarConflicts', 'CalendarEvents'],
    }),
  }),
});

export const {
  useGetCalendarsQuery,
  useGetCalendarEventsQuery,
  useGetMyCalendarEventsQuery,
  useGetMyInvitationsQuery,
  useGetRoomBookingsQuery,
  useGetHolidaysQuery,
  useGetConflictsQuery,
  useCreateCalendarMutation,
  useCreateCalendarEventMutation,
  useRespondToInvitationMutation,
  useBookRoomMutation,
  useCreateHolidayMutation,
  useResolveConflictMutation,
} = calendarApi;
