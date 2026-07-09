import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_BUDGETS,
  MOCK_COST_CENTERS,
  MOCK_EXPENDITURES,
  type BudgetRecord,
  type CostCenter,
  type Expenditure,
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
  const category = raw.category as { name?: string } | undefined;
  return {
    id: raw.id as string,
    code: raw.code as string,
    name: raw.name as string,
    department: (raw.departmentName as string) ?? (raw.departmentId as string) ?? '—',
    manager: (raw.managerName as string) ?? '—',
    budget: Number(raw.budgetAmount ?? raw.allocatedAmount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE') as CostCenter['status'],
    ...(category ? {} : {}),
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
    getBudgets: builder.query<PaginatedResponse<BudgetRecord>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(250);
          return { data: paginate(MOCK_BUDGETS, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('finance', `/budgets?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapBudget) } };
      },
      providesTags: ['FinanceBudgets'],
    }),

    getCostCenters: builder.query<CostCenter[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_COST_CENTERS };
        }
        const result = await baseQuery(serviceQuery('finance', '/accounts/active'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
        return { data: raw.map(mapCostCenter) };
      },
      providesTags: ['FinanceCostCenters'],
    }),

    getExpenditures: builder.query<PaginatedResponse<Expenditure>, { page?: number; limit?: number }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(250);
          return { data: paginate(MOCK_EXPENDITURES, params.page ?? 1, params.limit ?? 50) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 50) });
        const result = await baseQuery(serviceQuery('finance', `/expenditures?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapExpenditure) } };
      },
      providesTags: ['FinanceExpenditures'],
    }),
  }),
});

export const {
  useGetBudgetsQuery,
  useGetCostCentersQuery,
  useGetExpendituresQuery,
} = financeApi;
