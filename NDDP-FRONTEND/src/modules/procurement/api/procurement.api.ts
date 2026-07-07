import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_REQUISITIONS,
  MOCK_SUPPLIERS,
  MOCK_ORDERS,
  type PurchaseRequisition,
  type Supplier,
  type PurchaseOrder,
} from '../constants/procurement-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    GENERAL: 'General',
    MEDICAL: 'Medical Supplies',
    IT: 'IT Equipment',
    CONSTRUCTION: 'Construction',
    UNIFORM: 'Uniforms',
    VEHICLE: 'Vehicles',
  };
  return map[cat] ?? cat ?? '—';
}

function mapRequisition(raw: Record<string, unknown>): PurchaseRequisition {
  const items = raw.items as { estimatedUnitCost?: number; quantity?: number }[] | undefined;
  const estimatedCost = items?.reduce((s, i) => s + (i.estimatedUnitCost ?? 0) * (i.quantity ?? 1), 0) ?? (raw.totalAmount as number) ?? 0;
  return {
    id: raw.id as string,
    requisitionNumber: (raw.requisitionNumber as string) ?? `PR-${String(raw.id).slice(0, 8)}`,
    department: (raw.departmentName as string) ?? (raw.departmentId as string) ?? '—',
    requester: (raw.requestedBy as string) ?? (raw.requesterName as string) ?? '—',
    category: (raw.category as string) ?? 'General',
    estimatedCost,
    priority: (raw.priority as string) ?? 'ROUTINE',
    submissionDate: (raw.createdAt as string) ?? '',
    status: (raw.status as PurchaseRequisition['status']) ?? 'DRAFT',
  };
}

function mapSupplier(raw: Record<string, unknown>): Supplier {
  return {
    id: raw.id as string,
    code: raw.code as string,
    name: raw.name as string,
    category: formatCategory(raw.category as string),
    registrationNumber: raw.registrationNumber as string | undefined,
    taxId: raw.taxId as string | undefined,
    email: raw.contactEmail as string | undefined,
    phone: raw.contactPhone as string | undefined,
    address: raw.address as string | undefined,
    status: ((raw.status as string) ?? 'ACTIVE') as Supplier['status'],
    rating: raw.rating as number | undefined,
  };
}

function mapOrder(raw: Record<string, unknown>): PurchaseOrder {
  const vendor = raw.vendor as { name?: string } | undefined;
  const items = raw.items as unknown[] | undefined;
  return {
    id: raw.id as string,
    poNumber: (raw.orderNumber as string) ?? `PO-${String(raw.id).slice(0, 8)}`,
    supplier: vendor?.name ?? (raw.vendorName as string) ?? '—',
    items: items?.length ?? 0,
    totalAmount: (raw.totalAmount as number) ?? 0,
    deliveryDate: (raw.expectedDelivery as string) ?? '—',
    deliveryAddress: (raw.deliveryAddress as string) ?? '—',
    status: (raw.status as PurchaseOrder['status']) ?? 'DRAFT',
  };
}

export const procurementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseRequisitions: builder.query<PaginatedResponse<PurchaseRequisition>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 250));
          return { data: paginate(MOCK_REQUISITIONS, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('procurement', `/requisitions?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapRequisition) } };
      },
      providesTags: ['ProcurementRequisitions'],
    }),

    getSuppliers: builder.query<Supplier[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_SUPPLIERS };
        }
        const result = await baseQuery(serviceQuery('procurement', '/vendors'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapSupplier) };
      },
      providesTags: ['ProcurementSuppliers'],
    }),

    getPurchaseOrders: builder.query<PaginatedResponse<PurchaseOrder>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 250));
          return { data: paginate(MOCK_ORDERS, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('procurement', `/orders?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapOrder) } };
      },
      providesTags: ['ProcurementOrders'],
    }),
  }),
});

export const {
  useGetPurchaseRequisitionsQuery,
  useGetSuppliersQuery,
  useGetPurchaseOrdersQuery,
} = procurementApi;
