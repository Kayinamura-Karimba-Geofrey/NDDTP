/** Canonical org department seed data shared by users and personnel modules. */
export interface SharedDepartmentSeed {
  id: string;
  name: string;
  code: string;
  manager: string;
  status: 'ACTIVE' | 'INACTIVE';
  location: string;
  userCount: number;
  personnelCount: number;
  budgetRef?: string;
}

export const SHARED_DEPARTMENTS: SharedDepartmentSeed[] = [
  {
    id: 'd1',
    name: 'Human Resources',
    code: 'HR',
    manager: 'Patrick Habimana',
    status: 'ACTIVE',
    location: 'Kigali HQ',
    userCount: 68,
    personnelCount: 420,
    budgetRef: 'BUD-HR-2026',
  },
  {
    id: 'd2',
    name: 'Finance',
    code: 'FIN',
    manager: 'Marie Uwase',
    status: 'ACTIVE',
    location: 'Kigali HQ',
    userCount: 52,
    personnelCount: 380,
    budgetRef: 'BUD-FIN-2026',
  },
  {
    id: 'd3',
    name: 'Procurement',
    code: 'PROC',
    manager: 'Eric Niyonsenga',
    status: 'ACTIVE',
    location: 'Kigali HQ',
    userCount: 38,
    personnelCount: 290,
    budgetRef: 'BUD-PROC-2026',
  },
  {
    id: 'd4',
    name: 'Logistics',
    code: 'LOG',
    manager: 'Eric Niyonsenga',
    status: 'ACTIVE',
    location: 'Kigali Depot',
    userCount: 74,
    personnelCount: 620,
    budgetRef: 'BUD-LOG-2026',
  },
  {
    id: 'd5',
    name: 'Medical',
    code: 'MED',
    manager: 'Dr. Immaculée',
    status: 'ACTIVE',
    location: 'Kanombe',
    userCount: 41,
    personnelCount: 340,
    budgetRef: 'BUD-MED-2026',
  },
  {
    id: 'd6',
    name: 'Administration',
    code: 'ADM',
    manager: 'Jean Mukamana',
    status: 'ACTIVE',
    location: 'Kigali HQ',
    userCount: 48,
    personnelCount: 290,
    budgetRef: 'BUD-ADM-2026',
  },
];
