export type FinanceStatus =
  | 'DRAFT' | 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'CLOSED'
  | 'ARCHIVED' | 'OPEN' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'COMMITTED' | 'IN_PROGRESS'
  | 'PARTIAL' | 'MATCHED' | 'UNDER_REVIEW' | 'COMPLETED' | 'INACTIVE' | 'SUSPENDED';

export interface BudgetRecord {
  id: string;
  budgetCode: string;
  department: string;
  costCenter: string;
  program?: string;
  category: string;
  fiscalYear: number;
  allocatedAmount: number;
  committedAmount: number;
  spentAmount: number;
  availableAmount: number;
  status: FinanceStatus;
}

export interface FiscalYear {
  id: string;
  fiscalYear: string;
  startDate: string;
  endDate: string;
  status: FinanceStatus;
  closedBy?: string;
  closeDate?: string;
}

export interface BudgetPlan {
  id: string;
  budgetCode: string;
  department: string;
  costCenter: string;
  program: string;
  category: string;
  estimatedAmount: number;
  justification: string;
  priority: string;
  status: FinanceStatus;
}

export interface BudgetTransfer {
  id: string;
  transferNumber: string;
  sourceBudget: string;
  destinationBudget: string;
  amount: number;
  reason: string;
  status: FinanceStatus;
}

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  department: string;
  manager: string;
  budget: number;
  status: FinanceStatus;
}

export interface ProgramProject {
  id: string;
  programCode: string;
  name: string;
  budget: number;
  spent: number;
  remaining: number;
  status: FinanceStatus;
  manager: string;
}

export interface Commitment {
  id: string;
  commitmentNumber: string;
  supplier: string;
  amount: number;
  budget: string;
  status: FinanceStatus;
}

export interface Expenditure {
  id: string;
  expenditureNumber: string;
  department: string;
  category: string;
  supplier?: string;
  amount: number;
  paymentStatus: FinanceStatus;
  budget: string;
  date: string;
  purpose: string;
  status: FinanceStatus;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplier: string;
  purchaseOrder?: string;
  amount: number;
  dueDate: string;
  status: FinanceStatus;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  supplier: string;
  invoice: string;
  amount: number;
  paymentDate: string;
  method: string;
  reference: string;
  status: FinanceStatus;
}

export interface AccountsPayable {
  id: string;
  supplier: string;
  outstandingAmount: number;
  dueDate: string;
  priority: string;
  status: FinanceStatus;
}

export interface AccountsReceivable {
  id: string;
  payer: string;
  amount: number;
  dueDate: string;
  category: string;
  status: FinanceStatus;
}

export interface RevenueRecord {
  id: string;
  category: string;
  source: string;
  amount: number;
  receivedDate: string;
  status: FinanceStatus;
}

export interface FinanceApproval {
  id: string;
  type: string;
  reference: string;
  requester: string;
  amount: number;
  submittedDate: string;
  status: FinanceStatus;
}

export interface FinanceAuditEntry {
  id: string;
  event: string;
  description: string;
  performedBy: string;
  date: string;
  previousValue?: string;
  newValue?: string;
}

export const FINANCE_DASHBOARD_KPIS = {
  totalAnnualBudget: 12500000000,
  budgetUtilized: 7820000000,
  budgetRemaining: 4680000000,
  outstandingCommitments: 1240000000,
  pendingPayments: 18,
  paidInvoices: 342,
  outstandingInvoices: 28,
  activeCostCenters: 48,
  budgetVariance: -2.4,
  currentFiscalPeriod: 'FY 2025/2026',
};

export const BUDGET_BY_DEPARTMENT = [
  { name: 'Operations', value: 3200 },
  { name: 'Medical', value: 1850 },
  { name: 'IT', value: 1420 },
  { name: 'Training', value: 980 },
  { name: 'Logistics', value: 1240 },
  { name: 'HR', value: 650 },
  { name: 'Facilities', value: 890 },
];

export const MONTHLY_EXPENDITURE = [
  { month: 'Feb', budget: 980, actual: 920 },
  { month: 'Mar', budget: 1020, actual: 1050 },
  { month: 'Apr', budget: 1050, actual: 980 },
  { month: 'May', budget: 1100, actual: 1120 },
  { month: 'Jun', budget: 1080, actual: 1090 },
  { month: 'Jul', budget: 1150, actual: 1080 },
];

export const SPENDING_BY_CATEGORY = [
  { name: 'Personnel', value: 4200 },
  { name: 'Equipment', value: 1850 },
  { name: 'Infrastructure', value: 1240 },
  { name: 'Training', value: 680 },
  { name: 'Maintenance', value: 520 },
  { name: 'Logistics', value: 890 },
  { name: 'Operations', value: 1420 },
];

export const INVOICE_STATUS_BREAKDOWN = [
  { name: 'Pending', value: 28 },
  { name: 'Approved', value: 45 },
  { name: 'Paid', value: 342 },
  { name: 'Overdue', value: 12 },
];

export const MOCK_FISCAL_YEARS: FiscalYear[] = [
  { id: 'fy1', fiscalYear: '2025/2026', startDate: '2025-07-01', endDate: '2026-06-30', status: 'OPEN' },
  { id: 'fy2', fiscalYear: '2024/2025', startDate: '2024-07-01', endDate: '2025-06-30', status: 'CLOSED', closedBy: 'Eric Niyonsenga', closeDate: '2025-07-15' },
  { id: 'fy3', fiscalYear: '2023/2024', startDate: '2023-07-01', endDate: '2024-06-30', status: 'ARCHIVED' },
];

export const MOCK_BUDGETS: BudgetRecord[] = [
  { id: 'b1', budgetCode: 'BUD-IT-2026', department: 'IT', costCenter: 'CC-IT-001', program: 'Digital Transformation', category: 'Capital', fiscalYear: 2026, allocatedAmount: 450000000, committedAmount: 125000000, spentAmount: 98000000, availableAmount: 227000000, status: 'ACTIVE' },
  { id: 'b2', budgetCode: 'BUD-MED-2026', department: 'Medical', costCenter: 'CC-MED-001', program: 'Clinical Services', category: 'Operations', fiscalYear: 2026, allocatedAmount: 280000000, committedAmount: 85000000, spentAmount: 72000000, availableAmount: 123000000, status: 'ACTIVE' },
  { id: 'b3', budgetCode: 'BUD-OPS-2026', department: 'Operations', costCenter: 'CC-OPS-001', category: 'Operations', fiscalYear: 2026, allocatedAmount: 620000000, committedAmount: 420000000, spentAmount: 385000000, availableAmount: 55000000, status: 'ACTIVE' },
  { id: 'b4', budgetCode: 'BUD-TRN-2026', department: 'Training', costCenter: 'CC-TRN-001', program: 'Capacity Building', category: 'Training', fiscalYear: 2026, allocatedAmount: 180000000, committedAmount: 45000000, spentAmount: 38000000, availableAmount: 97000000, status: 'ACTIVE' },
];

export const MOCK_BUDGET_PLANS: BudgetPlan[] = [
  { id: 'bp1', budgetCode: 'PLAN-IT-2027', department: 'IT', costCenter: 'CC-IT-001', program: 'Cloud Migration', category: 'Capital', estimatedAmount: 520000000, justification: 'Infrastructure modernization', priority: 'High', status: 'SUBMITTED' },
  { id: 'bp2', budgetCode: 'PLAN-MED-2027', department: 'Medical', costCenter: 'CC-MED-001', program: 'Equipment Upgrade', category: 'Capital', estimatedAmount: 195000000, justification: 'Replace aging diagnostic equipment', priority: 'High', status: 'APPROVED' },
];

export const MOCK_TRANSFERS: BudgetTransfer[] = [
  { id: 'bt1', transferNumber: 'BTR-2026-0012', sourceBudget: 'BUD-OPS-2026', destinationBudget: 'BUD-MED-2026', amount: 15000000, reason: 'Emergency medical supplies allocation', status: 'APPROVED' },
  { id: 'bt2', transferNumber: 'BTR-2026-0011', sourceBudget: 'BUD-TRN-2026', destinationBudget: 'BUD-IT-2026', amount: 8000000, reason: 'Training platform IT support', status: 'PENDING' },
];

export const MOCK_COST_CENTERS: CostCenter[] = [
  { id: 'cc1', code: 'CC-IT-001', name: 'IT Operations', department: 'IT', manager: 'Alice Uwase', budget: 450000000, status: 'ACTIVE' },
  { id: 'cc2', code: 'CC-MED-001', name: 'Medical Services', department: 'Medical', manager: 'Dr. Claire Mutesi', budget: 280000000, status: 'ACTIVE' },
  { id: 'cc3', code: 'CC-OPS-001', name: 'General Operations', department: 'Operations', manager: 'Jean Mukamana', budget: 620000000, status: 'ACTIVE' },
  { id: 'cc4', code: 'CC-TRN-001', name: 'Training & Development', department: 'Training', manager: 'Fabrice Nkurunziza', budget: 180000000, status: 'ACTIVE' },
];

export const MOCK_PROGRAMS: ProgramProject[] = [
  { id: 'pg1', programCode: 'PRG-DT-001', name: 'Digital Transformation', budget: 450000000, spent: 223000000, remaining: 227000000, status: 'ACTIVE', manager: 'Alice Uwase' },
  { id: 'pg2', programCode: 'PRG-CS-001', name: 'Clinical Services', budget: 280000000, spent: 157000000, remaining: 123000000, status: 'ACTIVE', manager: 'Dr. Claire Mutesi' },
  { id: 'pg3', programCode: 'PRG-CB-001', name: 'Capacity Building', budget: 180000000, spent: 83000000, remaining: 97000000, status: 'ACTIVE', manager: 'Fabrice Nkurunziza' },
];

export const MOCK_COMMITMENTS: Commitment[] = [
  { id: 'cm1', commitmentNumber: 'CMT-2026-0089', supplier: 'MedEquip Rwanda', amount: 45000000, budget: 'BUD-MED-2026', status: 'COMMITTED' },
  { id: 'cm2', commitmentNumber: 'CMT-2026-0088', supplier: 'TechParts East Africa', amount: 125000000, budget: 'BUD-IT-2026', status: 'COMMITTED' },
  { id: 'cm3', commitmentNumber: 'CMT-2026-0087', supplier: 'BuildCorp Ltd', amount: 85000000, budget: 'BUD-OPS-2026', status: 'PARTIAL' },
];

export const MOCK_EXPENDITURES: Expenditure[] = [
  { id: 'e1', expenditureNumber: 'EXP-2026-0456', department: 'Medical', category: 'Medical Supplies', supplier: 'MedEquip Rwanda', amount: 45000000, paymentStatus: 'PENDING', budget: 'BUD-MED-2026', date: '2026-07-05', purpose: 'Clinical consumables Q3', status: 'APPROVED' },
  { id: 'e2', expenditureNumber: 'EXP-2026-0455', department: 'IT', category: 'Equipment', supplier: 'TechParts East Africa', amount: 125000000, paymentStatus: 'PAID', budget: 'BUD-IT-2026', date: '2026-07-03', purpose: 'Server infrastructure upgrade', status: 'PAID' },
  { id: 'e3', expenditureNumber: 'EXP-2026-0454', department: 'Training', category: 'Training', amount: 12000000, paymentStatus: 'APPROVED', budget: 'BUD-TRN-2026', date: '2026-07-01', purpose: 'Leadership development program', status: 'APPROVED' },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'INV-MED-2026-0456', supplier: 'MedEquip Rwanda', purchaseOrder: 'PO-2026-0156', amount: 45000000, dueDate: '2026-07-20', status: 'PENDING' },
  { id: 'inv2', invoiceNumber: 'INV-TEC-2026-0789', supplier: 'TechParts East Africa', purchaseOrder: 'PO-2026-0154', amount: 125000000, dueDate: '2026-07-15', status: 'PAID' },
  { id: 'inv3', invoiceNumber: 'INV-OFF-2026-0234', supplier: 'Rwanda Office Supplies Ltd', purchaseOrder: 'PO-2026-0155', amount: 8500000, dueDate: '2026-07-10', status: 'OVERDUE' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', paymentNumber: 'PAY-2026-0234', supplier: 'TechParts East Africa', invoice: 'INV-TEC-2026-0789', amount: 125000000, paymentDate: '2026-07-08', method: 'Bank Transfer', reference: 'TRF-20260708-001', status: 'COMPLETED' },
  { id: 'p2', paymentNumber: 'PAY-2026-0235', supplier: 'MedEquip Rwanda', invoice: 'INV-MED-2026-0456', amount: 45000000, paymentDate: '2026-07-22', method: 'Bank Transfer', reference: '—', status: 'PENDING' },
];

export const MOCK_PAYABLES: AccountsPayable[] = [
  { id: 'ap1', supplier: 'MedEquip Rwanda', outstandingAmount: 45000000, dueDate: '2026-07-20', priority: 'High', status: 'PENDING' },
  { id: 'ap2', supplier: 'Rwanda Office Supplies Ltd', outstandingAmount: 8500000, dueDate: '2026-07-10', priority: 'Normal', status: 'OVERDUE' },
];

export const MOCK_RECEIVABLES: AccountsReceivable[] = [
  { id: 'ar1', payer: 'External Training Client', amount: 5500000, dueDate: '2026-07-25', category: 'Training Fees', status: 'PENDING' },
  { id: 'ar2', payer: 'Facility Rental — Partner Org', amount: 3200000, dueDate: '2026-08-01', category: 'Rental Income', status: 'PENDING' },
];

export const MOCK_REVENUE: RevenueRecord[] = [
  { id: 'rev1', category: 'Government Funding', source: 'MOD Allocation', amount: 12500000000, receivedDate: '2025-07-01', status: 'COMPLETED' },
  { id: 'rev2', category: 'Service Revenue', source: 'Training Fees', amount: 18500000, receivedDate: '2026-06-30', status: 'COMPLETED' },
  { id: 'rev3', category: 'Grants', source: 'Partnership Grant', amount: 45000000, receivedDate: '2026-05-15', status: 'COMPLETED' },
];

export const MOCK_APPROVALS: FinanceApproval[] = [
  { id: 'fa1', type: 'Budget Transfer', reference: 'BTR-2026-0011', requester: 'Fabrice Nkurunziza', amount: 8000000, submittedDate: '2026-07-06', status: 'PENDING' },
  { id: 'fa2', type: 'Payment', reference: 'PAY-2026-0235', requester: 'Eric Niyonsenga', amount: 45000000, submittedDate: '2026-07-05', status: 'PENDING' },
  { id: 'fa3', type: 'Invoice', reference: 'INV-MED-2026-0456', requester: 'Dr. Claire Mutesi', amount: 45000000, submittedDate: '2026-07-04', status: 'APPROVED' },
];

export const MOCK_CALENDAR_EVENTS = [
  { id: 'fc1', title: 'Q1 Budget Review Deadline', date: '2026-09-30', type: 'Budget' },
  { id: 'fc2', title: 'Fiscal Year Close — FY 2025/2026', date: '2026-06-30', type: 'Fiscal' },
  { id: 'fc3', title: 'Payment Run — July', date: '2026-07-25', type: 'Payment' },
  { id: 'fc4', title: 'Annual Audit', date: '2026-08-15', type: 'Audit' },
];

export const MOCK_AUDIT_HISTORY: FinanceAuditEntry[] = [
  { id: 'au1', event: 'Budget Transfer Approved', description: 'BTR-2026-0012 — OPS to MED', performedBy: 'Eric Niyonsenga', date: '2026-07-05T00:00:00Z', previousValue: 'BUD-OPS: 635M', newValue: 'BUD-OPS: 620M' },
  { id: 'au2', event: 'Payment Completed', description: 'PAY-2026-0234 — TechParts EA', performedBy: 'Eric Niyonsenga', date: '2026-07-08T00:00:00Z' },
  { id: 'au3', event: 'Expenditure Approved', description: 'EXP-2026-0456 — Medical supplies', performedBy: 'Marie Uwase', date: '2026-07-05T00:00:00Z' },
];
