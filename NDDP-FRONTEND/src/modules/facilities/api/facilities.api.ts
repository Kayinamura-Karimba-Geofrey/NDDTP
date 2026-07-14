import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_TYPES,
  MOCK_FACILITIES,
  MOCK_SPACES,
  MOCK_BOOKINGS,
  MOCK_AVAILABLE_SPACES,
  MOCK_UTILITIES,
  MOCK_INSPECTIONS,
  MOCK_ACCESS,
  type FacilityTypeRecord,
  type FacilityRecord,
  type FacilitySpace,
  type SpaceBooking,
  type FacilityTypeCategory,
  type SpaceType,
  type FacilitiesStatus,
  type UtilityReading,
  type FacilityInspection,
  type AccessZone,
} from '../constants/facilities-data';

function mapType(raw: Record<string, unknown>): FacilityTypeRecord {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    category: ((raw.category as string) ?? 'OTHER').toUpperCase() as FacilityTypeCategory,
    facilityCount: Number(raw.facilityCount ?? 0),
    status: ((raw.status as string) ?? (raw.isActive ? 'ACTIVE' : 'INACTIVE')).toUpperCase() as FacilitiesStatus,
  };
}

function mapFacility(raw: Record<string, unknown>): FacilityRecord {
  const type = raw.type as { name?: string } | undefined;
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    type: type?.name ?? (raw.typeName as string) ?? '—',
    location: (raw.location as string) ?? (raw.address as string) ?? '—',
    floors: Number(raw.floors ?? raw.floorCount ?? 1),
    capacity: Number(raw.capacity ?? 0),
    occupancy: Number(raw.occupancy ?? raw.currentOccupancy ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as FacilitiesStatus,
  };
}

function mapSpace(raw: Record<string, unknown>): FacilitySpace {
  const facility = raw.facility as { name?: string } | undefined;
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    facility: facility?.name ?? (raw.facilityName as string) ?? '—',
    type: ((raw.spaceType as string) ?? (raw.type as string) ?? 'ROOM').toUpperCase() as SpaceType,
    capacity: Number(raw.capacity ?? 0),
    floor: (raw.floor as string) ?? (raw.floorLabel as string) ?? '—',
    status: ((raw.status as string) ?? 'AVAILABLE').toUpperCase() as FacilitiesStatus,
  };
}

function mapBooking(raw: Record<string, unknown>): SpaceBooking {
  const space = raw.space as { name?: string; facility?: { name?: string } } | undefined;
  return {
    id: raw.id as string,
    space: space?.name ?? (raw.spaceName as string) ?? '—',
    facility: space?.facility?.name ?? (raw.facilityName as string) ?? '—',
    requester: (raw.requesterName as string) ?? (raw.createdBy as string) ?? '—',
    purpose: (raw.purpose as string) ?? '—',
    startAt: (raw.startAt as string) ?? '',
    endAt: (raw.endAt as string) ?? '',
    attendees: Number(raw.attendeeCount ?? raw.attendees ?? 0),
    status: ((raw.status as string) ?? 'PENDING').toUpperCase() as FacilitiesStatus,
  };
}

export const facilitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getFacilityTypes: builder.query<FacilityTypeRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/types'));
        if (result.error) return { data: MOCK_TYPES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapType) };
      },
      providesTags: ['FacilityTypes'],
    }),

    getFacilitiesDirectory: builder.query<FacilityRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/facilities'));
        if (result.error) return { data: MOCK_FACILITIES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapFacility) };
      },
      providesTags: ['FacilitiesDirectory'],
    }),

    getFacilitySpaces: builder.query<FacilitySpace[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/spaces'));
        if (result.error) return { data: MOCK_SPACES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapSpace) };
      },
      providesTags: ['FacilitySpaces'],
    }),

    getAvailableSpaces: builder.query<FacilitySpace[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/spaces/available'));
        if (result.error) return { data: MOCK_AVAILABLE_SPACES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapSpace) };
      },
      providesTags: ['FacilitySpaces'],
    }),

    getSpaceBookings: builder.query<SpaceBooking[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/bookings?limit=50'));
        if (result.error) return { data: MOCK_BOOKINGS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapBooking) };
      },
      providesTags: ['SpaceBookings'],
    }),

    getFacilityUtilities: builder.query<UtilityReading[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/utilities'));
        if (result.error) return { data: MOCK_UTILITIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as UtilityReading[] };
      },
      providesTags: ['FacilityUtilities'],
    }),

    getFacilityInspections: builder.query<FacilityInspection[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/inspections'));
        if (result.error) return { data: MOCK_INSPECTIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FacilityInspection[] };
      },
      providesTags: ['FacilityInspections'],
    }),

    getFacilityAccessZones: builder.query<AccessZone[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('facilities', '/access-zones'));
        if (result.error) return { data: MOCK_ACCESS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AccessZone[] };
      },
      providesTags: ['FacilityAccess'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createFacilityType: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/types', { method: 'POST', body }),
      invalidatesTags: ['FacilityTypes'],
    }),

    createFacility: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/facilities', { method: 'POST', body }),
      invalidatesTags: ['FacilitiesDirectory'],
    }),

    createFacilitySpace: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/spaces', { method: 'POST', body }),
      invalidatesTags: ['FacilitySpaces'],
    }),

    createSpaceBooking: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/bookings', { method: 'POST', body }),
      invalidatesTags: ['SpaceBookings', 'FacilitySpaces'],
    }),

    createUtilityReading: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/utilities', { method: 'POST', body }),
      invalidatesTags: ['FacilityUtilities'],
    }),

    createFacilityInspection: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/inspections', { method: 'POST', body }),
      invalidatesTags: ['FacilityInspections'],
    }),

    createAccessZone: builder.mutation<void, any>({
      query: (body) => serviceQuery('facilities', '/access-zones', { method: 'POST', body }),
      invalidatesTags: ['FacilityAccess'],
    }),

    processSpaceBookingApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('facilities', `/bookings/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['SpaceBookings', 'FacilitySpaces'],
    }),
  }),
});

export const {
  useGetFacilityTypesQuery,
  useGetFacilitiesDirectoryQuery,
  useGetFacilitySpacesQuery,
  useGetAvailableSpacesQuery,
  useGetSpaceBookingsQuery,
  useGetFacilityUtilitiesQuery,
  useGetFacilityInspectionsQuery,
  useGetFacilityAccessZonesQuery,
  useCreateFacilityTypeMutation,
  useCreateFacilityMutation,
  useCreateFacilitySpaceMutation,
  useCreateSpaceBookingMutation,
  useCreateUtilityReadingMutation,
  useCreateFacilityInspectionMutation,
  useCreateAccessZoneMutation,
  useProcessSpaceBookingApprovalMutation,
} = facilitiesApi;
