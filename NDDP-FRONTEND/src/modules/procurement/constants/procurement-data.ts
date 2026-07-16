export type ProcurementStatus =
  | 'DRAFT' | 'PENDING' | 'PENDING_APPROVAL' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
  | 'CANCELLED' | 'RFQ' | 'TENDER' | 'EVALUATION' | 'AWARDED' | 'ORDERED' | 'ISSUED'
  | 'DELIVERED' | 'PARTIALLY_DELIVERED' | 'COMPLETED' | 'CLOSED' | 'ACTIVE' | 'INACTIVE'
  | 'SUSPENDED' | 'OPEN' | 'IN_PROGRESS' | 'MATCHED' | 'MISMATCH' | 'PARTIAL_MATCH'
  | 'PENDING_REVIEW' | 'PUBLISHED' | 'UNDER_REVIEW' | 'EXPIRED' | 'FULFILLED';

export interface PurchaseRequisition {
  id: string;
  requisitionNumber: string;
  department: string;
  requester: string;
  category: string;
  estimatedCost: number;
  priority: string;
  submissionDate: string;
  status: ProcurementStatus;
}

export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  linkedRequisition: string;
  supplierType: string;
  procurementMethod: string;
  expectedDelivery: string;
  budgetReference: string;
  status: ProcurementStatus;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  category: string;
  registrationNumber?: string;
  taxId?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: ProcurementStatus;
  rating?: number;
}

export interface ProcurementPlan {
  id: string;
  planNumber: string;
  financialYear: string;
  department: string;
  category: string;
  estimatedBudget: number;
  priority: string;
  responsibleOfficer: string;
  status: ProcurementStatus;
}

export interface SupplierEvaluation {
  id: string;
  supplierName: string;
  deliveryScore: number;
  qualityScore: number;
  pricingScore: number;
  complianceScore: number;
  overallRating: number;
  period: string;
}

export interface VendorRegistration {
  id: string;
  companyName: string;
  registrationNumber: string;
  category: string;
  submittedDate: string;
  status: ProcurementStatus;
}

export interface RfqRecord {
  id: string;
  rfqNumber: string;
  title: string;
  items: number;
  suppliersInvited: number;
  closingDate: string;
  status: ProcurementStatus;
}

export interface TenderRecord {
  id: string;
  tenderNumber: string;
  title: string;
  budget: number;
  submissionDeadline: string;
  openingDate: string;
  committee: string;
  status: ProcurementStatus;
}

export interface BidRecord {
  id: string;
  tenderNumber: string;
  supplier: string;
  bidAmount: number;
  submissionDate: string;
  compliance: string;
  technicalScore: number;
  financialScore: number;
  status: ProcurementStatus;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  deliveryDate: string;
  deliveryAddress: string;
  status: ProcurementStatus;
}

export interface ContractRecord {
  id: string;
  contractNumber: string;
  supplier: string;
  contractType: string;
  value: number;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  status: ProcurementStatus;
}

export interface GoodsReceiptCoordination {
  id: string;
  receiptNumber: string;
  poNumber: string;
  warehouse: string;
  receiver: string;
  inspection: string;
  status: ProcurementStatus;
}

export interface InvoiceMatch {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  supplier: string;
  amount: number;
  matchResult: ProcurementStatus;
  status: ProcurementStatus;
}

export interface ProcurementApproval {
  id: string;
  type: string;
  reference: string;
  requester: string;
  amount?: number;
  submittedDate: string;
  status: ProcurementStatus;
}

export const PROCUREMENT_DASHBOARD_KPIS = {
  activeRequests: 24,
  pendingRequisitions: 18,
  pendingApprovals: 12,
  ordersIssued: 156,
  openTenders: 5,
  activeContracts: 42,
  registeredSuppliers: 186,
  awaitingDelivery: 23,
  completedProcurements: 89,
  cycleTimeDays: 14,
  procurementSpend: 4850000000,
};

export const PROCUREMENT_BY_CATEGORY = [
  { name: 'IT Equipment', value: 420 },
  { name: 'Office Supplies', value: 380 },
  { name: 'Construction', value: 290 },
  { name: 'Vehicles', value: 186 },
  { name: 'Medical Supplies', value: 245 },
  { name: 'Professional Services', value: 168 },
  { name: 'Maintenance Services', value: 142 },
];

export const PROCUREMENT_STATUS_BREAKDOWN = [
  { name: 'Pending Approval', value: 18 },
  { name: 'RFQ', value: 12 },
  { name: 'Tender', value: 5 },
  { name: 'Ordered', value: 34 },
  { name: 'Delivered', value: 28 },
  { name: 'Closed', value: 89 },
];

export const SUPPLIER_PERFORMANCE = [
  { name: 'Rwanda Office Supplies', delivery: 92, quality: 88, compliance: 95 },
  { name: 'MedEquip Rwanda', delivery: 85, quality: 94, compliance: 90 },
  { name: 'TechParts EA', delivery: 78, quality: 82, compliance: 88 },
  { name: 'BuildCorp Ltd', delivery: 88, quality: 86, compliance: 92 },
];

export const MONTHLY_PROCUREMENT_TREND = [
  { month: 'Feb', requisitions: 42, orders: 38, spend: 380 },
  { month: 'Mar', requisitions: 48, orders: 45, spend: 420 },
  { month: 'Apr', requisitions: 52, orders: 48, spend: 465 },
  { month: 'May', requisitions: 45, orders: 42, spend: 410 },
  { month: 'Jun', requisitions: 58, orders: 52, spend: 520 },
  { month: 'Jul', requisitions: 51, orders: 46, spend: 485 },
];

export const MOCK_REQUISITIONS: PurchaseRequisition[] = [
  { id: 'r1', requisitionNumber: 'PR-2026-0847', department: 'Medical', requester: 'Dr. Claire Mutesi', category: 'Medical Supplies', estimatedCost: 45000000, priority: 'URGENT', submissionDate: '2026-07-05', status: 'PENDING_APPROVAL' },
  { id: 'r2', requisitionNumber: 'PR-2026-0846', department: 'IT', requester: 'Alice Uwase', category: 'IT Equipment', estimatedCost: 125000000, priority: 'ROUTINE', submissionDate: '2026-07-04', status: 'APPROVED' },
  { id: 'r3', requisitionNumber: 'PR-2026-0845', department: 'HR', requester: 'Patrick Habimana', category: 'Office Supplies', estimatedCost: 8500000, priority: 'ROUTINE', submissionDate: '2026-07-03', status: 'SUBMITTED' },
  { id: 'r4', requisitionNumber: 'PR-2026-0844', department: 'Logistics', requester: 'Emmanuel Niyonsenga', category: 'Vehicle Parts', estimatedCost: 22000000, priority: 'CRITICAL', submissionDate: '2026-07-02', status: 'DRAFT' },
];

export const MOCK_PURCHASE_REQUESTS: PurchaseRequest[] = [
  { id: 'pr1', requestNumber: 'PUR-2026-0234', linkedRequisition: 'PR-2026-0846', supplierType: 'Registered', procurementMethod: 'RFQ', expectedDelivery: '2026-08-15', budgetReference: 'FY2026-IT-042', status: 'RFQ' },
  { id: 'pr2', requestNumber: 'PUR-2026-0233', linkedRequisition: 'PR-2026-0847', supplierType: 'Registered', procurementMethod: 'Direct', expectedDelivery: '2026-07-20', budgetReference: 'FY2026-MED-018', status: 'ORDERED' },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 's1', code: 'SUP-001', name: 'Rwanda Office Supplies Ltd', category: 'Office Supplies', registrationNumber: 'RC-2018-45678', taxId: 'TIN-123456789', email: 'info@rwandaoffice.rw', phone: '+250 788 123 456', address: 'Kigali, Rwanda', status: 'ACTIVE', rating: 4.5 },
  { id: 's2', code: 'SUP-002', name: 'MedEquip Rwanda', category: 'Medical Supplies', registrationNumber: 'RC-2019-23456', taxId: 'TIN-987654321', email: 'sales@medequip.rw', phone: '+250 788 234 567', address: 'Kigali, Rwanda', status: 'ACTIVE', rating: 4.8 },
  { id: 's3', code: 'SUP-003', name: 'TechParts East Africa', category: 'IT Equipment', registrationNumber: 'KE-2020-78901', taxId: 'PIN-P051234567', email: 'orders@techparts.co.ke', phone: '+254 712 345 678', address: 'Nairobi, Kenya', status: 'ACTIVE', rating: 4.2 },
  { id: 's4', code: 'SUP-004', name: 'BuildCorp Ltd', category: 'Construction', registrationNumber: 'RC-2017-11223', email: 'tenders@buildcorp.rw', status: 'ACTIVE', rating: 4.0 },
];

export const MOCK_PLANS: ProcurementPlan[] = [
  { id: 'pl1', planNumber: 'PP-FY2026-001', financialYear: '2025/2026', department: 'IT', category: 'IT Equipment', estimatedBudget: 450000000, priority: 'High', responsibleOfficer: 'Alice Uwase', status: 'APPROVED' },
  { id: 'pl2', planNumber: 'PP-FY2026-002', financialYear: '2025/2026', department: 'Medical', category: 'Medical Supplies', estimatedBudget: 280000000, priority: 'High', responsibleOfficer: 'Dr. Claire Mutesi', status: 'IN_PROGRESS' },
];

export const MOCK_EVALUATIONS: SupplierEvaluation[] = [
  { id: 'e1', supplierName: 'Rwanda Office Supplies Ltd', deliveryScore: 92, qualityScore: 88, pricingScore: 85, complianceScore: 95, overallRating: 90, period: 'Q2 2026' },
  { id: 'e2', supplierName: 'MedEquip Rwanda', deliveryScore: 85, qualityScore: 94, pricingScore: 78, complianceScore: 90, overallRating: 87, period: 'Q2 2026' },
];

export const MOCK_VENDOR_REGISTRATIONS: VendorRegistration[] = [
  { id: 'vr1', companyName: 'GreenTech Solutions', registrationNumber: 'RC-2026-00123', category: 'IT Equipment', submittedDate: '2026-07-01', status: 'UNDER_REVIEW' },
  { id: 'vr2', companyName: 'SafeGuard Insurance', registrationNumber: 'RC-2025-98765', category: 'Professional Services', submittedDate: '2026-06-28', status: 'PENDING' },
];

export const MOCK_RFQS: RfqRecord[] = [
  { id: 'rfq1', rfqNumber: 'RFQ-2026-0045', title: 'Laptop Procurement Q3', items: 3, suppliersInvited: 5, closingDate: '2026-07-20', status: 'OPEN' },
  { id: 'rfq2', rfqNumber: 'RFQ-2026-0044', title: 'Office Furniture', items: 8, suppliersInvited: 4, closingDate: '2026-07-15', status: 'EVALUATION' },
];

export const MOCK_TENDERS: TenderRecord[] = [
  { id: 't1', tenderNumber: 'TND-2026-0012', title: 'Kanombe Barracks Renovation', budget: 850000000, submissionDeadline: '2026-08-01', openingDate: '2026-08-05', committee: 'Works Committee', status: 'PUBLISHED' },
  { id: 't2', tenderNumber: 'TND-2026-0011', title: 'Fleet Vehicle Acquisition', budget: 420000000, submissionDeadline: '2026-07-25', openingDate: '2026-07-28', committee: 'Procurement Board', status: 'EVALUATION' },
];

export const MOCK_BIDS: BidRecord[] = [
  { id: 'b1', tenderNumber: 'TND-2026-0011', supplier: 'Toyota Rwanda', bidAmount: 398000000, submissionDate: '2026-07-22', compliance: 'Compliant', technicalScore: 88, financialScore: 92, status: 'UNDER_REVIEW' },
  { id: 'b2', tenderNumber: 'TND-2026-0011', supplier: 'Vehicle World Ltd', bidAmount: 415000000, submissionDate: '2026-07-23', compliance: 'Compliant', technicalScore: 85, financialScore: 88, status: 'UNDER_REVIEW' },
];

export const MOCK_ORDERS: PurchaseOrder[] = [
  { id: 'o1', poNumber: 'PO-2026-0156', supplier: 'MedEquip Rwanda', items: 5, totalAmount: 45000000, deliveryDate: '2026-07-20', deliveryAddress: 'Kanombe Medical Centre', status: 'ISSUED' },
  { id: 'o2', poNumber: 'PO-2026-0155', supplier: 'Rwanda Office Supplies Ltd', items: 12, totalAmount: 8500000, deliveryDate: '2026-07-12', deliveryAddress: 'Kigali HQ', status: 'PARTIALLY_DELIVERED' },
  { id: 'o3', poNumber: 'PO-2026-0154', supplier: 'TechParts East Africa', items: 8, totalAmount: 125000000, deliveryDate: '2026-08-15', deliveryAddress: 'Kigali HQ — IT Wing', status: 'APPROVED' },
];

export const MOCK_CONTRACTS: ContractRecord[] = [
  { id: 'c1', contractNumber: 'CNT-2025-0089', supplier: 'BuildCorp Ltd', contractType: 'Construction', value: 1200000000, startDate: '2025-06-01', endDate: '2026-12-31', renewalDate: '2026-11-01', status: 'ACTIVE' },
  { id: 'c2', contractNumber: 'CNT-2024-0045', supplier: 'MedEquip Rwanda', contractType: 'Supply Agreement', value: 280000000, startDate: '2024-01-01', endDate: '2026-12-31', status: 'ACTIVE' },
];

export const MOCK_RECEIPT_COORDINATION: GoodsReceiptCoordination[] = [
  { id: 'rc1', receiptNumber: 'GRC-2026-0089', poNumber: 'PO-2026-0155', warehouse: 'Central Warehouse', receiver: 'Jean Mukamana', inspection: 'Passed', status: 'COMPLETED' },
  { id: 'rc2', receiptNumber: 'GRC-2026-0090', poNumber: 'PO-2026-0156', warehouse: 'Medical Store', receiver: 'Dr. Claire Mutesi', inspection: 'Pending', status: 'IN_PROGRESS' },
];

export const MOCK_INVOICE_MATCHES: InvoiceMatch[] = [
  { id: 'im1', invoiceNumber: 'INV-MED-2026-0456', poNumber: 'PO-2026-0155', supplier: 'Rwanda Office Supplies Ltd', amount: 8500000, matchResult: 'MATCHED', status: 'COMPLETED' },
  { id: 'im2', invoiceNumber: 'INV-TEC-2026-0789', poNumber: 'PO-2026-0154', supplier: 'TechParts East Africa', amount: 128000000, matchResult: 'MISMATCH', status: 'PENDING_REVIEW' },
];

export const MOCK_APPROVALS: ProcurementApproval[] = [
  { id: 'a1', type: 'Purchase Requisition', reference: 'PR-2026-0847', requester: 'Dr. Claire Mutesi', amount: 45000000, submittedDate: '2026-07-05', status: 'PENDING' },
  { id: 'a2', type: 'Purchase Order', reference: 'PO-2026-0154', requester: 'Alice Uwase', amount: 125000000, submittedDate: '2026-07-04', status: 'PENDING' },
  { id: 'a3', type: 'Tender Award', reference: 'TND-2026-0011', requester: 'Procurement Office', submittedDate: '2026-07-03', status: 'PENDING' },
];

export const MOCK_CALENDAR_EVENTS = [
  { id: 'cal1', title: 'Tender Deadline — Fleet Vehicles', date: '2026-07-25', type: 'Tender' },
  { id: 'cal2', title: 'Contract Renewal — MedEquip', date: '2026-11-01', type: 'Contract' },
  { id: 'cal3', title: 'Delivery — PO-2026-0156', date: '2026-07-20', type: 'Delivery' },
  { id: 'cal4', title: 'Bid Evaluation Meeting', date: '2026-07-28', type: 'Evaluation' },
];

export const MOCK_SUPPLIER_PROFILES = MOCK_SUPPLIERS.map((s) => ({
  ...s,
  overview: `${s.name} is a registered supplier in the ${s.category} category.`,
  contractsCount: 3,
  ordersCount: 12,
  totalSpend: 185000000,
}));
