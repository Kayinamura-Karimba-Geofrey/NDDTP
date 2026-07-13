import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_ITEMS,
  MOCK_WAREHOUSES,
  MOCK_CATEGORIES,
  MOCK_REQUESTS,
  MOCK_STOCK_LEVELS,
  MOCK_RECEIPTS,
  MOCK_ISSUES,
  MOCK_TRANSFERS,
  MOCK_ADJUSTMENTS,
  MOCK_STOCK_COUNTS,
  MOCK_BATCHES,
  MOCK_EXPIRY,
  MOCK_REORDER,
  MOCK_SUPPLIERS,
  MOCK_UNITS,
  type InventoryItem,
  type Warehouse,
  type InventoryCategory,
  type StockRequest,
  type StockLevel,
  type GoodsReceipt,
  type GoodsIssue,
  type WarehouseTransfer,
  type StockAdjustment,
  type StockCount,
  type BatchLot,
  type ExpiryItem,
  type ReorderItem,
  type SupplierRef,
  type UnitOfMeasure,
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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getInventoryItems: builder.query<PaginatedResponse<InventoryItem>, { page?: number; limit?: number; category?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        if (params.category) qs.set('category', params.category);
        const result = await baseQuery(serviceQuery('inventory', `/items?${qs}`));
        if (result.error) {
          let items = MOCK_ITEMS;
          if (params.category) items = items.filter((i) => i.category === params.category);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 50) };
        }
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapItem) } };
      },
      providesTags: ['InventoryItems'],
    }),

    getWarehouses: builder.query<Warehouse[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/warehouses'));
        if (result.error) return { data: MOCK_WAREHOUSES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapWarehouse) };
      },
      providesTags: ['InventoryWarehouses'],
    }),

    getInventoryCategories: builder.query<InventoryCategory[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/categories'));
        if (result.error) return { data: MOCK_CATEGORIES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as InventoryCategory[] };
      },
      providesTags: ['InventoryCategories'],
    }),

    getStockRequests: builder.query<StockRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/requests?limit=50'));
        if (result.error) return { data: MOCK_REQUESTS };
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
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/stock-levels'));
        if (result.error) return { data: MOCK_STOCK_LEVELS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as StockLevel[] };
      },
      providesTags: ['InventoryStockLevels'],
    }),

    getGoodsReceipts: builder.query<GoodsReceipt[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/receipts'));
        if (result.error) return { data: MOCK_RECEIPTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as GoodsReceipt[] };
      },
      providesTags: ['InventoryReceipts'],
    }),

    getGoodsIssues: builder.query<GoodsIssue[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/issues'));
        if (result.error) return { data: MOCK_ISSUES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as GoodsIssue[] };
      },
      providesTags: ['InventoryIssues'],
    }),

    getWarehouseTransfers: builder.query<WarehouseTransfer[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/transfers'));
        if (result.error) return { data: MOCK_TRANSFERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as WarehouseTransfer[] };
      },
      providesTags: ['InventoryTransfers'],
    }),

    getStockAdjustments: builder.query<StockAdjustment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/adjustments'));
        if (result.error) return { data: MOCK_ADJUSTMENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as StockAdjustment[] };
      },
      providesTags: ['InventoryAdjustments'],
    }),

    getStockCounts: builder.query<StockCount[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/counts'));
        if (result.error) return { data: MOCK_STOCK_COUNTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as StockCount[] };
      },
      providesTags: ['InventoryCounts'],
    }),

    getBatchLots: builder.query<BatchLot[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/batches'));
        if (result.error) return { data: MOCK_BATCHES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as BatchLot[] };
      },
      providesTags: ['InventoryBatches'],
    }),

    getExpiryItems: builder.query<ExpiryItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/expiry'));
        if (result.error) return { data: MOCK_EXPIRY };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ExpiryItem[] };
      },
      providesTags: ['InventoryExpiry'],
    }),

    getReorderItems: builder.query<ReorderItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/reorder'));
        if (result.error) return { data: MOCK_REORDER };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ReorderItem[] };
      },
      providesTags: ['InventoryReorder'],
    }),

    getInventorySuppliers: builder.query<SupplierRef[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/suppliers'));
        if (result.error) return { data: MOCK_SUPPLIERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as SupplierRef[] };
      },
      providesTags: ['InventorySuppliers'],
    }),

    getUnitsOfMeasure: builder.query<UnitOfMeasure[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('inventory', '/units-of-measure'));
        if (result.error) return { data: MOCK_UNITS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as UnitOfMeasure[] };
      },
      providesTags: ['InventoryUoms'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createInventoryItem: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/items', { method: 'POST', body }),
      invalidatesTags: ['InventoryItems'],
    }),

    createWarehouse: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/warehouses', { method: 'POST', body }),
      invalidatesTags: ['InventoryWarehouses'],
    }),

    createInventoryCategory: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/categories', { method: 'POST', body }),
      invalidatesTags: ['InventoryCategories'],
    }),

    createGoodsReceipt: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/receipts', { method: 'POST', body }),
      invalidatesTags: ['InventoryReceipts', 'InventoryItems', 'InventoryStockLevels'],
    }),

    createGoodsIssue: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/issues', { method: 'POST', body }),
      invalidatesTags: ['InventoryIssues', 'InventoryItems', 'InventoryStockLevels'],
    }),

    createStockRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/requests', { method: 'POST', body }),
      invalidatesTags: ['InventoryRequests'],
    }),

    createWarehouseTransfer: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/transfers', { method: 'POST', body }),
      invalidatesTags: ['InventoryTransfers', 'InventoryItems', 'InventoryStockLevels'],
    }),

    createStockAdjustment: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/adjustments', { method: 'POST', body }),
      invalidatesTags: ['InventoryAdjustments', 'InventoryItems', 'InventoryStockLevels'],
    }),

    createStockCount: builder.mutation<void, any>({
      query: (body) => serviceQuery('inventory', '/counts', { method: 'POST', body }),
      invalidatesTags: ['InventoryCounts', 'InventoryItems', 'InventoryStockLevels'],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useGetWarehousesQuery,
  useGetInventoryCategoriesQuery,
  useGetStockRequestsQuery,
  useGetStockLevelsQuery,
  useGetGoodsReceiptsQuery,
  useGetGoodsIssuesQuery,
  useGetWarehouseTransfersQuery,
  useGetStockAdjustmentsQuery,
  useGetStockCountsQuery,
  useGetBatchLotsQuery,
  useGetExpiryItemsQuery,
  useGetReorderItemsQuery,
  useGetInventorySuppliersQuery,
  useGetUnitsOfMeasureQuery,
  useCreateInventoryItemMutation,
  useCreateWarehouseMutation,
  useCreateInventoryCategoryMutation,
  useCreateGoodsReceiptMutation,
  useCreateGoodsIssueMutation,
  useCreateStockRequestMutation,
  useCreateWarehouseTransferMutation,
  useCreateStockAdjustmentMutation,
  useCreateStockCountMutation,
} = inventoryApi;
