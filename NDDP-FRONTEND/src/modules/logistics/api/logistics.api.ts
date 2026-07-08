import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_LOCATIONS,
  MOCK_ROUTES,
  MOCK_SHIPMENTS,
  MOCK_TRACKING,
  type LogisticsLocation,
  type TransportRoute,
  type LogisticsShipment,
  type TrackingEvent,
  type LocationType,
  type TransportMode,
  type ShipmentPriority,
  type LogisticsStatus,
  type TrackingEventType,
} from '../constants/logistics-data';

function mapLocation(raw: Record<string, unknown>): LogisticsLocation {
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    type: ((raw.type as string) ?? 'OTHER').toUpperCase() as LocationType,
    address: (raw.address as string) ?? '—',
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as LogisticsStatus,
  };
}

function mapRoute(raw: Record<string, unknown>): TransportRoute {
  const origin = raw.originLocation as { name?: string } | undefined;
  const dest = raw.destinationLocation as { name?: string } | undefined;
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    origin: origin?.name ?? (raw.originName as string) ?? '—',
    destination: dest?.name ?? (raw.destinationName as string) ?? '—',
    transportMode: ((raw.transportMode as string) ?? 'ROAD').toUpperCase() as TransportMode,
    distanceKm: Number(raw.distanceKm ?? 0),
    estimatedHours: Number(raw.estimatedHours ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as LogisticsStatus,
  };
}

function mapShipment(raw: Record<string, unknown>): LogisticsShipment {
  const origin = raw.originLocation as { name?: string } | undefined;
  const dest = raw.destinationLocation as { name?: string } | undefined;
  const route = raw.route as { name?: string } | undefined;
  const items = raw.items as unknown[] | undefined;
  return {
    id: raw.id as string,
    shipmentNumber: (raw.shipmentNumber as string) ?? '—',
    origin: origin?.name ?? (raw.originName as string) ?? '—',
    destination: dest?.name ?? (raw.destinationName as string) ?? '—',
    route: route?.name ?? (raw.routeName as string) ?? '—',
    transportMode: ((raw.transportMode as string) ?? 'ROAD').toUpperCase() as TransportMode,
    priority: ((raw.priority as string) ?? 'ROUTINE').toUpperCase() as ShipmentPriority,
    status: ((raw.status as string) ?? 'DRAFT').toUpperCase() as LogisticsStatus,
    scheduledDate: raw.scheduledDate ? String(raw.scheduledDate).slice(0, 10) : '—',
    items: Array.isArray(items) ? items.length : Number(raw.itemCount ?? 0),
    createdBy: (raw.createdByName as string) ?? (raw.createdBy as string) ?? '—',
  };
}

function mapTracking(raw: Record<string, unknown>): TrackingEvent {
  const shipment = raw.shipment as { shipmentNumber?: string; id?: string } | undefined;
  return {
    id: raw.id as string,
    shipmentId: (raw.shipmentId as string) ?? shipment?.id ?? '',
    shipmentNumber: shipment?.shipmentNumber ?? (raw.shipmentNumber as string) ?? '—',
    eventType: ((raw.eventType as string) ?? 'CREATED').toUpperCase() as TrackingEventType,
    location: (raw.location as string) ?? '—',
    notes: (raw.notes as string) ?? '—',
    recordedAt: raw.recordedAt ? String(raw.recordedAt).replace('T', ' ').slice(0, 16) : '—',
    recordedBy: (raw.recordedByName as string) ?? (raw.recordedBy as string) ?? '—',
  };
}

export const logisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogisticsLocations: builder.query<LogisticsLocation[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_LOCATIONS };
        }
        const result = await baseQuery(serviceQuery('logistics', '/locations'));
        if (result.error) return { data: MOCK_LOCATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapLocation) };
      },
      providesTags: ['LogisticsLocations'],
    }),

    getTransportRoutes: builder.query<TransportRoute[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_ROUTES };
        }
        const result = await baseQuery(serviceQuery('logistics', '/routes'));
        if (result.error) return { data: MOCK_ROUTES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapRoute) };
      },
      providesTags: ['TransportRoutes'],
    }),

    getShipments: builder.query<LogisticsShipment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_SHIPMENTS };
        }
        const result = await baseQuery(serviceQuery('logistics', '/shipments?limit=50'));
        if (result.error) return { data: MOCK_SHIPMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapShipment) };
      },
      providesTags: ['Shipments'],
    }),

    getShipmentTracking: builder.query<TrackingEvent[], string>({
      queryFn: async (shipmentId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_TRACKING.filter((t) => t.shipmentId === shipmentId || shipmentId === 'all') };
        }
        if (shipmentId === 'all') {
          return { data: MOCK_TRACKING };
        }
        const result = await baseQuery(serviceQuery('logistics', `/tracking/shipment/${shipmentId}`));
        if (result.error) return { data: MOCK_TRACKING.filter((t) => t.shipmentId === shipmentId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapTracking) };
      },
      providesTags: ['ShipmentTracking'],
    }),
  }),
});

export const {
  useGetLogisticsLocationsQuery,
  useGetTransportRoutesQuery,
  useGetShipmentsQuery,
  useGetShipmentTrackingQuery,
} = logisticsApi;
