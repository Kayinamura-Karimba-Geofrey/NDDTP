import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_REQUISITIONS,
  MOCK_SUPPLIERS,
  MOCK_ORDERS,
  MOCK_PURCHASE_REQUESTS,
  MOCK_PLANS,
  MOCK_EVALUATIONS,
  MOCK_VENDOR_REGISTRATIONS,
  MOCK_RFQS,
  MOCK_TENDERS,
  MOCK_BIDS,
  MOCK_CONTRACTS,
  MOCK_RECEIPT_COORDINATION,
  MOCK_INVOICE_MATCHES,
  MOCK_APPROVALS,
  MOCK_CALENDAR_EVENTS,
  type PurchaseRequisition,
  type Supplier,
  type PurchaseOrder,
  type PurchaseRequest,
  type ProcurementPlan,
  type SupplierEvaluation,
  type VendorRegistration,
  type RfqRecord,
  type TenderRecord,
  type BidRecord,
  type ContractRecord,
  type GoodsReceiptCoordination,
  type InvoiceMatch,
  type ProcurementApproval,
} from '../constants/procurement-data';

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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getPurchaseRequisitions: builder.query<PaginatedResponse<PurchaseRequisition>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('procurement', `/requisitions?${qs}`));
        if (result.error) return { data: paginate(MOCK_REQUISITIONS, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapRequisition) } };
      },
      providesTags: ['ProcurementRequisitions'],
    }),

    getSuppliers: builder.query<Supplier[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/vendors'));
        if (result.error) return { data: MOCK_SUPPLIERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapSupplier) };
      },
      providesTags: ['ProcurementSuppliers'],
    }),

    getPurchaseOrders: builder.query<PaginatedResponse<PurchaseOrder>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('procurement', `/orders?${qs}`));
        if (result.error) return { data: paginate(MOCK_ORDERS, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapOrder) } };
      },
      providesTags: ['ProcurementOrders'],
    }),

    getPurchaseRequests: builder.query<PurchaseRequest[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/purchase-requests'));
        if (result.error) return { data: MOCK_PURCHASE_REQUESTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as PurchaseRequest[] };
      },
      providesTags: ['ProcurementRequests'],
    }),

    getProcurementPlans: builder.query<ProcurementPlan[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/plans'));
        if (result.error) return { data: MOCK_PLANS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ProcurementPlan[] };
      },
      providesTags: ['ProcurementPlans'],
    }),

    getSupplierEvaluations: builder.query<SupplierEvaluation[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/evaluations'));
        if (result.error) return { data: MOCK_EVALUATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as SupplierEvaluation[] };
      },
      providesTags: ['ProcurementEvaluations'],
    }),

    getVendorRegistrations: builder.query<VendorRegistration[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/vendor-registrations'));
        if (result.error) return { data: MOCK_VENDOR_REGISTRATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as VendorRegistration[] };
      },
      providesTags: ['ProcurementRegistrations'],
    }),

    getRfqs: builder.query<RfqRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/rfqs'));
        if (result.error) return { data: MOCK_RFQS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as RfqRecord[] };
      },
      providesTags: ['ProcurementRfqs'],
    }),

    getTenders: builder.query<TenderRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/tenders'));
        if (result.error) return { data: MOCK_TENDERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as TenderRecord[] };
      },
      providesTags: ['ProcurementTenders'],
    }),

    getBids: builder.query<BidRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/bids'));
        if (result.error) return { data: MOCK_BIDS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as BidRecord[] };
      },
      providesTags: ['ProcurementBids'],
    }),

    getContracts: builder.query<ContractRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/contracts'));
        if (result.error) return { data: MOCK_CONTRACTS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ContractRecord[] };
      },
      providesTags: ['ProcurementContracts'],
    }),

    getGoodsReceiptCoordination: builder.query<GoodsReceiptCoordination[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/goods-receipts'));
        if (result.error) return { data: MOCK_RECEIPT_COORDINATION };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as GoodsReceiptCoordination[] };
      },
      providesTags: ['ProcurementReceipts'],
    }),

    getInvoiceMatches: builder.query<InvoiceMatch[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/invoice-matching'));
        if (result.error) return { data: MOCK_INVOICE_MATCHES };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as InvoiceMatch[] };
      },
      providesTags: ['ProcurementInvoices'],
    }),

    getProcurementApprovals: builder.query<ProcurementApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/approvals'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw as unknown as ProcurementApproval[] };
      },
      providesTags: ['ProcurementApprovals'],
    }),

    getCalendarEvents: builder.query<any[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('procurement', '/calendar-events'));
        if (result.error) return { data: MOCK_CALENDAR_EVENTS };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['ProcurementCalendar'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createPurchaseRequisition: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/requisitions', { method: 'POST', body }),
      invalidatesTags: ['ProcurementRequisitions'],
    }),

    createSupplier: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/vendors', { method: 'POST', body }),
      invalidatesTags: ['ProcurementSuppliers'],
    }),

    createPurchaseOrder: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/orders', { method: 'POST', body }),
      invalidatesTags: ['ProcurementOrders'],
    }),

    createPurchaseRequest: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/purchase-requests', { method: 'POST', body }),
      invalidatesTags: ['ProcurementRequests'],
    }),

    createProcurementPlan: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/plans', { method: 'POST', body }),
      invalidatesTags: ['ProcurementPlans'],
    }),

    createRfq: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/rfqs', { method: 'POST', body }),
      invalidatesTags: ['ProcurementRfqs'],
    }),

    createTender: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/tenders', { method: 'POST', body }),
      invalidatesTags: ['ProcurementTenders'],
    }),

    submitBid: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/bids', { method: 'POST', body }),
      invalidatesTags: ['ProcurementBids'],
    }),

    createContract: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/contracts', { method: 'POST', body }),
      invalidatesTags: ['ProcurementContracts'],
    }),

    createGoodsReceiptCoordination: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/goods-receipts', { method: 'POST', body }),
      invalidatesTags: ['ProcurementReceipts'],
    }),

    createInvoiceMatch: builder.mutation<void, any>({
      query: (body) => serviceQuery('procurement', '/invoice-matching', { method: 'POST', body }),
      invalidatesTags: ['ProcurementInvoices'],
    }),

    processApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('procurement', `/approvals/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['ProcurementApprovals', 'ProcurementRequisitions', 'ProcurementOrders'],
    }),
  }),
});

export const {
  useGetPurchaseRequisitionsQuery,
  useGetSuppliersQuery,
  useGetPurchaseOrdersQuery,
  useGetPurchaseRequestsQuery,
  useGetProcurementPlansQuery,
  useGetSupplierEvaluationsQuery,
  useGetVendorRegistrationsQuery,
  useGetRfqsQuery,
  useGetTendersQuery,
  useGetBidsQuery,
  useGetContractsQuery,
  useGetGoodsReceiptCoordinationQuery,
  useGetInvoiceMatchesQuery,
  useGetProcurementApprovalsQuery,
  useGetCalendarEventsQuery,
  useCreatePurchaseRequisitionMutation,
  useCreateSupplierMutation,
  useCreatePurchaseOrderMutation,
  useCreatePurchaseRequestMutation,
  useCreateProcurementPlanMutation,
  useCreateRfqMutation,
  useCreateTenderMutation,
  useSubmitBidMutation,
  useCreateContractMutation,
  useCreateGoodsReceiptCoordinationMutation,
  useCreateInvoiceMatchMutation,
  useProcessApprovalMutation,
} = procurementApi;
