import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_VEHICLES,
  MOCK_ASSIGNMENTS,
  MOCK_TRIPS,
  MOCK_INSPECTIONS,
  type Vehicle,
  type VehicleAssignment,
  type TripRequest,
  type VehicleInspection,
} from '../constants/fleet-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function mapVehicle(raw: Record<string, unknown>): Vehicle {
  return {
    id: raw.id as string,
    fleetNumber: (raw.fleetNumber as string) ?? (raw.assetTag as string) ?? `FLT-${String(raw.id).slice(0, 6)}`,
    registrationNumber: (raw.registrationNumber as string) ?? (raw.plateNumber as string) ?? '—',
    vehicleType: (raw.vehicleTypeName as string) ?? (raw.type as string) ?? 'Passenger',
    make: (raw.make as string) ?? '—',
    model: (raw.model as string) ?? '—',
    year: Number(raw.year ?? raw.manufactureYear ?? 0),
    department: (raw.departmentName as string) ?? (raw.departmentId as string),
    driver: (raw.driverName as string) ?? (raw.currentDriverId as string),
    status: (raw.status as Vehicle['status']) ?? 'AVAILABLE',
    location: raw.currentLocation as string | undefined,
    vin: raw.vin as string | undefined,
    color: raw.color as string | undefined,
    odometer: Number(raw.mileage ?? raw.odometer ?? 0) || undefined,
    fuelType: raw.fuelType as string | undefined,
    condition: raw.condition as string | undefined,
  };
}

function mapAssignment(raw: Record<string, unknown>): VehicleAssignment {
  return {
    id: raw.id as string,
    vehicle: (raw.vehicleRegistration as string) ?? (raw.vehicleId as string) ?? '—',
    driver: (raw.driverName as string) ?? (raw.driverId as string) ?? '—',
    department: (raw.departmentName as string) ?? '—',
    assignmentDate: (raw.assignedAt as string) ?? (raw.createdAt as string) ?? '',
    expectedReturn: raw.expectedReturnAt as string | undefined,
    purpose: (raw.purpose as string) ?? '—',
    status: (raw.status as VehicleAssignment['status']) ?? 'ASSIGNED',
  };
}

function mapInspection(raw: Record<string, unknown>): VehicleInspection {
  return {
    id: raw.id as string,
    inspectionNumber: (raw.inspectionNumber as string) ?? `INSP-${String(raw.id).slice(0, 8)}`,
    vehicle: (raw.vehicleRegistration as string) ?? (raw.vehicleId as string) ?? '—',
    date: (raw.inspectedAt as string) ?? (raw.createdAt as string) ?? '',
    inspector: (raw.inspectorName as string) ?? (raw.inspectorId as string) ?? '—',
    result: (raw.result as VehicleInspection['result']) ?? (raw.status as VehicleInspection['result']) ?? 'PASSED',
    notes: raw.notes as string | undefined,
  };
}

export const fleetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFleetVehicles: builder.query<PaginatedResponse<Vehicle>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: paginate(MOCK_VEHICLES, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('fleet', `/vehicles?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapVehicle) } };
      },
      providesTags: ['FleetVehicles'],
    }),

    getFleetVehicle: builder.query<Vehicle | undefined, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 150));
          return { data: MOCK_VEHICLES.find((v) => v.id === id) };
        }
        const result = await baseQuery(serviceQuery('fleet', `/vehicles/${id}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>>(result.data);
        return { data: mapVehicle(raw) };
      },
      providesTags: (_r, _e, id) => [{ type: 'FleetVehicles', id }],
    }),

    getFleetAssignments: builder.query<VehicleAssignment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_ASSIGNMENTS };
        }
        const result = await baseQuery(serviceQuery('fleet', '/assignments?limit=50'));
        if (result.error) {
          return { data: MOCK_ASSIGNMENTS };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAssignment) };
      },
      providesTags: ['FleetAssignments'],
    }),

    getFleetTrips: builder.query<TripRequest[], void>({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return { data: MOCK_TRIPS };
      },
      providesTags: ['FleetTrips'],
    }),

    getFleetInspections: builder.query<VehicleInspection[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_INSPECTIONS };
        }
        const result = await baseQuery(serviceQuery('fleet', '/inspections?limit=50'));
        if (result.error) return { data: MOCK_INSPECTIONS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapInspection) };
      },
      providesTags: ['FleetInspections'],
    }),
  }),
});

export const {
  useGetFleetVehiclesQuery,
  useGetFleetVehicleQuery,
  useGetFleetAssignmentsQuery,
  useGetFleetTripsQuery,
  useGetFleetInspectionsQuery,
} = fleetApi;
