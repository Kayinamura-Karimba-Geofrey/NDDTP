import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_ITEMS,
  MOCK_WAREHOUSES,
  MOCK_CATEGORIES,
  MOCK_REQUESTS,
  MOCK_STOCK_LEVELS,
  type InventoryItem,
  type Warehouse,
  type InventoryCategory,
  type StockRequest,
  type StockLevel,
} from '../constants/inventory-data';



function mapItem(raw: Record<string, unknown>): InventoryItem {
  const stock = raw.stockLevels as { quantity?: number; reservedQuantity?: number }[] | undefined;
  const totalQty = stock?.reduce((s, l) => s + (l.quantity ?? 0), 0) ?? (raw.quantityOnHand as number) ?? 0;
  const reserved = stock?.reduce((s, l) => s + (l.reservedQuantity ?? 0), 0) ?? 0;
  const reorder = (raw.reorderLevel as number) ?? 0;
  let status: InventoryItem['status'] = 'IN_STOCK';
  if (totalQty === 0) status = 'OUT_OF_STOCK';
  else if (totalQty <= reorder) status = 'LOW_STOCK';

  return {
    id: raw.id as string,
    itemCode: (raw.sku as string) ?? (raw.itemCode as string) ?? `INV-${String(raw.id).slice(0, 8)}`,
    name: raw.name as string,
    category: formatCategory(raw.category as string),
    unit: formatUnit((raw.unit as string) ?? 'EACH'),
    currentStock: totalQty,
    reservedStock: reserved,
    availableStock: totalQty - reserved,
    reorderLevel: reorder,
    warehouse: (raw.warehouseName as string) ?? 'Central Warehouse',
    status,
    barcode: raw.barcode as string | undefined,
  };
}

function mapWarehouse(raw: Record<string, unknown>): Warehouse {
  return {
    id: raw.id as string,
    code: raw.code as string,
    name: raw.name as string,
    location: (raw.location as string) ?? '—',
    manager: raw.manager as string | undefined,
    capacity: raw.capacity as string | undefined,
    status: ((raw.status as string) ?? 'ACTIVE') as Warehouse['status'],
    itemCount: raw.itemCount as number | undefined,
  };
}

function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    CONSUMABLE: 'Office Supplies',
    SPARE_PART: 'Vehicle Parts',
    AMMUNITION: 'Ammunition',
    MEDICAL_SUPPLY: 'Medical Supplies',
    UNIFORM: 'Uniforms',
    OTHER: 'Other',
  };
  return map[cat] ?? cat ?? '—';
}

function formatUnit(unit: string): string {
  const map: Record<string, string> = {
    EACH: 'Piece',
    BOX: 'Box',
    KG: 'Kilogram',
    LITER: 'Liter',
    SET: 'Set',
  };
  return map[unit] ?? unit;
}

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryItems: builder.query<PaginatedResponse<InventoryItem>, { page?: number; limit?: number; category?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(250);
          let items = MOCK_ITEMS;
          if (params.category) items = items.filter((i) => i.category === params.category);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        if (params.category) qs.set('category', params.category);
        const result = await baseQuery(serviceQuery('inventory', `/items?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapItem) } };
      },
      providesTags: ['InventoryItems'],
    }),

    getWarehouses: builder.query<Warehouse[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_WAREHOUSES };
        }
        const result = await baseQuery(serviceQuery('inventory', '/warehouses'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapWarehouse) };
      },
      providesTags: ['InventoryWarehouses'],
    }),

    getInventoryCategories: builder.query<InventoryCategory[], void>({
      queryFn: async () => {
        await mockDelay(200);
        return { data: MOCK_CATEGORIES };
      },
      providesTags: ['InventoryCategories'],
    }),

    getStockRequests: builder.query<StockRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_REQUESTS };
        }
        const result = await baseQuery(serviceQuery('inventory', '/requests?limit=50'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return {
          data: raw.data.map((r) => ({
            id: r.id as string,
            requestNumber: (r.requestNumber as string) ?? `SR-${String(r.id).slice(0, 8)}`,
            department: (r.department as string) ?? '—',
            requester: (r.requestedBy as string) ?? '—',
            priority: 'Normal',
            requestedDate: (r.createdAt as string) ?? '',
            status: (r.status as StockRequest['status']) ?? 'PENDING',
          })),
        };
      },
      providesTags: ['InventoryRequests'],
    }),

    getStockLevels: builder.query<StockLevel[], void>({
      queryFn: async () => {
        await mockDelay(200);
        return { data: MOCK_STOCK_LEVELS };
      },
      providesTags: ['InventoryStockLevels'],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useGetWarehousesQuery,
  useGetInventoryCategoriesQuery,
  useGetStockRequestsQuery,
  useGetStockLevelsQuery,
} = inventoryApi;
