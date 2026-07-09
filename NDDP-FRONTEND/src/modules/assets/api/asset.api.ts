import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { MOCK_ASSETS, MOCK_CATEGORIES, type AssetRecord, type AssetCategory } from '../constants/asset-data';



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
    getAssets: builder.query<PaginatedResponse<AssetRecord>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(250);
          return { data: paginate(MOCK_ASSETS, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('asset', `/assets?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapAsset) } };
      },
      providesTags: ['Assets'],
    }),

    getAssetCategories: builder.query<AssetCategory[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_CATEGORIES };
        }
        const result = await baseQuery(serviceQuery('asset', '/categories'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCategory) };
      },
      providesTags: ['AssetCategories'],
    }),
  }),
});

export const { useGetAssetsQuery, useGetAssetCategoriesQuery } = assetApi;
