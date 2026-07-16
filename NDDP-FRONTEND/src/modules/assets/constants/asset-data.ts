export type AssetStatus =
  | 'REGISTERED' | 'AVAILABLE' | 'ASSIGNED' | 'IN_MAINTENANCE' | 'DISPOSED' | 'LOST'
  | 'RESERVED' | 'RETIRED' | 'UNDER_MAINTENANCE' | 'DUE_INSPECTION' | 'EXPIRED'
  | 'PENDING' | 'APPROVED' | 'COMPLETED' | 'SCHEDULED' | 'PASS' | 'FAIL'
  | 'ACTIVE' | 'IN_PROGRESS' | 'EXPIRING_SOON';

export interface AssetRecord {
  id: string;
  assetNumber: string;
  name: string;
  category: string;
  type: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  department: string;
  assignedTo?: string;
  status: AssetStatus;
  purchaseDate?: string;
  location: string;
  condition?: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  status: AssetStatus;
  assetCount?: number;
}

export interface AssetType {
  id: string;
  name: string;
  category: string;
  usefulLife: string;
  maintenanceSchedule: string;
  inspectionFrequency: string;
}

export interface AssetAssignment {
  id: string;
  assetNumber: string;
  assetName: string;
  personnelName: string;
  department: string;
  assignmentDate: string;
  expectedReturn?: string;
  status: AssetStatus;
  condition?: string;
}

export interface AssetTransfer {
  id: string;
  assetNumber: string;
  assetName: string;
  fromOwner: string;
  toOwner: string;
  department: string;
  transferDate: string;
  reason: string;
  status: AssetStatus;
}

export interface AssetReturn {
  id: string;
  assetNumber: string;
  assetName: string;
  personnelName: string;
  returnedDate: string;
  condition: string;
  inspector: string;
  status: AssetStatus;
}

export interface MaintenanceRecord {
  id: string;
  maintenanceNumber: string;
  assetNumber: string;
  assetName: string;
  technician: string;
  scheduledDate: string;
  completionDate?: string;
  cost?: number;
  type: string;
  status: AssetStatus;
}

export interface InspectionRecord {
  id: string;
  assetNumber: string;
  assetName: string;
  inspectionDate: string;
  inspector: string;
  condition: string;
  compliance: string;
  status: AssetStatus;
}

export interface WarrantyRecord {
  id: string;
  assetNumber: string;
  assetName: string;
  warrantyNumber: string;
  provider: string;
  startDate: string;
  expiryDate: string;
  coverage: string;
  status: AssetStatus;
}

export interface AssetReservation {
  id: string;
  assetName: string;
  requester: string;
  reservationDate: string;
  returnDate: string;
  status: AssetStatus;
}

export interface AssetDisposal {
  id: string;
  assetNumber: string;
  assetName: string;
  method: string;
  reason: string;
  disposalDate: string;
  value?: number;
  status: AssetStatus;
}

export interface AssetAuditEntry {
  id: string;
  assetNumber?: string;
  event: string;
  description: string;
  performedBy: string;
  date: string;
}

export interface AssetDocument {
  id: string;
  name: string;
  type: string;
  assetNumber?: string;
  uploadedAt: string;
}

export interface AssetProfile {
  id: string;
  assetNumber: string;
  name: string;
  category: string;
  type: string;
  status: AssetStatus;
  location: string;
  assignedTo?: string;
  department: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: string;
  supplier?: string;
  currentValue?: number;
  custodian?: string;
}

export const ASSET_DASHBOARD_KPIS = {
  totalAssets: 3842,
  assignedAssets: 2156,
  availableAssets: 1420,
  underMaintenance: 86,
  dueInspection: 124,
  expiredWarranties: 18,
  reservedAssets: 42,
  disposedAssets: 38,
  pendingRequests: 15,
  utilizationRate: 72,
};

export const ASSETS_BY_CATEGORY = [
  { name: 'IT Equipment', value: 1240 },
  { name: 'Office Furniture', value: 680 },
  { name: 'Communication', value: 420 },
  { name: 'Vehicles', value: 186 },
  { name: 'Medical Equipment', value: 312 },
  { name: 'Engineering', value: 520 },
  { name: 'Training Equipment', value: 284 },
];

export const ASSET_STATUS_BREAKDOWN = [
  { name: 'Available', value: 1420 },
  { name: 'Assigned', value: 2156 },
  { name: 'Under Maintenance', value: 86 },
  { name: 'Reserved', value: 42 },
  { name: 'Disposed', value: 38 },
];

export const ASSETS_BY_DEPARTMENT = [
  { name: 'IT', value: 520 }, { name: 'HR', value: 180 }, { name: 'Logistics', value: 890 },
  { name: 'Medical', value: 312 }, { name: 'Finance', value: 245 }, { name: 'Training', value: 284 },
];

export const MONTHLY_MAINTENANCE_TREND = [
  { month: 'Jan', activities: 42 }, { month: 'Feb', activities: 38 }, { month: 'Mar', activities: 55 },
  { month: 'Apr', activities: 48 }, { month: 'May', activities: 62 }, { month: 'Jun', activities: 51 },
  { month: 'Jul', activities: 35 },
];

export const WARRANTY_EXPIRY_TIMELINE = [
  { month: 'Jul', count: 8 }, { month: 'Aug', count: 12 }, { month: 'Sep', count: 6 },
  { month: 'Oct', count: 15 }, { month: 'Nov', count: 9 }, { month: 'Dec', count: 11 },
];

export const MOCK_ASSETS: AssetRecord[] = [
  { id: 'a1', assetNumber: 'AST-2024-00892', name: 'Dell Latitude 5540', category: 'IT Equipment', type: 'Laptop', serialNumber: 'DL5540-89234', manufacturer: 'Dell', model: 'Latitude 5540', department: 'IT', assignedTo: 'Alice Uwase', status: 'ASSIGNED', purchaseDate: '2024-03-15', location: 'Kigali HQ — IT Wing', condition: 'Good' },
  { id: 'a2', assetNumber: 'AST-2023-00456', name: 'HP LaserJet Pro M404', category: 'IT Equipment', type: 'Printer', serialNumber: 'HP404-45678', manufacturer: 'HP', model: 'LaserJet Pro M404', department: 'HR', assignedTo: 'Patrick Habimana', status: 'ASSIGNED', purchaseDate: '2023-08-20', location: 'Kigali HQ — HR Floor', condition: 'Good' },
  { id: 'a3', assetNumber: 'AST-2022-00123', name: 'Toyota Hilux 4x4', category: 'Vehicles', type: 'Vehicle', serialNumber: 'RAB 123A', manufacturer: 'Toyota', model: 'Hilux', department: 'Logistics', assignedTo: 'Emmanuel Niyonsenga', status: 'ASSIGNED', purchaseDate: '2022-01-10', location: 'Kanombe Depot', condition: 'Fair' },
  { id: 'a4', assetNumber: 'AST-2025-00201', name: 'Epson EB-X49 Projector', category: 'Office Equipment', type: 'Projector', serialNumber: 'EPX49-20199', manufacturer: 'Epson', model: 'EB-X49', department: 'Training', status: 'AVAILABLE', purchaseDate: '2025-06-01', location: 'Training Centre — Room A', condition: 'Excellent' },
  { id: 'a5', assetNumber: 'AST-2021-00789', name: 'Defibrillator AED Plus', category: 'Medical Equipment', type: 'Medical Device', serialNumber: 'ZOLL-78901', manufacturer: 'ZOLL', model: 'AED Plus', department: 'Medical', status: 'IN_MAINTENANCE', purchaseDate: '2021-11-05', location: 'Kanombe Medical Centre', condition: 'Under Service' },
];

export const MOCK_CATEGORIES: AssetCategory[] = [
  { id: 'cat1', name: 'Information Technology', code: 'IT', description: 'Computers, servers, networking', status: 'ACTIVE', assetCount: 1240 },
  { id: 'cat2', name: 'Office Equipment', code: 'OFF', description: 'Printers, projectors, copiers', status: 'ACTIVE', assetCount: 680 },
  { id: 'cat3', name: 'Furniture', code: 'FUR', description: 'Desks, chairs, cabinets', status: 'ACTIVE', assetCount: 420 },
  { id: 'cat4', name: 'Vehicles', code: 'VEH', description: 'Cars, trucks, motorcycles', status: 'ACTIVE', assetCount: 186 },
  { id: 'cat5', name: 'Medical Equipment', code: 'MED', description: 'Clinical and diagnostic equipment', status: 'ACTIVE', assetCount: 312 },
  { id: 'cat6', name: 'Communications Equipment', code: 'COM', description: 'Radios, phones, satellite', status: 'ACTIVE', assetCount: 420 },
];

export const MOCK_TYPES: AssetType[] = [
  { id: 't1', name: 'Laptop', category: 'IT Equipment', usefulLife: '4 years', maintenanceSchedule: 'Annual', inspectionFrequency: 'Annual' },
  { id: 't2', name: 'Desktop', category: 'IT Equipment', usefulLife: '5 years', maintenanceSchedule: 'Annual', inspectionFrequency: 'Annual' },
  { id: 't3', name: 'Printer', category: 'IT Equipment', usefulLife: '5 years', maintenanceSchedule: 'Semi-annual', inspectionFrequency: 'Annual' },
  { id: 't4', name: 'Vehicle', category: 'Vehicles', usefulLife: '10 years', maintenanceSchedule: 'Quarterly', inspectionFrequency: 'Monthly' },
  { id: 't5', name: 'Projector', category: 'Office Equipment', usefulLife: '6 years', maintenanceSchedule: 'Annual', inspectionFrequency: 'Annual' },
];

export const MOCK_PROFILES: AssetProfile[] = MOCK_ASSETS.map((a) => ({
  id: a.id,
  assetNumber: a.assetNumber,
  name: a.name,
  category: a.category,
  type: a.type,
  status: a.status,
  location: a.location,
  assignedTo: a.assignedTo,
  department: a.department,
  manufacturer: a.manufacturer,
  model: a.model,
  serialNumber: a.serialNumber,
  purchaseDate: a.purchaseDate,
  supplier: 'MOD Procurement',
  currentValue: 850000,
  custodian: a.assignedTo ?? 'Asset Store',
}));

export const MOCK_ASSIGNMENTS: AssetAssignment[] = [
  { id: 'as1', assetNumber: 'AST-2024-00892', assetName: 'Dell Latitude 5540', personnelName: 'Alice Uwase', department: 'IT', assignmentDate: '2024-03-20', expectedReturn: '2028-03-20', status: 'ASSIGNED', condition: 'Good' },
  { id: 'as2', assetNumber: 'AST-2023-00456', assetName: 'HP LaserJet Pro M404', personnelName: 'Patrick Habimana', department: 'HR', assignmentDate: '2023-09-01', status: 'ASSIGNED', condition: 'Good' },
];

export const MOCK_TRANSFERS: AssetTransfer[] = [
  { id: 'tr1', assetNumber: 'AST-2023-00234', assetName: 'Lenovo ThinkPad T14', fromOwner: 'Claire Mutesi', toOwner: 'Fabrice Nkurunziza', department: 'Finance', transferDate: '2026-07-05', reason: 'Department reorganization', status: 'COMPLETED' },
];

export const MOCK_RETURNS: AssetReturn[] = [
  { id: 'rt1', assetNumber: 'AST-2020-00345', assetName: 'Dell OptiPlex 7080', personnelName: 'Grace Ingabire', returnedDate: '2026-07-06', condition: 'Fair — minor wear', inspector: 'Jean Mukamana', status: 'COMPLETED' },
];

export const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  { id: 'm1', maintenanceNumber: 'MNT-2026-0045', assetNumber: 'AST-2021-00789', assetName: 'Defibrillator AED Plus', technician: 'Medical Engineering', scheduledDate: '2026-07-08', type: 'Corrective', status: 'IN_PROGRESS' },
  { id: 'm2', maintenanceNumber: 'MNT-2026-0042', assetNumber: 'AST-2022-00123', assetName: 'Toyota Hilux 4x4', technician: 'Fleet Workshop', scheduledDate: '2026-07-01', completionDate: '2026-07-03', cost: 450000, type: 'Preventive', status: 'COMPLETED' },
];

export const MOCK_INSPECTIONS: InspectionRecord[] = [
  { id: 'in1', assetNumber: 'AST-2022-00123', assetName: 'Toyota Hilux 4x4', inspectionDate: '2026-07-01', inspector: 'Fleet Inspector', condition: 'Roadworthy', compliance: 'Compliant', status: 'PASS' },
  { id: 'in2', assetNumber: 'AST-2024-00892', assetName: 'Dell Latitude 5540', inspectionDate: '2026-06-15', inspector: 'IT Asset Officer', condition: 'Good', compliance: 'Compliant', status: 'PASS' },
];

export const MOCK_WARRANTIES: WarrantyRecord[] = [
  { id: 'w1', assetNumber: 'AST-2024-00892', assetName: 'Dell Latitude 5540', warrantyNumber: 'WAR-DELL-89234', provider: 'Dell Technologies', startDate: '2024-03-15', expiryDate: '2027-03-15', coverage: 'ProSupport Plus', status: 'ACTIVE' },
  { id: 'w2', assetNumber: 'AST-2023-00456', assetName: 'HP LaserJet Pro M404', warrantyNumber: 'WAR-HP-45678', provider: 'HP Inc.', startDate: '2023-08-20', expiryDate: '2026-08-20', coverage: 'Standard', status: 'EXPIRING_SOON' },
];

export const MOCK_RESERVATIONS: AssetReservation[] = [
  { id: 'rs1', assetName: 'Epson EB-X49 Projector', requester: 'Patrick Habimana', reservationDate: '2026-07-10', returnDate: '2026-07-10', status: 'APPROVED' },
  { id: 'rs2', assetName: 'Conference AV Kit', requester: 'Claire Mutesi', reservationDate: '2026-07-15', returnDate: '2026-07-16', status: 'PENDING' },
];

export const MOCK_DISPOSALS: AssetDisposal[] = [
  { id: 'd1', assetNumber: 'AST-2018-00089', assetName: 'HP EliteBook 840 G5', method: 'Recycling', reason: 'End of useful life', disposalDate: '2026-06-20', value: 0, status: 'COMPLETED' },
];

export const MOCK_AUDIT_HISTORY: AssetAuditEntry[] = [
  { id: 'au1', assetNumber: 'AST-2024-00892', event: 'Asset Assigned', description: 'Assigned to Alice Uwase — IT', performedBy: 'Jean Mukamana', date: '2024-03-20T00:00:00Z' },
  { id: 'au2', assetNumber: 'AST-2022-00123', event: 'Maintenance Completed', description: 'MNT-2026-0042 — Preventive service', performedBy: 'Fleet Workshop', date: '2026-07-03T00:00:00Z' },
  { id: 'au3', assetNumber: 'AST-2020-00345', event: 'Asset Returned', description: 'Returned by Grace Ingabire — Fair condition', performedBy: 'Jean Mukamana', date: '2026-07-06T00:00:00Z' },
  { id: 'au4', event: 'Annual Audit', description: 'Q2 2026 asset verification — 98.2% match rate', performedBy: 'Internal Audit', date: '2026-06-30T00:00:00Z' },
];

export const MOCK_DOCUMENTS: AssetDocument[] = [
  { id: 'doc1', name: 'Purchase Invoice — Dell Latitude', type: 'INVOICE', assetNumber: 'AST-2024-00892', uploadedAt: '2024-03-15T00:00:00Z' },
  { id: 'doc2', name: 'Warranty Certificate — HP Printer', type: 'WARRANTY', assetNumber: 'AST-2023-00456', uploadedAt: '2023-08-20T00:00:00Z' },
  { id: 'doc3', name: 'Inspection Report — Hilux', type: 'INSPECTION', assetNumber: 'AST-2022-00123', uploadedAt: '2026-07-01T00:00:00Z' },
];
