import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import { paginate } from '@/utils/api-mock';
import {
  MOCK_BUDGETS,
  MOCK_COST_CENTERS,
  MOCK_EXPENDITURES,
  MOCK_INVOICES,
  MOCK_PAYMENTS,
  MOCK_FISCAL_YEARS,
  MOCK_PROGRAMS,
  MOCK_TRANSFERS,
  MOCK_COMMITMENTS,
  MOCK_REVENUE,
  MOCK_RECEIVABLES,
  MOCK_PAYABLES,
  MOCK_AUDIT_HISTORY,
  MOCK_APPROVALS,
  MOCK_CALENDAR_EVENTS,
  MOCK_BUDGET_PLANS,
  type BudgetRecord,
  type CostCenter,
  type Expenditure,
  type Invoice,
  type Payment,
  type FiscalYear,
  type ProgramProject,
  type Commitment,
  type RevenueRecord,
  type AccountsReceivable,
  type AccountsPayable,
  type FinanceAuditEntry,
  type FinanceApproval,
  type BudgetPlan,
  type BudgetTransfer,
} from '../constants/finance-data';

function mapBudget(raw: Record<string, unknown>): BudgetRecord {
  const account = raw.account as { name?: string; code?: string; departmentId?: string } | undefined;
  const allocated = Number(raw.allocatedAmount ?? 0);
  const committed = Number(raw.committedAmount ?? 0);
  const spent = Number(raw.spentAmount ?? 0);
  return {
    id: raw.id as string,
    budgetCode: (raw.budgetCode as string) ?? `BUD-${String(raw.id).slice(0, 8)}`,
    department: (raw.departmentName as string) ?? account?.departmentId ?? '—',
    costCenter: account?.name ?? account?.code ?? '—',
    program: raw.program as string | undefined,
    category: (raw.categoryName as string) ?? 'Operations',
    fiscalYear: (raw.fiscalYear as number) ?? 2026,
    allocatedAmount: allocated,
    committedAmount: committed,
    spentAmount: spent,
    availableAmount: allocated - committed - spent,
    status: (raw.status as BudgetRecord['status']) ?? 'DRAFT',
  };
}

function mapCostCenter(raw: Record<string, unknown>): CostCenter {
  return {
    id: raw.id as string,
    code: raw.code as string,
    name: raw.name as string,
    department: (raw.departmentName as string) ?? (raw.departmentId as string) ?? '—',
    manager: (raw.managerName as string) ?? '—',
    budget: Number(raw.budgetAmount ?? raw.allocatedAmount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE') as CostCenter['status'],
  };
}

function mapExpenditure(raw: Record<string, unknown>): Expenditure {
  const budget = raw.budget as { budgetCode?: string } | undefined;
  const account = raw.account as { name?: string } | undefined;
  const status = (raw.status as Expenditure['status']) ?? 'DRAFT';
  let paymentStatus: Expenditure['paymentStatus'] = 'PENDING';
  if (status === 'PAID') paymentStatus = 'PAID';
  else if (status === 'APPROVED') paymentStatus = 'APPROVED';

  return {
    id: raw.id as string,
    expenditureNumber: (raw.requestNumber as string) ?? `EXP-${String(raw.id).slice(0, 8)}`,
    department: account?.name ?? '—',
    category: (raw.referenceType as string) ?? 'Operations',
    supplier: raw.supplierName as string | undefined,
    amount: Number(raw.amount ?? 0),
    paymentStatus,
    budget: budget?.budgetCode ?? (raw.budgetId as string) ?? '—',
    date: (raw.createdAt as string) ?? '',
    purpose: (raw.purpose as string) ?? '—',
    status,
  };
}

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getBudgets: builder.query<PaginatedResponse<BudgetRecord>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('finance', `/budgets?${qs}`));
        if (result.error) return { data: paginate(MOCK_BUDGETS, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapBudget) } };
      },
      providesTags: ['FinanceBudgets'],
    }),

    getCostCenters: builder.query<CostCenter[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/accounts/active'));
        if (result.error) return { data: MOCK_COST_CENTERS };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCostCenter) };
      },
      providesTags: ['FinanceCostCenters'],
    }),

    getExpenditures: builder.query<PaginatedResponse<Expenditure>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('finance', `/expenditures?${qs}`));
        if (result.error) return { data: paginate(MOCK_EXPENDITURES, params.page ?? 1, params.limit ?? 50) };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapExpenditure) } };
      },
      providesTags: ['FinanceExpenditures'],
    }),

    getInvoices: builder.query<Invoice[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/invoices'));
        if (result.error) return { data: MOCK_INVOICES };
        const raw = unwrapApiResponse<Invoice[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceInvoices'],
    }),

    getPayments: builder.query<Payment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/payments'));
        if (result.error) return { data: MOCK_PAYMENTS };
        const raw = unwrapApiResponse<Payment[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinancePayments'],
    }),

    getFiscalYears: builder.query<FiscalYear[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/fiscal-years'));
        if (result.error) return { data: MOCK_FISCAL_YEARS };
        const raw = unwrapApiResponse<FiscalYear[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceFiscalYears'],
    }),

    getPrograms: builder.query<ProgramProject[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/programs'));
        if (result.error) return { data: MOCK_PROGRAMS };
        const raw = unwrapApiResponse<ProgramProject[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinancePrograms'],
    }),

    getTransfers: builder.query<BudgetTransfer[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/transfers'));
        if (result.error) return { data: MOCK_TRANSFERS };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceTransfers'],
    }),

    getCommitments: builder.query<Commitment[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/commitments'));
        if (result.error) return { data: MOCK_COMMITMENTS };
        const raw = unwrapApiResponse<Commitment[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceCommitments'],
    }),

    getRevenue: builder.query<RevenueRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/revenues'));
        if (result.error) return { data: MOCK_REVENUE };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceRevenue'],
    }),

    getReceivables: builder.query<AccountsReceivable[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/receivables'));
        if (result.error) return { data: MOCK_RECEIVABLES };
        const raw = unwrapApiResponse<AccountsReceivable[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceReceivables'],
    }),

    getPayables: builder.query<AccountsPayable[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/payables'));
        if (result.error) return { data: MOCK_PAYABLES };
        const raw = unwrapApiResponse<AccountsPayable[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinancePayables'],
    }),

    getAuditHistory: builder.query<FinanceAuditEntry[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/audits'));
        if (result.error) return { data: MOCK_AUDIT_HISTORY };
        const raw = unwrapApiResponse<FinanceAuditEntry[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceAudit'],
    }),

    getFinanceApprovals: builder.query<FinanceApproval[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/approvals'));
        if (result.error) return { data: MOCK_APPROVALS };
        const raw = unwrapApiResponse<FinanceApproval[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceApprovals'],
    }),

    getFinanceCalendarEvents: builder.query<any[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/calendar'));
        if (result.error) return { data: MOCK_CALENDAR_EVENTS };
        const raw = unwrapApiResponse<any[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceCalendar'],
    }),

    getBudgetPlans: builder.query<BudgetPlan[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('finance', '/budget-plans'));
        if (result.error) return { data: MOCK_BUDGET_PLANS };
        const raw = unwrapApiResponse<BudgetPlan[]>(result.data);
        return { data: raw };
      },
      providesTags: ['FinanceBudgets'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createBudget: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/budgets', { method: 'POST', body }),
      invalidatesTags: ['FinanceBudgets'],
    }),

    createCostCenter: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/accounts', { method: 'POST', body }),
      invalidatesTags: ['FinanceCostCenters'],
    }),

    createExpenditure: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/expenditures', { method: 'POST', body }),
      invalidatesTags: ['FinanceExpenditures', 'FinanceBudgets'],
    }),

    createInvoice: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/invoices', { method: 'POST', body }),
      invalidatesTags: ['FinanceInvoices'],
    }),

    createPayment: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/payments', { method: 'POST', body }),
      invalidatesTags: ['FinancePayments', 'FinanceInvoices'],
    }),

    createFiscalYear: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/fiscal-years', { method: 'POST', body }),
      invalidatesTags: ['FinanceFiscalYears'],
    }),

    createProgram: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/programs', { method: 'POST', body }),
      invalidatesTags: ['FinancePrograms'],
    }),

    createTransfer: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/transfers', { method: 'POST', body }),
      invalidatesTags: ['FinanceTransfers', 'FinanceBudgets'],
    }),

    createCommitment: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/commitments', { method: 'POST', body }),
      invalidatesTags: ['FinanceCommitments', 'FinanceBudgets'],
    }),

    createRevenue: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/revenues', { method: 'POST', body }),
      invalidatesTags: ['FinanceRevenue'],
    }),

    createReceivable: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/receivables', { method: 'POST', body }),
      invalidatesTags: ['FinanceReceivables'],
    }),

    createPayable: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/payables', { method: 'POST', body }),
      invalidatesTags: ['FinancePayables'],
    }),

    processFinanceApproval: builder.mutation<void, { id: string; action: 'APPROVE' | 'REJECT' }>({
      query: ({ id, action }) => serviceQuery('finance', `/approvals/${id}/action`, { method: 'POST', body: { action } }),
      invalidatesTags: ['FinanceApprovals', 'FinanceBudgets', 'FinanceExpenditures', 'FinancePayments', 'FinanceInvoices'],
    }),

    createBudgetPlan: builder.mutation<void, any>({
      query: (body) => serviceQuery('finance', '/budget-plans', { method: 'POST', body }),
      invalidatesTags: ['FinanceBudgets'],
    }),
  }),
});

export const {
  useGetBudgetsQuery,
  useGetCostCentersQuery,
  useGetExpendituresQuery,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useGetFiscalYearsQuery,
  useGetProgramsQuery,
  useGetTransfersQuery,
  useGetCommitmentsQuery,
  useGetRevenueQuery,
  useGetReceivablesQuery,
  useGetPayablesQuery,
  useGetAuditHistoryQuery,
  useGetFinanceApprovalsQuery,
  useGetFinanceCalendarEventsQuery,
  useGetBudgetPlansQuery,
  useCreateBudgetMutation,
  useCreateCostCenterMutation,
  useCreateExpenditureMutation,
  useCreateInvoiceMutation,
  useCreatePaymentMutation,
  useCreateFiscalYearMutation,
  useCreateProgramMutation,
  useCreateTransferMutation,
  useCreateCommitmentMutation,
  useCreateRevenueMutation,
  useCreateReceivableMutation,
  useCreatePayableMutation,
  useProcessFinanceApprovalMutation,
  useCreateBudgetPlanMutation,
} = financeApi;
