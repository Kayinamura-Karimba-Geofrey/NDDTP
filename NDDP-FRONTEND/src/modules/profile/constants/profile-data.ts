export type ProfileStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';

export interface ProfileAddress {
  id: string;
  type: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  country: string;
  isPrimary: boolean;
}

export interface ProfileEmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface MyProfileRecord {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  rank: string;
  status: ProfileStatus;
  avatarUrl?: string;
  hireDate: string;
  addresses: ProfileAddress[];
  emergencyContacts: ProfileEmergencyContact[];
}

export const MOCK_MY_PROFILE: MyProfileRecord = {
  id: 'USR-ME',
  employeeNumber: 'EMP-0001',
  firstName: 'Demo',
  lastName: 'Administrator',
  email: 'admin@mod.gov.rw',
  phone: '+250 788 000 000',
  jobTitle: 'System Administrator',
  department: 'Directorate of Digital Transformation',
  rank: '—',
  status: 'ACTIVE',
  hireDate: '2024-01-15',
  addresses: [
    { id: 'ADR-01', type: 'HOME', line1: 'KN 4 Ave', line2: 'Nyarutarama', city: 'Kigali', district: 'Gasabo', country: 'Rwanda', isPrimary: true },
    { id: 'ADR-02', type: 'WORK', line1: 'HQ Complex', city: 'Kigali', district: 'Nyarugenge', country: 'Rwanda', isPrimary: false },
  ],
  emergencyContacts: [
    { id: 'EC-01', name: 'Uwimana Claire', relationship: 'Spouse', phone: '+250 788 111 222', email: 'claire@example.com', isPrimary: true },
    { id: 'EC-02', name: 'Habimana Paul', relationship: 'Brother', phone: '+250 788 333 444', isPrimary: false },
  ],
};

export const PROFILE_ACTIVITY = [
  { id: 'ACT-01', label: 'Signed in from HQ workstation', at: '2026-07-08 08:12', type: 'LOGIN' },
  { id: 'ACT-02', label: 'Updated notification preferences', at: '2026-07-07 16:40', type: 'PREFS' },
  { id: 'ACT-03', label: 'Password changed', at: '2026-06-28 11:05', type: 'SECURITY' },
  { id: 'ACT-04', label: 'Trusted device registered — Chrome/Windows', at: '2026-06-20 09:18', type: 'DEVICE' },
  { id: 'ACT-05', label: 'Signed in from mobile', at: '2026-06-15 19:22', type: 'LOGIN' },
];
