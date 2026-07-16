export enum BudgetCategoryType {
  PERSONNEL = 'PERSONNEL',
  OPERATIONS = 'OPERATIONS',
  CAPITAL = 'CAPITAL',
  MAINTENANCE = 'MAINTENANCE',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum BudgetStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export enum ExpenditureStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum ExpenditureReferenceType {
  MANUAL = 'MANUAL',
  PROCUREMENT = 'PROCUREMENT',
  PAYROLL = 'PAYROLL',
  MAINTENANCE = 'MAINTENANCE',
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum FinancePublishedEvent {
  CATEGORY_CREATED = 'finance.category.created',
  ACCOUNT_CREATED = 'finance.account.created',
  BUDGET_ALLOCATED = 'finance.budget.allocated',
  EXPENDITURE_SUBMITTED = 'finance.expenditure.submitted',
  EXPENDITURE_APPROVED = 'finance.expenditure.approved',
  EXPENDITURE_REJECTED = 'finance.expenditure.rejected',
  EXPENDITURE_PAID = 'finance.expenditure.paid',
}
