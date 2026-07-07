export type ServiceStatus = 'ACTIVE' | 'ON_LEAVE' | 'IN_TRAINING' | 'SUSPENDED' | 'RETIRED' | 'SEPARATED' | 'PENDING';
export type EmploymentType = 'PERMANENT' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP';
export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface PersonnelRecord {
  id: string;
  userId?: string;
  serviceNumber: string;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePhotoUrl?: string;
  department: string;
  unit: string;
  position: string;
  rank?: string;
  employmentType: EmploymentType;
  serviceStatus: ServiceStatus;
  supervisor?: string;
  workLocation: string;
  hireDate: string;
  contractEndDate?: string;
  yearsOfService: number;
  branch: string;
  division?: string;
  team?: string;
  office?: string;
  dateOfBirth?: string;
  nationality?: string;
  nationalId?: string;
  passportNumber?: string;
  gender?: string;
  maritalStatus?: string;
  address?: string;
  performanceRating?: string;
  leaveBalance?: number;
  medicalClearance?: string;
}

export interface PersonnelDepartment {
  id: string;
  name: string;
  code: string;
  manager: string;
  location: string;
  personnelCount: number;
  budgetRef?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PersonnelUnit {
  id: string;
  name: string;
  code: string;
  department: string;
  head: string;
  personnelCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PersonnelPosition {
  id: string;
  name: string;
  code: string;
  department: string;
  reportsTo: string;
  grade: string;
  status: 'ACTIVE' | 'DISABLED';
  vacant: boolean;
}

export interface TransferRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  oldDepartment: string;
  newDepartment: string;
  oldUnit?: string;
  newUnit?: string;
  reason: string;
  effectiveDate: string;
  approvedBy: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED';
}

export interface PromotionRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  oldPosition: string;
  newPosition: string;
  oldRank?: string;
  newRank?: string;
  effectiveDate: string;
  reason: string;
  approvedBy: string;
  salaryGrade?: string;
}

export interface QualificationRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  type: 'ACADEMIC' | 'PROFESSIONAL' | 'LICENSE';
  name: string;
  institution: string;
  graduationDate?: string;
  expiryDate?: string;
  status: 'VALID' | 'EXPIRING' | 'EXPIRED';
}

export interface SkillRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  category: string;
  skill: string;
  level: SkillLevel;
}

export interface AwardRecord {
  id: string;
  personnelId: string;
  personnelName: string;
  title: string;
  type: 'AWARD' | 'RECOGNITION' | 'COMMENDATION' | 'CERTIFICATE';
  date: string;
  issuedBy: string;
}

export interface PersonnelDocument {
  id: string;
  personnelId: string;
  personnelName: string;
  name: string;
  type: string;
  uploadedAt: string;
  expiresAt?: string;
  version: number;
}

export interface DependentRecord {
  id: string;
  personnelId: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  medicalCoverage: boolean;
}

export interface EmergencyContact {
  id: string;
  personnelId: string;
  name: string;
  relationship: string;
  phone: string;
  address: string;
  priority: number;
}

export interface ServiceHistoryEntry {
  id: string;
  personnelId: string;
  event: string;
  description: string;
  date: string;
  performedBy?: string;
}

export interface PersonnelActivity {
  id: string;
  action: string;
  personnel: string;
  timestamp: string;
}

export const PERSONNEL_DASHBOARD_KPIS = {
  totalPersonnel: 24750,
  activePersonnel: 24120,
  newThisMonth: 186,
  onLeave: 342,
  inTraining: 128,
  nearRetirement: 89,
  vacantPositions: 47,
  pendingRequests: 23,
  contractEmployees: 1240,
  permanentEmployees: 23510,
};

export const PERSONNEL_BY_DEPARTMENT = [
  { name: 'Human Resources', value: 420 },
  { name: 'Finance', value: 380 },
  { name: 'Logistics', value: 620 },
  { name: 'Medical', value: 340 },
  { name: 'Engineering', value: 510 },
  { name: 'Training', value: 290 },
  { name: 'Administration', value: 450 },
];

export const PERSONNEL_BY_EMPLOYMENT_TYPE = [
  { name: 'Permanent', value: 23510 },
  { name: 'Contract', value: 1240 },
  { name: 'Temporary', value: 0 },
  { name: 'Internship', value: 0 },
];

export const AGE_DISTRIBUTION = [
  { range: '18–25', count: 3200 },
  { range: '26–35', count: 8400 },
  { range: '36–45', count: 7200 },
  { range: '46–55', count: 4100 },
  { range: '56+', count: 1850 },
];

export const GENDER_DISTRIBUTION = [
  { name: 'Male', value: 19800 },
  { name: 'Female', value: 4950 },
];

export const PERSONNEL_GROWTH = [
  { month: 'Jan', count: 24200 }, { month: 'Feb', count: 24350 }, { month: 'Mar', count: 24500 },
  { month: 'Apr', count: 24600 }, { month: 'May', count: 24750 }, { month: 'Jun', count: 24890 },
];

export const UPCOMING_RETIREMENTS = [
  { name: 'Col. Mukamana', date: '2026-09-15', department: 'HQ' },
  { name: 'Maj. Habimana', date: '2026-11-01', department: 'HR' },
  { name: 'Capt. Uwase', date: '2027-01-20', department: 'IT' },
];

export const CONTRACT_EXPIRY = [
  { month: 'Jul', count: 12 }, { month: 'Aug', count: 18 }, { month: 'Sep', count: 8 },
  { month: 'Oct', count: 22 }, { month: 'Nov', count: 15 }, { month: 'Dec', count: 9 },
];

export const QUALIFICATION_DISTRIBUTION = [
  { name: 'Bachelor', value: 12400 },
  { name: 'Master', value: 4200 },
  { name: 'Doctorate', value: 180 },
  { name: 'Diploma', value: 6800 },
  { name: 'Professional Cert.', value: 1170 },
];

export const PERSONNEL_RECENT_ACTIVITY: PersonnelActivity[] = [
  { id: '1', action: 'Personnel registered', personnel: 'Eric Niyonsenga', timestamp: '2026-07-07T10:00:00Z' },
  { id: '2', action: 'Transferred to Logistics', personnel: 'Claire Mutesi', timestamp: '2026-07-07T09:30:00Z' },
  { id: '3', action: 'Promoted to Senior Officer', personnel: 'Patrick Habimana', timestamp: '2026-07-06T16:00:00Z' },
  { id: '4', action: 'Certification renewed', personnel: 'Alice Uwase', timestamp: '2026-07-06T14:20:00Z' },
  { id: '5', action: 'Profile updated', personnel: 'Jean Mukamana', timestamp: '2026-07-05T11:00:00Z' },
];

export const MOCK_PERSONNEL: PersonnelRecord[] = [
  {
    id: 'p0000001-0001-4001-8001-000000000001',
    userId: 'a0000001-0001-4001-8001-000000000001',
    serviceNumber: 'RDF-SN-00001',
    employeeNumber: 'RDF-00001',
    firstName: 'Jean', lastName: 'Mukamana',
    email: 'admin@mod.gov.rw', phone: '+250 788 100 001',
    department: 'Headquarters', unit: 'HQ Command', position: 'Director General', rank: 'Colonel',
    employmentType: 'PERMANENT', serviceStatus: 'ACTIVE', supervisor: '—',
    workLocation: 'Kigali HQ', hireDate: '2005-03-15', yearsOfService: 21.3, branch: 'ARMY',
    division: 'Executive', performanceRating: 'Outstanding', leaveBalance: 18, medicalClearance: 'Fit',
  },
  {
    id: 'p0000002-0002-4002-8002-000000000002',
    userId: 'a0000002-0002-4002-8002-000000000002',
    serviceNumber: 'RDF-SN-00002',
    employeeNumber: 'RDF-00002',
    firstName: 'Patrick', lastName: 'Habimana',
    email: 'officer@mod.gov.rw', phone: '+250 788 100 002',
    department: 'Human Resources', unit: 'HR Division', position: 'HR Officer', rank: 'Major',
    employmentType: 'PERMANENT', serviceStatus: 'ACTIVE', supervisor: 'Jean Mukamana',
    workLocation: 'Kigali HQ', hireDate: '2010-06-01', yearsOfService: 16.1, branch: 'ARMY',
    performanceRating: 'Exceeds Expectations', leaveBalance: 12,
  },
  {
    id: 'p0000003-0003-4003-8003-000000000003',
    userId: 'a0000003-0003-4003-8003-000000000003',
    serviceNumber: 'RDF-SN-00003',
    employeeNumber: 'RDF-00003',
    firstName: 'Alice', lastName: 'Uwase',
    email: 'mfa@mod.gov.rw', phone: '+250 788 100 003',
    department: 'Information Technology', unit: 'Digital Services', position: 'Digitalization Officer', rank: 'Captain',
    employmentType: 'PERMANENT', serviceStatus: 'ACTIVE', supervisor: 'Jean Mukamana',
    workLocation: 'Kigali HQ', hireDate: '2015-01-20', yearsOfService: 11.5, branch: 'ARMY',
    performanceRating: 'Meets Expectations', leaveBalance: 8,
  },
  {
    id: 'p0000004-0004-4004-8004-000000000004',
    serviceNumber: 'RDF-SN-10001',
    employeeNumber: 'RDF-10001',
    firstName: 'Emmanuel', lastName: 'Niyonsenga',
    email: 'e.niyonsenga@mod.gov.rw', phone: '+250 788 200 001',
    department: 'Logistics', unit: 'Logistics Battalion', position: 'Logistics Officer', rank: 'Lieutenant',
    employmentType: 'PERMANENT', serviceStatus: 'ACTIVE', supervisor: 'Patrick Habimana',
    workLocation: 'Kigali Depot', hireDate: '2018-08-10', yearsOfService: 7.9, branch: 'ARMY',
  },
  {
    id: 'p0000005-0005-4005-8005-000000000005',
    serviceNumber: 'RDF-SN-10002',
    employeeNumber: 'RDF-10002',
    firstName: 'Claire', lastName: 'Mutesi',
    email: 'c.mutesi@mod.gov.rw',
    department: 'Finance', unit: 'Budget Office', position: 'Finance Officer',
    employmentType: 'CONTRACT', serviceStatus: 'ON_LEAVE', supervisor: 'Jean Mukamana',
    workLocation: 'Kigali HQ', hireDate: '2020-02-01', contractEndDate: '2026-12-31', yearsOfService: 6.4, branch: 'ARMY',
  },
  {
    id: 'p0000006-0006-4006-8006-000000000006',
    serviceNumber: 'RDF-SN-10003',
    employeeNumber: 'RDF-10003',
    firstName: 'Eric', lastName: 'Habyarimana',
    email: 'e.habyarimana@mod.gov.rw',
    department: 'Medical', unit: 'Medical Corps', position: 'Medical Officer',
    employmentType: 'PERMANENT', serviceStatus: 'IN_TRAINING', supervisor: 'Jean Mukamana',
    workLocation: 'Kanombe', hireDate: '2019-04-15', yearsOfService: 7.2, branch: 'ARMY',
  },
  {
    id: 'p0000007-0007-4007-8007-000000000007',
    serviceNumber: 'RDF-SN-10004',
    employeeNumber: 'RDF-10004',
    firstName: 'Grace', lastName: 'Ingabire',
    email: 'g.ingabire@mod.gov.rw',
    department: 'Training', unit: 'Training Academy', position: 'Training Instructor',
    employmentType: 'PERMANENT', serviceStatus: 'ACTIVE', supervisor: 'Patrick Habimana',
    workLocation: 'Gako', hireDate: '2012-09-01', yearsOfService: 13.8, branch: 'ARMY',
  },
  {
    id: 'p0000008-0008-4008-8008-000000000008',
    serviceNumber: 'RDF-SN-10005',
    employeeNumber: 'RDF-10005',
    firstName: 'Fabrice', lastName: 'Nkurunziza',
    email: 'f.nkurunziza@mod.gov.rw',
    department: 'Procurement', unit: 'Procurement Unit', position: 'Procurement Officer',
    employmentType: 'CONTRACT', serviceStatus: 'ACTIVE', supervisor: 'Jean Mukamana',
    workLocation: 'Kigali HQ', hireDate: '2021-01-10', contractEndDate: '2026-10-31', yearsOfService: 5.5, branch: 'ARMY',
  },
];

export const MOCK_DEPARTMENTS: PersonnelDepartment[] = [
  { id: 'd1', name: 'Human Resources', code: 'HR', manager: 'Patrick Habimana', location: 'Kigali HQ', personnelCount: 420, budgetRef: 'BUD-HR-2026', status: 'ACTIVE' },
  { id: 'd2', name: 'Finance', code: 'FIN', manager: 'Claire Mutesi', location: 'Kigali HQ', personnelCount: 380, budgetRef: 'BUD-FIN-2026', status: 'ACTIVE' },
  { id: 'd3', name: 'Logistics', code: 'LOG', manager: 'Emmanuel Niyonsenga', location: 'Kigali Depot', personnelCount: 620, status: 'ACTIVE' },
  { id: 'd4', name: 'Medical', code: 'MED', manager: 'Eric Habyarimana', location: 'Kanombe', personnelCount: 340, status: 'ACTIVE' },
  { id: 'd5', name: 'Training', code: 'TRN', manager: 'Grace Ingabire', location: 'Gako', personnelCount: 290, status: 'ACTIVE' },
  { id: 'd6', name: 'Administration', code: 'ADM', manager: 'Jean Mukamana', location: 'Kigali HQ', personnelCount: 450, status: 'ACTIVE' },
];

export const MOCK_UNITS: PersonnelUnit[] = [
  { id: 'u1', name: 'HQ Command', code: 'HQ-CMD', department: 'Headquarters', head: 'Jean Mukamana', personnelCount: 45, status: 'ACTIVE' },
  { id: 'u2', name: 'HR Division', code: 'HR-DIV', department: 'Human Resources', head: 'Patrick Habimana', personnelCount: 28, status: 'ACTIVE' },
  { id: 'u3', name: 'Logistics Battalion', code: 'LOG-BN', department: 'Logistics', head: 'Emmanuel Niyonsenga', personnelCount: 120, status: 'ACTIVE' },
  { id: 'u4', name: 'Medical Corps', code: 'MED-CORP', department: 'Medical', head: 'Eric Habyarimana', personnelCount: 85, status: 'ACTIVE' },
];

export const MOCK_POSITIONS: PersonnelPosition[] = [
  { id: 'pos1', name: 'Director General', code: 'DG-01', department: 'Headquarters', reportsTo: '—', grade: 'E1', status: 'ACTIVE', vacant: false },
  { id: 'pos2', name: 'HR Officer', code: 'HR-02', department: 'Human Resources', reportsTo: 'Director General', grade: 'M3', status: 'ACTIVE', vacant: false },
  { id: 'pos3', name: 'Logistics Officer', code: 'LOG-03', department: 'Logistics', reportsTo: 'Logistics Director', grade: 'O2', status: 'ACTIVE', vacant: true },
  { id: 'pos4', name: 'Finance Officer', code: 'FIN-02', department: 'Finance', reportsTo: 'Finance Director', grade: 'O2', status: 'ACTIVE', vacant: false },
  { id: 'pos5', name: 'Medical Officer', code: 'MED-03', department: 'Medical', reportsTo: 'Medical Director', grade: 'O3', status: 'ACTIVE', vacant: true },
];

export const MOCK_TRANSFERS: TransferRecord[] = [
  { id: 't1', personnelId: 'p0000005', personnelName: 'Claire Mutesi', oldDepartment: 'Human Resources', newDepartment: 'Finance', reason: 'Organizational restructuring', effectiveDate: '2026-06-01', approvedBy: 'Jean Mukamana', status: 'COMPLETED' },
  { id: 't2', personnelId: 'p0000004', personnelName: 'Emmanuel Niyonsenga', oldDepartment: 'Training', newDepartment: 'Logistics', oldUnit: 'Training Academy', newUnit: 'Logistics Battalion', reason: 'Skills alignment', effectiveDate: '2026-08-01', approvedBy: 'Patrick Habimana', status: 'PENDING' },
];

export const MOCK_PROMOTIONS: PromotionRecord[] = [
  { id: 'pr1', personnelId: 'p0000002', personnelName: 'Patrick Habimana', oldPosition: 'HR Assistant', newPosition: 'HR Officer', oldRank: 'Captain', newRank: 'Major', effectiveDate: '2025-01-15', reason: 'Merit-based promotion', approvedBy: 'Jean Mukamana', salaryGrade: 'M3' },
  { id: 'pr2', personnelId: 'p0000003', personnelName: 'Alice Uwase', oldPosition: 'IT Specialist', newPosition: 'Digitalization Officer', effectiveDate: '2024-07-01', reason: 'Performance excellence', approvedBy: 'Jean Mukamana' },
];

export const MOCK_QUALIFICATIONS: QualificationRecord[] = [
  { id: 'q1', personnelId: 'p0000002', personnelName: 'Patrick Habimana', type: 'ACADEMIC', name: 'Master of Public Administration', institution: 'University of Rwanda', graduationDate: '2012-06-15', status: 'VALID' },
  { id: 'q2', personnelId: 'p0000003', personnelName: 'Alice Uwase', type: 'ACADEMIC', name: 'BSc Computer Science', institution: 'UR CST', graduationDate: '2014-11-20', status: 'VALID' },
  { id: 'q3', personnelId: 'p0000006', personnelName: 'Eric Habyarimana', type: 'PROFESSIONAL', name: 'Medical License', institution: 'Rwanda Medical Council', expiryDate: '2026-09-30', status: 'EXPIRING' },
];

export const MOCK_SKILLS: SkillRecord[] = [
  { id: 's1', personnelId: 'p0000002', personnelName: 'Patrick Habimana', category: 'Management', skill: 'Project Management', level: 'ADVANCED' },
  { id: 's2', personnelId: 'p0000003', personnelName: 'Alice Uwase', category: 'Technical', skill: 'Software Development', level: 'EXPERT' },
  { id: 's3', personnelId: 'p0000004', personnelName: 'Emmanuel Niyonsenga', category: 'Operations', skill: 'Supply Chain Management', level: 'INTERMEDIATE' },
  { id: 's4', personnelId: 'p0000005', personnelName: 'Claire Mutesi', category: 'Finance', skill: 'Accounting', level: 'ADVANCED' },
];

export const MOCK_AWARDS: AwardRecord[] = [
  { id: 'a1', personnelId: 'p0000001', personnelName: 'Jean Mukamana', title: 'Distinguished Service Medal', type: 'AWARD', date: '2024-07-04', issuedBy: 'Ministry of Defence' },
  { id: 'a2', personnelId: 'p0000007', personnelName: 'Grace Ingabire', title: 'Excellence in Training', type: 'RECOGNITION', date: '2025-12-15', issuedBy: 'Training Command' },
];

export const MOCK_DOCUMENTS: PersonnelDocument[] = [
  { id: 'doc1', personnelId: 'p0000001', personnelName: 'Jean Mukamana', name: 'Employment Contract', type: 'CONTRACT', uploadedAt: '2005-03-15T00:00:00Z', version: 1 },
  { id: 'doc2', personnelId: 'p0000002', personnelName: 'Patrick Habimana', name: 'Master Certificate', type: 'CERTIFICATE', uploadedAt: '2012-07-01T00:00:00Z', version: 1 },
  { id: 'doc3', personnelId: 'p0000006', personnelName: 'Eric Habyarimana', name: 'Medical License', type: 'LICENSE', uploadedAt: '2019-04-15T00:00:00Z', expiresAt: '2026-09-30T00:00:00Z', version: 2 },
];

export const MOCK_DEPENDENTS: DependentRecord[] = [
  { id: 'dep1', personnelId: 'p0000002', name: 'Marie Habimana', relationship: 'Spouse', dateOfBirth: '1988-05-12', medicalCoverage: true },
  { id: 'dep2', personnelId: 'p0000002', name: 'Kevin Habimana', relationship: 'Child', dateOfBirth: '2015-03-20', medicalCoverage: true },
];

export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'ec1', personnelId: 'p0000002', name: 'Marie Habimana', relationship: 'Spouse', phone: '+250 788 300 001', address: 'Kigali, Gasabo', priority: 1 },
  { id: 'ec2', personnelId: 'p0000003', name: 'Paul Uwase', relationship: 'Sibling', phone: '+250 788 300 002', address: 'Kigali, Nyarugenge', priority: 1 },
];

export const MOCK_SERVICE_HISTORY: ServiceHistoryEntry[] = [
  { id: 'sh1', personnelId: 'p0000002', event: 'Initial Appointment', description: 'Appointed as HR Assistant', date: '2010-06-01', performedBy: 'HR Directorate' },
  { id: 'sh2', personnelId: 'p0000002', event: 'Promotion', description: 'Promoted to HR Officer', date: '2025-01-15', performedBy: 'Jean Mukamana' },
  { id: 'sh3', personnelId: 'p0000005', event: 'Transfer', description: 'Transferred from HR to Finance', date: '2026-06-01', performedBy: 'Patrick Habimana' },
];

export const SKILL_CATALOGUE = [
  'Project Management', 'Software Development', 'Procurement', 'Accounting',
  'Vehicle Maintenance', 'Data Analysis', 'Leadership', 'Logistics Planning',
];
