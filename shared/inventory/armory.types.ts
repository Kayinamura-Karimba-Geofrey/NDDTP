export type WeaponCategory = 'RIFLE' | 'SIDEARM' | 'HEAVY_ARTILLERY' | 'MUNITIONS' | 'OPTICS' | 'TACTICAL_GEAR';
export type OrdnanceCaliber = '5.56x45mm' | '7.62x51mm' | '9x19mm' | '12.7x99mm_NATO' | '120mm_TANK' | '155mm_ARTILLERY';
export type EquipmentReadiness = 'FMC' | 'PMC' | 'NMC'; // Fully, Partially, Non Mission Capable

export interface OrdnanceItem {
  id: string;
  serialNumber: string;
  name: string;
  category: WeaponCategory;
  caliber?: OrdnanceCaliber;
  vaultLocation: string;
  unitAssigned: string;
  readiness: EquipmentReadiness;
  quantityOnHand: number;
  minThreshold: number;
  lastInspectedAt: string;
}

export interface ExpenditureLog {
  id: string;
  ordnanceId: string;
  quantitySpent: number;
  operationName: string;
  authorizedBy: string;
  timestamp: string;
  notes?: string;
}
