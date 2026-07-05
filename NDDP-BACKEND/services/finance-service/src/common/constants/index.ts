export const CACHE_KEYS = {
  CATEGORY: (id: string) => `finance:category:${id}`,
  CATEGORIES: 'finance:categories:active',
  ACCOUNT: (id: string) => `finance:account:${id}`,
  ACCOUNTS: 'finance:accounts:active',
  BUDGET: (id: string) => `finance:budget:${id}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  CATEGORY_CREATED: 'finance.category.created',
  ACCOUNT_CREATED: 'finance.account.created',
  BUDGET_ALLOCATED: 'finance.budget.allocated',
  EXPENDITURE_SUBMITTED: 'finance.expenditure.submitted',
  EXPENDITURE_APPROVED: 'finance.expenditure.approved',
  EXPENDITURE_REJECTED: 'finance.expenditure.rejected',
  EXPENDITURE_PAID: 'finance.expenditure.paid',
} as const;

export const EXPENDITURE_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['PAID', 'CANCELLED'],
  REJECTED: [],
  PAID: [],
  CANCELLED: [],
};

export const DEFAULT_BUDGET_CATEGORIES = [
  { code: 'CAT-PER', name: 'Personnel', categoryType: 'PERSONNEL', description: 'Salaries, allowances, benefits' },
  { code: 'CAT-OPS', name: 'Operations', categoryType: 'OPERATIONS', description: 'Day-to-day operational expenses' },
  { code: 'CAT-CAP', name: 'Capital', categoryType: 'CAPITAL', description: 'Capital investments and equipment' },
  { code: 'CAT-MNT', name: 'Maintenance', categoryType: 'MAINTENANCE', description: 'Maintenance and repairs' },
] as const;

export const DEFAULT_COST_ACCOUNTS = [
  { code: 'ACC-HQ', name: 'HQ Operations', categoryCode: 'CAT-OPS', departmentId: null },
  { code: 'ACC-LOG', name: 'Logistics Unit', categoryCode: 'CAT-OPS', departmentId: null },
] as const;
