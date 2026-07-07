export type InventoryStatus =
  | 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'PENDING' | 'APPROVED' | 'REJECTED'
  | 'FULFILLED' | 'CANCELLED' | 'COMPLETED' | 'IN_PROGRESS' | 'IN_TRANSIT'
  | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'IN_STOCK' | 'EXPIRING_SOON' | 'EXPIRED'
  | 'DISPATCHED' | 'RECEIVED' | 'DRAFT' | 'VARIANCE';

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  warehouse: string;
  status: InventoryStatus;
  barcode?: string;
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
  manager?: string;
  capacity?: string;
  status: InventoryStatus;
  itemCount?: number;
}

export interface WarehouseLocation {
  id: string;
  warehouse: string;
  zone: string;
  aisle: string;
  shelf: string;
  bin: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  itemCount?: number;
}

export interface UnitOfMeasure {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface StockLevel {
  id: string;
  itemCode: string;
  itemName: string;
  warehouse: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  safetyStock: number;
  status: InventoryStatus;
}

export interface GoodsReceipt {
  id: string;
  receiptNumber: string;
  supplier: string;
  warehouse: string;
  receiptDate: string;
  items: number;
  quantity: number;
  receiver: string;
  status: InventoryStatus;
}

export interface GoodsIssue {
  id: string;
  issueNumber: string;
  department: string;
  requester: string;
  warehouse: string;
  items: number;
  quantity: number;
  reason: string;
  status: InventoryStatus;
}

export interface StockRequest {
  id: string;
  requestNumber: string;
  department: string;
  requester: string;
  priority: string;
  requestedDate: string;
  status: InventoryStatus;
}

export interface WarehouseTransfer {
  id: string;
  transferNumber: string;
  sourceWarehouse: string;
  destinationWarehouse: string;
  items: number;
  transferDate: string;
  status: InventoryStatus;
}

export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  itemName: string;
  warehouse: string;
  reason: string;
  quantity: number;
  adjustedBy: string;
  date: string;
  status: InventoryStatus;
}

export interface StockCount {
  id: string;
  countNumber: string;
  warehouse: string;
  countType: string;
  counter: string;
  countDate: string;
  variance: number;
  status: InventoryStatus;
}

export interface BatchLot {
  id: string;
  batchNumber: string;
  itemName: string;
  manufactureDate: string;
  expiryDate: string;
  supplier: string;
  quantity: number;
  warehouse: string;
}

export interface ExpiryItem {
  id: string;
  itemName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  warehouse: string;
  daysRemaining: number;
  status: InventoryStatus;
}

export interface ReorderItem {
  id: string;
  itemCode: string;
  itemName: string;
  currentStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  preferredSupplier: string;
  leadTime: string;
  status: InventoryStatus;
}

export interface SupplierRef {
  id: string;
  name: string;
  code: string;
  category: string;
  contact: string;
  status: InventoryStatus;
}

export const INVENTORY_DASHBOARD_KPIS = {
  totalItems: 2847,
  totalWarehouses: 12,
  availableStock: 156420,
  lowStockItems: 34,
  outOfStockItems: 8,
  expiringSoon: 22,
  pendingRequests: 15,
  receivedToday: 1240,
  issuedToday: 890,
  pendingTransfers: 6,
  inventoryValue: 2450000000,
};

export const INVENTORY_BY_CATEGORY = [
  { name: 'Office Supplies', value: 680 },
  { name: 'Medical Supplies', value: 420 },
  { name: 'IT Consumables', value: 380 },
  { name: 'Uniforms', value: 290 },
  { name: 'Vehicle Parts', value: 245 },
  { name: 'Cleaning Supplies', value: 198 },
  { name: 'Fuel', value: 156 },
  { name: 'Workshop Materials', value: 478 },
];

export const WAREHOUSE_STOCK_DISTRIBUTION = [
  { name: 'Central WH', value: 45200 },
  { name: 'Kanombe Depot', value: 28400 },
  { name: 'Medical Store', value: 22100 },
  { name: 'IT Store', value: 18600 },
  { name: 'Field Depot A', value: 15800 },
  { name: 'Field Depot B', value: 12300 },
];

export const MONTHLY_STOCK_MOVEMENT = [
  { month: 'Feb', received: 4200, issued: 3800, transfers: 420, adjustments: 85 },
  { month: 'Mar', received: 5100, issued: 4200, transfers: 380, adjustments: 62 },
  { month: 'Apr', received: 4800, issued: 4500, transfers: 510, adjustments: 94 },
  { month: 'May', received: 5600, issued: 4900, transfers: 440, adjustments: 78 },
  { month: 'Jun', received: 5200, issued: 5100, transfers: 390, adjustments: 56 },
  { month: 'Jul', received: 4900, issued: 4700, transfers: 460, adjustments: 71 },
];

export const LOW_STOCK_TREND = [
  { month: 'Feb', count: 28 }, { month: 'Mar', count: 32 }, { month: 'Apr', count: 29 },
  { month: 'May', count: 35 }, { month: 'Jun', count: 31 }, { month: 'Jul', count: 34 },
];

export const EXPIRY_TIMELINE = [
  { month: 'Jul', count: 8 }, { month: 'Aug', count: 14 }, { month: 'Sep', count: 6 },
  { month: 'Oct', count: 18 }, { month: 'Nov', count: 11 }, { month: 'Dec', count: 9 },
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  { id: 'w1', code: 'WH-CENTRAL', name: 'Central Warehouse', location: 'Kigali HQ — Building A', manager: 'Jean Mukamana', capacity: '5,000 m²', status: 'ACTIVE', itemCount: 1240 },
  { id: 'w2', code: 'WH-KANOMBE', name: 'Kanombe Depot', location: 'Kanombe Military Base', manager: 'Patrick Habimana', capacity: '2,500 m²', status: 'ACTIVE', itemCount: 680 },
  { id: 'w3', code: 'WH-MEDICAL', name: 'Medical Store', location: 'Kanombe Medical Centre', manager: 'Dr. Claire Mutesi', capacity: '800 m²', status: 'ACTIVE', itemCount: 420 },
  { id: 'w4', code: 'WH-IT', name: 'IT Consumables Store', location: 'Kigali HQ — IT Wing', manager: 'Alice Uwase', status: 'ACTIVE', itemCount: 312 },
  { id: 'w5', code: 'WH-FIELD-A', name: 'Field Depot A', location: 'Gisenyi Forward Base', manager: 'Emmanuel Niyonsenga', status: 'MAINTENANCE', itemCount: 195 },
];

export const MOCK_ITEMS: InventoryItem[] = [
  { id: 'i1', itemCode: 'INV-OS-00124', name: 'A4 Copy Paper (Ream)', category: 'Office Supplies', unit: 'Ream', currentStock: 450, reservedStock: 20, availableStock: 430, reorderLevel: 100, warehouse: 'Central Warehouse', status: 'IN_STOCK', barcode: '8901234567890' },
  { id: 'i2', itemCode: 'INV-MS-00089', name: 'Surgical Gloves (Box)', category: 'Medical Supplies', unit: 'Box', currentStock: 28, reservedStock: 5, availableStock: 23, reorderLevel: 50, warehouse: 'Medical Store', status: 'LOW_STOCK', barcode: '8901234567891' },
  { id: 'i3', itemCode: 'INV-IT-00201', name: 'USB-C Cable 2m', category: 'IT Consumables', unit: 'Piece', currentStock: 0, reservedStock: 0, availableStock: 0, reorderLevel: 25, warehouse: 'IT Consumables Store', status: 'OUT_OF_STOCK' },
  { id: 'i4', itemCode: 'INV-UN-00045', name: 'Combat Uniform Set', category: 'Uniforms', unit: 'Set', currentStock: 180, reservedStock: 30, availableStock: 150, reorderLevel: 50, warehouse: 'Central Warehouse', status: 'IN_STOCK' },
  { id: 'i5', itemCode: 'INV-VP-00078', name: 'Brake Pad Set (Toyota)', category: 'Vehicle Parts', unit: 'Set', currentStock: 12, reservedStock: 2, availableStock: 10, reorderLevel: 8, warehouse: 'Kanombe Depot', status: 'IN_STOCK' },
  { id: 'i6', itemCode: 'INV-CL-00033', name: 'Disinfectant 5L', category: 'Cleaning Supplies', unit: 'Bottle', currentStock: 65, reservedStock: 0, availableStock: 65, reorderLevel: 30, warehouse: 'Central Warehouse', status: 'IN_STOCK' },
];

export const MOCK_CATEGORIES: InventoryCategory[] = [
  { id: 'c1', name: 'Office Supplies', code: 'OS', description: 'Stationery, paper, pens', itemCount: 680 },
  { id: 'c2', name: 'Medical Supplies', code: 'MS', description: 'Clinical consumables', itemCount: 420 },
  { id: 'c3', name: 'Food Items', code: 'FD', description: 'Rations and food supplies', itemCount: 156 },
  { id: 'c4', name: 'Cleaning Materials', code: 'CL', description: 'Cleaning and hygiene', itemCount: 198 },
  { id: 'c5', name: 'Vehicle Parts', code: 'VP', description: 'Spare parts and fluids', itemCount: 245 },
  { id: 'c6', name: 'IT Accessories', code: 'IT', description: 'Cables, mice, keyboards', itemCount: 380 },
  { id: 'c7', name: 'Electrical Supplies', code: 'EL', description: 'Wiring, bulbs, switches', itemCount: 168 },
];

export const MOCK_UNITS: UnitOfMeasure[] = [
  { id: 'u1', name: 'Piece', code: 'PC', description: 'Individual unit' },
  { id: 'u2', name: 'Box', code: 'BOX', description: 'Standard box' },
  { id: 'u3', name: 'Carton', code: 'CTN', description: 'Carton of items' },
  { id: 'u4', name: 'Kilogram', code: 'KG', description: 'Weight in kilograms' },
  { id: 'u5', name: 'Liter', code: 'L', description: 'Volume in liters' },
  { id: 'u6', name: 'Meter', code: 'M', description: 'Length in meters' },
  { id: 'u7', name: 'Pack', code: 'PK', description: 'Multi-item pack' },
  { id: 'u8', name: 'Roll', code: 'RL', description: 'Roll of material' },
];

export const MOCK_LOCATIONS: WarehouseLocation[] = [
  { id: 'l1', warehouse: 'Central Warehouse', zone: 'Building A', aisle: 'A1', shelf: 'S3', bin: 'B12' },
  { id: 'l2', warehouse: 'Central Warehouse', zone: 'Building A', aisle: 'A2', shelf: 'S1', bin: 'B04' },
  { id: 'l3', warehouse: 'Medical Store', zone: 'Cold Storage', aisle: 'C1', shelf: 'S2', bin: 'B08' },
  { id: 'l4', warehouse: 'Kanombe Depot', zone: 'Vehicle Parts', aisle: 'V3', shelf: 'S4', bin: 'B15' },
];

export const MOCK_STOCK_LEVELS: StockLevel[] = MOCK_ITEMS.map((item, idx) => ({
  id: `sl${idx + 1}`,
  itemCode: item.itemCode,
  itemName: item.name,
  warehouse: item.warehouse,
  currentStock: item.currentStock,
  reservedStock: item.reservedStock,
  availableStock: item.availableStock,
  minimumStock: Math.floor(item.reorderLevel * 0.5),
  maximumStock: item.reorderLevel * 10,
  reorderPoint: item.reorderLevel,
  safetyStock: Math.floor(item.reorderLevel * 0.3),
  status: item.status,
}));

export const MOCK_RECEIPTS: GoodsReceipt[] = [
  { id: 'gr1', receiptNumber: 'GRN-2026-0145', supplier: 'Rwanda Office Supplies Ltd', warehouse: 'Central Warehouse', receiptDate: '2026-07-07', items: 5, quantity: 500, receiver: 'Jean Mukamana', status: 'COMPLETED' },
  { id: 'gr2', receiptNumber: 'GRN-2026-0144', supplier: 'MedEquip Rwanda', warehouse: 'Medical Store', receiptDate: '2026-07-06', items: 3, quantity: 120, receiver: 'Dr. Claire Mutesi', status: 'COMPLETED' },
  { id: 'gr3', receiptNumber: 'GRN-2026-0146', supplier: 'TechParts East Africa', warehouse: 'IT Consumables Store', receiptDate: '2026-07-07', items: 8, quantity: 200, receiver: 'Alice Uwase', status: 'IN_PROGRESS' },
];

export const MOCK_ISSUES: GoodsIssue[] = [
  { id: 'gi1', issueNumber: 'GIN-2026-0089', department: 'HR', requester: 'Patrick Habimana', warehouse: 'Central Warehouse', items: 3, quantity: 45, reason: 'Monthly office supplies', status: 'COMPLETED' },
  { id: 'gi2', issueNumber: 'GIN-2026-0090', department: 'Medical', requester: 'Dr. Claire Mutesi', warehouse: 'Medical Store', items: 2, quantity: 30, reason: 'Clinic restocking', status: 'COMPLETED' },
  { id: 'gi3', issueNumber: 'GIN-2026-0091', department: 'IT', requester: 'Alice Uwase', warehouse: 'IT Consumables Store', items: 4, quantity: 15, reason: 'New workstation setup', status: 'PENDING' },
];

export const MOCK_REQUESTS: StockRequest[] = [
  { id: 'sr1', requestNumber: 'SR-2026-0234', department: 'Training', requester: 'Fabrice Nkurunziza', priority: 'Normal', requestedDate: '2026-07-06', status: 'PENDING' },
  { id: 'sr2', requestNumber: 'SR-2026-0233', department: 'Finance', requester: 'Grace Ingabire', priority: 'High', requestedDate: '2026-07-05', status: 'APPROVED' },
  { id: 'sr3', requestNumber: 'SR-2026-0232', department: 'Logistics', requester: 'Emmanuel Niyonsenga', priority: 'Urgent', requestedDate: '2026-07-04', status: 'FULFILLED' },
];

export const MOCK_TRANSFERS: WarehouseTransfer[] = [
  { id: 'wt1', transferNumber: 'WT-2026-0045', sourceWarehouse: 'Central Warehouse', destinationWarehouse: 'Field Depot A', items: 4, transferDate: '2026-07-05', status: 'IN_TRANSIT' },
  { id: 'wt2', transferNumber: 'WT-2026-0044', sourceWarehouse: 'Kanombe Depot', destinationWarehouse: 'Central Warehouse', items: 2, transferDate: '2026-07-03', status: 'COMPLETED' },
];

export const MOCK_ADJUSTMENTS: StockAdjustment[] = [
  { id: 'sa1', adjustmentNumber: 'ADJ-2026-0012', itemName: 'A4 Copy Paper (Ream)', warehouse: 'Central Warehouse', reason: 'Counting Error', quantity: -5, adjustedBy: 'Jean Mukamana', date: '2026-07-02', status: 'COMPLETED' },
  { id: 'sa2', adjustmentNumber: 'ADJ-2026-0011', itemName: 'Disinfectant 5L', warehouse: 'Central Warehouse', reason: 'Damage', quantity: -3, adjustedBy: 'Jean Mukamana', date: '2026-06-28', status: 'COMPLETED' },
];

export const MOCK_STOCK_COUNTS: StockCount[] = [
  { id: 'sc1', countNumber: 'CNT-2026-0008', warehouse: 'Central Warehouse', countType: 'Cycle Count', counter: 'Jean Mukamana', countDate: '2026-07-01', variance: -12, status: 'COMPLETED' },
  { id: 'sc2', countNumber: 'CNT-2026-0009', warehouse: 'Medical Store', countType: 'Full Count', counter: 'Dr. Claire Mutesi', countDate: '2026-07-05', variance: 0, status: 'IN_PROGRESS' },
];

export const MOCK_BATCHES: BatchLot[] = [
  { id: 'b1', batchNumber: 'BATCH-MS-2026-045', itemName: 'Surgical Gloves (Box)', manufactureDate: '2026-01-15', expiryDate: '2027-01-15', supplier: 'MedEquip Rwanda', quantity: 200, warehouse: 'Medical Store' },
  { id: 'b2', batchNumber: 'BATCH-FD-2026-012', itemName: 'Emergency Ration Pack', manufactureDate: '2025-10-01', expiryDate: '2026-10-01', supplier: 'FoodCorp Ltd', quantity: 500, warehouse: 'Central Warehouse' },
];

export const MOCK_EXPIRY: ExpiryItem[] = [
  { id: 'e1', itemName: 'Emergency Ration Pack', batchNumber: 'BATCH-FD-2026-012', expiryDate: '2026-10-01', quantity: 120, warehouse: 'Central Warehouse', daysRemaining: 86, status: 'EXPIRING_SOON' },
  { id: 'e2', itemName: 'Antiseptic Solution 1L', batchNumber: 'BATCH-MS-2025-089', expiryDate: '2026-07-20', quantity: 45, warehouse: 'Medical Store', daysRemaining: 13, status: 'EXPIRING_SOON' },
  { id: 'e3', itemName: 'Expired Bandages', batchNumber: 'BATCH-MS-2024-034', expiryDate: '2026-05-15', quantity: 8, warehouse: 'Medical Store', daysRemaining: -53, status: 'EXPIRED' },
];

export const MOCK_REORDER: ReorderItem[] = [
  { id: 'ro1', itemCode: 'INV-MS-00089', itemName: 'Surgical Gloves (Box)', currentStock: 28, reorderPoint: 50, reorderQuantity: 200, preferredSupplier: 'MedEquip Rwanda', leadTime: '7 days', status: 'LOW_STOCK' },
  { id: 'ro2', itemCode: 'INV-IT-00201', itemName: 'USB-C Cable 2m', currentStock: 0, reorderPoint: 25, reorderQuantity: 100, preferredSupplier: 'TechParts East Africa', leadTime: '14 days', status: 'OUT_OF_STOCK' },
];

export const MOCK_SUPPLIERS: SupplierRef[] = [
  { id: 's1', name: 'Rwanda Office Supplies Ltd', code: 'SUP-001', category: 'Office Supplies', contact: 'info@rwandaoffice.rw', status: 'ACTIVE' },
  { id: 's2', name: 'MedEquip Rwanda', code: 'SUP-002', category: 'Medical Supplies', contact: 'sales@medequip.rw', status: 'ACTIVE' },
  { id: 's3', name: 'TechParts East Africa', code: 'SUP-003', category: 'IT Accessories', contact: 'orders@techparts.co.ke', status: 'ACTIVE' },
];

export const MOCK_WAREHOUSE_PROFILES = MOCK_WAREHOUSES.map((w) => ({
  ...w,
  overview: `${w.name} serves as a key storage facility at ${w.location}.`,
  stockValue: 450000000,
  recentReceipts: 12,
  recentIssues: 28,
}));
