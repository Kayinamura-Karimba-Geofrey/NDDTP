import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_VEHICLES,
  MOCK_ASSIGNMENTS,
  MOCK_TRIPS,
  MOCK_INSPECTIONS,
  MOCK_DRIVERS,
  MOCK_LICENSES,
  MOCK_FUEL,
  MOCK_MAINTENANCE,
  MOCK_INCIDENTS,
  MOCK_PARKING,
  MOCK_APPROVALS,
  MOCK_HISTORY,
  MOCK_CALENDAR_EVENTS,
  type Vehicle,
  type VehicleAssignment,
  type TripRequest,
  type VehicleInspection,
  type Driver,
  type DriverLicense,
  type FuelTransaction,
  type MaintenanceOrder,
  type FleetIncident,
  type ParkingSlot,
  type FleetApproval,
} from '../constants/fleet-data';

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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getFleetVehicles: builder.query<PaginatedResponse<Vehicle>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('fleet', `/vehicles?${qs}`));
        if (result.error) return { data: paginate(MOCK_VEHICLES, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapVehicle) } };
      },
      providesTags: ['FleetVehicles'],
    }),

    getFleetVehicle: builder.query<Vehicle | undefined, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', `/vehicles/${id}`));
        if (result.error) return { data: MOCK_VEHICLES.find((v) => v.id === id) };
        const raw = unwrapApiResponse<Record<string, unknown>>(result.data);
        return { data: mapVehicle(raw) };
      },
      providesTags: (_r, _e, id) => [{ type: 'FleetVehicles', id }],
    }),

    getFleetAssignments: builder.query<VehicleAssignment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/assignments?limit=50'));
        if (result.error) return { data: MOCK_ASSIGNMENTS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAssignment) };
      },
      providesTags: ['FleetAssignments'],
    }),

    getFleetTrips: builder.query<TripRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/trips'));
        if (result.error) return { data: MOCK_TRIPS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TripRequest[] };
      },
      providesTags: ['FleetTrips'],
    }),

    getFleetInspections: builder.query<VehicleInspection[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/inspections?limit=50'));
        if (result.error) return { data: MOCK_INSPECTIONS };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapInspection) };
      },
      providesTags: ['FleetInspections'],
    }),

    getFleetDrivers: builder.query<Driver[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/drivers'));
        if (result.error) return { data: MOCK_DRIVERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as Driver[] };
      },
      providesTags: ['FleetDrivers'],
    }),

    getFleetLicenses: builder.query<DriverLicense[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/licenses'));
        if (result.error) return { data: MOCK_LICENSES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as DriverLicense[] };
      },
      providesTags: ['FleetLicenses'],
    }),

    getFleetFuelTransactions: builder.query<FuelTransaction[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/fuel-transactions'));
        if (result.error) return { data: MOCK_FUEL };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FuelTransaction[] };
      },
      providesTags: ['FleetFuel'],
    }),

    getFleetMaintenance: builder.query<MaintenanceOrder[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/maintenance-orders'));
        if (result.error) return { data: MOCK_MAINTENANCE };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MaintenanceOrder[] };
      },
      providesTags: ['FleetMaintenance'],
    }),

    getFleetIncidents: builder.query<FleetIncident[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/incidents'));
        if (result.error) return { data: MOCK_INCIDENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FleetIncident[] };
      },
      providesTags: ['FleetIncidents'],
    }),

    getFleetParking: builder.query<ParkingSlot[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/parking-slots'));
        if (result.error) return { data: MOCK_PARKING };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ParkingSlot[] };
      },
      providesTags: ['FleetParking'],
    }),

    getFleetApprovals: builder.query<FleetApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/approvals'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as FleetApproval[] };
      },
      providesTags: ['FleetApprovals'],
    }),

    getFleetHistory: builder.query<any[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/history'));
        if (result.error) return { data: MOCK_HISTORY };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FleetHistory'],
    }),

    getFleetCalendarEvents: builder.query<any[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('fleet', '/calendar-events'));
        if (result.error) return { data: MOCK_CALENDAR_EVENTS };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FleetCalendar'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createVehicle: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/vehicles', { method: 'POST', body }),
      invalidatesTags: ['FleetVehicles'],
    }),

    createDriver: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/drivers', { method: 'POST', body }),
      invalidatesTags: ['FleetDrivers'],
    }),

    createLicense: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/licenses', { method: 'POST', body }),
      invalidatesTags: ['FleetLicenses'],
    }),

    createAssignment: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/assignments', { method: 'POST', body }),
      invalidatesTags: ['FleetAssignments', 'FleetVehicles'],
    }),

    createTrip: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/trips', { method: 'POST', body }),
      invalidatesTags: ['FleetTrips'],
    }),

    recordFuelTransaction: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/fuel-transactions', { method: 'POST', body }),
      invalidatesTags: ['FleetFuel'],
    }),

    createMaintenanceOrder: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/maintenance-orders', { method: 'POST', body }),
      invalidatesTags: ['FleetMaintenance', 'FleetVehicles'],
    }),

    recordInspection: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/inspections', { method: 'POST', body }),
      invalidatesTags: ['FleetInspections', 'FleetVehicles'],
    }),

    recordIncident: builder.mutation<void, any>({
      query: (body) => serviceQuery('fleet', '/incidents', { method: 'POST', body }),
      invalidatesTags: ['FleetIncidents'],
    }),

    processFleetApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('fleet', `/approvals/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['FleetApprovals', 'FleetTrips', 'FleetAssignments', 'FleetMaintenance'],
    }),
  }),
});

export const {
  useGetFleetVehiclesQuery,
  useGetFleetVehicleQuery,
  useGetFleetAssignmentsQuery,
  useGetFleetTripsQuery,
  useGetFleetInspectionsQuery,
  useGetFleetDriversQuery,
  useGetFleetLicensesQuery,
  useGetFleetFuelTransactionsQuery,
  useGetFleetMaintenanceQuery,
  useGetFleetIncidentsQuery,
  useGetFleetParkingQuery,
  useGetFleetApprovalsQuery,
  useGetFleetHistoryQuery,
  useGetFleetCalendarEventsQuery,
  useCreateVehicleMutation,
  useCreateDriverMutation,
  useCreateLicenseMutation,
  useCreateAssignmentMutation,
  useCreateTripMutation,
  useRecordFuelTransactionMutation,
  useCreateMaintenanceOrderMutation,
  useRecordInspectionMutation,
  useRecordIncidentMutation,
  useProcessFleetApprovalMutation,
} = fleetApi;
