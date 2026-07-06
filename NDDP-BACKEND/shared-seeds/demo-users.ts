/** Shared demo accounts — keep in sync with NDDP-FRONTEND/src/constants/seed-credentials.ts */
export const DEMO_PASSWORD = 'Nddtp@Mod2026!';
export const DEMO_MFA_OTP = '123456';

export interface DemoUser {
  id: string;
  email: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  rank: string;
  jobTitle: string;
  roleCode: string;
  departmentCode: string;
  serviceNumber: string;
  mfaEnabled?: boolean;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'a0000001-0001-4001-8001-000000000001',
    email: 'admin@mod.gov.rw',
    employeeNumber: 'RDF-00001',
    firstName: 'Jean',
    lastName: 'Mukamana',
    rank: 'Colonel',
    jobTitle: 'Director General',
    roleCode: 'SUPER_ADMIN',
    departmentCode: 'HQ',
    serviceNumber: 'RDF-SN-00001',
  },
  {
    id: 'a0000002-0002-4002-8002-000000000002',
    email: 'officer@mod.gov.rw',
    employeeNumber: 'RDF-00002',
    firstName: 'Patrick',
    lastName: 'Habimana',
    rank: 'Major',
    jobTitle: 'HR Officer',
    roleCode: 'HR_MANAGER',
    departmentCode: 'HR',
    serviceNumber: 'RDF-SN-00002',
  },
  {
    id: 'a0000003-0003-4003-8003-000000000003',
    email: 'mfa@mod.gov.rw',
    employeeNumber: 'RDF-00003',
    firstName: 'Alice',
    lastName: 'Uwase',
    rank: 'Captain',
    jobTitle: 'Digitalization Officer',
    roleCode: 'ADMIN',
    departmentCode: 'IT',
    serviceNumber: 'RDF-SN-00003',
    mfaEnabled: true,
  },
];

export const EXTRA_PERSONNEL = [
  { serviceNumber: 'RDF-SN-10001', firstName: 'Emmanuel', lastName: 'Niyonsenga', email: 'e.niyonsenga@mod.gov.rw' },
  { serviceNumber: 'RDF-SN-10002', firstName: 'Claire', lastName: 'Mutesi', email: 'c.mutesi@mod.gov.rw' },
  { serviceNumber: 'RDF-SN-10003', firstName: 'Eric', lastName: 'Habyarimana', email: 'e.habyarimana@mod.gov.rw' },
  { serviceNumber: 'RDF-SN-10004', firstName: 'Grace', lastName: 'Ingabire', email: 'g.ingabire@mod.gov.rw' },
  { serviceNumber: 'RDF-SN-10005', firstName: 'Fabrice', lastName: 'Nkurunziza', email: 'f.nkurunziza@mod.gov.rw' },
];
