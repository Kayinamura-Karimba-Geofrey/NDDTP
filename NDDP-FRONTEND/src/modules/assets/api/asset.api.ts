import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_ASSETS,
  MOCK_CATEGORIES,
  MOCK_TYPES,
  MOCK_ASSIGNMENTS,
  MOCK_TRANSFERS,
  MOCK_RETURNS,
  MOCK_MAINTENANCE,
  MOCK_INSPECTIONS,
  MOCK_WARRANTIES,
  MOCK_RESERVATIONS,
  MOCK_DISPOSALS,
  MOCK_AUDIT_HISTORY,
  MOCK_DOCUMENTS,
  type AssetRecord,
  type AssetCategory,
  type AssetType,
  type AssetAssignment,
  type AssetTransfer,
  type AssetReturn,
  type MaintenanceRecord,
  type InspectionRecord,
  type WarrantyRecord,
  type AssetReservation,
  type AssetDisposal,
  type AssetAuditEntry,
  type AssetDocument,
} from '../constants/asset-data';

function mapAsset(raw: Record<string, unknown>): AssetRecord {
  const category = raw.category as { name?: string } | undefined;
  return {
    id: raw.id as string,
    assetNumber: (raw.assetNumber as string) ?? (raw.assetTag as string) ?? `AST-${String(raw.id).slice(0, 8)}`,
    name: raw.name as string,
    category: category?.name ?? (raw.categoryName as string) ?? (raw.category as string) ?? '—',
    type: (raw.type as string) ?? (raw.assetType as string) ?? '—',
    serialNumber: raw.serialNumber as string | undefined,
    manufacturer: raw.manufacturer as string | undefined,
    model: raw.model as string | undefined,
    department: (raw.department as string) ?? (raw.unitName as string) ?? '—',
    assignedTo: (raw.assignedTo as string) ?? (raw.assigneeName as string),
    status: (raw.status as AssetRecord['status']) ?? 'REGISTERED',
    purchaseDate: (raw.acquisitionDate as string) ?? (raw.purchaseDate as string),
    location: (raw.location as string) ?? '—',
    condition: raw.condition as string | undefined,
  };
}

function mapCategory(raw: Record<string, unknown>): AssetCategory {
  return {
    id: raw.id as string,
    name: raw.name as string,
    code: (raw.code as string) ?? '—',
    description: (raw.description as string) ?? '',
    status: 'ACTIVE',
    assetCount: raw.assetCount as number | undefined,
  };
}

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getAssets: builder.query<PaginatedResponse<AssetRecord>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('asset', `/assets?${qs}`));
        if (result.error) return { data: paginate(MOCK_ASSETS, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapAsset) } };
      },
      providesTags: ['Assets'],
    }),

    getAssetCategories: builder.query<AssetCategory[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/categories'));
        if (result.error) return { data: MOCK_CATEGORIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCategory) };
      },
      providesTags: ['AssetCategories'],
    }),

    getAssetTypes: builder.query<AssetType[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/types'));
        if (result.error) return { data: MOCK_TYPES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetType[] };
      },
      providesTags: ['Assets'],
    }),

    getAssetAssignments: builder.query<AssetAssignment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/assignments'));
        if (result.error) return { data: MOCK_ASSIGNMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetAssignment[] };
      },
      providesTags: ['AssetAssignments'],
    }),

    getAssetTransfers: builder.query<AssetTransfer[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/transfers'));
        if (result.error) return { data: MOCK_TRANSFERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetTransfer[] };
      },
      providesTags: ['AssetTransfers'],
    }),

    getAssetReturns: builder.query<AssetReturn[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/returns'));
        if (result.error) return { data: MOCK_RETURNS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetReturn[] };
      },
      providesTags: ['AssetReturns'],
    }),

    getAssetMaintenance: builder.query<MaintenanceRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/maintenance'));
        if (result.error) return { data: MOCK_MAINTENANCE };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as MaintenanceRecord[] };
      },
      providesTags: ['AssetMaintenance'],
    }),

    getAssetInspections: builder.query<InspectionRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/inspections'));
        if (result.error) return { data: MOCK_INSPECTIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as InspectionRecord[] };
      },
      providesTags: ['AssetInspections'],
    }),

    getAssetWarranties: builder.query<WarrantyRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/warranties'));
        if (result.error) return { data: MOCK_WARRANTIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as WarrantyRecord[] };
      },
      providesTags: ['AssetWarranties'],
    }),

    getAssetReservations: builder.query<AssetReservation[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/reservations'));
        if (result.error) return { data: MOCK_RESERVATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetReservation[] };
      },
      providesTags: ['AssetReservations'],
    }),

    getAssetDisposals: builder.query<AssetDisposal[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/disposals'));
        if (result.error) return { data: MOCK_DISPOSALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetDisposal[] };
      },
      providesTags: ['AssetDisposals'],
    }),

    getAssetAuditHistory: builder.query<AssetAuditEntry[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/audit-history'));
        if (result.error) return { data: MOCK_AUDIT_HISTORY };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetAuditEntry[] };
      },
      providesTags: ['AssetAuditHistory'],
    }),

    getAssetDocuments: builder.query<AssetDocument[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('asset', '/documents'));
        if (result.error) return { data: MOCK_DOCUMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as AssetDocument[] };
      },
      providesTags: ['AssetDocuments'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/assets', { method: 'POST', body }),
      invalidatesTags: ['Assets'],
    }),

    createCategory: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/categories', { method: 'POST', body }),
      invalidatesTags: ['AssetCategories'],
    }),

    assignAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/assignments', { method: 'POST', body }),
      invalidatesTags: ['AssetAssignments', 'Assets'],
    }),

    transferAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/transfers', { method: 'POST', body }),
      invalidatesTags: ['AssetTransfers', 'Assets'],
    }),

    returnAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/returns', { method: 'POST', body }),
      invalidatesTags: ['AssetReturns', 'AssetAssignments', 'Assets'],
    }),

    requestMaintenance: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/maintenance', { method: 'POST', body }),
      invalidatesTags: ['AssetMaintenance', 'Assets'],
    }),

    submitInspection: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/inspections', { method: 'POST', body }),
      invalidatesTags: ['AssetInspections', 'Assets'],
    }),

    reserveAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/reservations', { method: 'POST', body }),
      invalidatesTags: ['AssetReservations'],
    }),

    disposeAsset: builder.mutation<void, any>({
      query: (body) => serviceQuery('asset', '/disposals', { method: 'POST', body }),
      invalidatesTags: ['AssetDisposals', 'Assets'],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetCategoriesQuery,
  useGetAssetTypesQuery,
  useGetAssetAssignmentsQuery,
  useGetAssetTransfersQuery,
  useGetAssetReturnsQuery,
  useGetAssetMaintenanceQuery,
  useGetAssetInspectionsQuery,
  useGetAssetWarrantiesQuery,
  useGetAssetReservationsQuery,
  useGetAssetDisposalsQuery,
  useGetAssetAuditHistoryQuery,
  useGetAssetDocumentsQuery,
  useCreateAssetMutation,
  useCreateCategoryMutation,
  useAssignAssetMutation,
  useTransferAssetMutation,
  useReturnAssetMutation,
  useRequestMaintenanceMutation,
  useSubmitInspectionMutation,
  useReserveAssetMutation,
  useDisposeAssetMutation,
} = assetApi;
