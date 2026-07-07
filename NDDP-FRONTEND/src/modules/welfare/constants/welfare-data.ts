export type WelfareStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS' | 'ACTIVE' | 'CLOSED';
export type EmergencyPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ProgramCategory = 'HEALTH_WELLNESS' | 'EDUCATION' | 'FAMILY' | 'FINANCIAL' | 'RECREATION' | 'RECOGNITION' | 'EMERGENCY';

export interface WelfareProgram {
  id: string;
  name: string;
  category: ProgramCategory | string;
  startDate: string;
  endDate?: string;
  eligiblePersonnel: string;
  budget?: number;
  coordinator: string;
  status: WelfareStatus;
  participants?: number;
}

export interface WelfareBenefit {
  id: string;
  name: string;
  category: string;
  eligibility: string;
  coverage: string;
  status: WelfareStatus;
  participants: number;
}

export interface AssistanceRequest {
  id: string;
  requestNumber: string;
  employeeName: string;
  department: string;
  program: string;
  assistanceType: string;
  amountRequested?: number;
  reason?: string;
  status: WelfareStatus;
  submittedAt?: string;
  assignedOfficer?: string;
  priority?: EmergencyPriority;
}

export interface EmergencyCase {
  id: string;
  caseNumber: string;
  employeeName: string;
  department: string;
  category: string;
  priority: EmergencyPriority;
  assignedOfficer: string;
  status: WelfareStatus;
  submittedAt: string;
}

export interface CounselingReferral {
  id: string;
  employeeName: string;
  referralDate: string;
  counselor: string;
  status: WelfareStatus;
  nextAppointment?: string;
}

export interface FamilySupportRecord {
  id: string;
  employeeName: string;
  program: string;
  dependents: number;
  status: WelfareStatus;
  supportPeriod: string;
}

export interface WellnessProgram {
  id: string;
  name: string;
  participants: number;
  completionRate: number;
  upcomingSessions: number;
  feedbackScore: number;
  status: WelfareStatus;
}

export interface WelfareEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  organizer: string;
  capacity: number;
  registered: number;
  status: WelfareStatus;
}

export interface WelfareApplication {
  id: string;
  applicationNumber: string;
  employeeName: string;
  program: string;
  submittedAt: string;
  status: WelfareStatus;
  assignedOfficer?: string;
}

export interface WelfareDocument {
  id: string;
  name: string;
  type: string;
  employeeName?: string;
  uploadedAt: string;
  expiresAt?: string;
}

export interface WelfareHistoryEntry {
  id: string;
  employeeName: string;
  event: string;
  description: string;
  date: string;
}

export interface MyBenefit {
  id: string;
  name: string;
  coverage: string;
  status: WelfareStatus;
  expiryDate?: string;
}

export const WELFARE_DASHBOARD_KPIS = {
  activePrograms: 12,
  employeesEnrolled: 1842,
  pendingRequests: 23,
  approvedRequests: 156,
  emergencyCases: 4,
  upcomingEvents: 3,
  activeCampaigns: 5,
  counselingReferrals: 18,
  budgetUtilization: 68,
  participationRate: 74,
};

export const PROGRAM_PARTICIPATION = [
  { name: 'Wellness Program', value: 420 },
  { name: 'Education Assistance', value: 280 },
  { name: 'Family Support', value: 195 },
  { name: 'Financial Assistance', value: 142 },
  { name: 'Employee Recognition', value: 310 },
];

export const ASSISTANCE_STATUS_BREAKDOWN = [
  { name: 'Pending', value: 23 },
  { name: 'Approved', value: 156 },
  { name: 'Rejected', value: 12 },
  { name: 'Completed', value: 134 },
];

export const PARTICIPATION_BY_DEPARTMENT = [
  { name: 'HR', value: 85 }, { name: 'IT', value: 72 }, { name: 'Logistics', value: 68 },
  { name: 'Medical', value: 91 }, { name: 'Finance', value: 58 }, { name: 'Training', value: 64 },
];

export const MONTHLY_WELFARE_ACTIVITIES = [
  { month: 'Jan', activities: 8 }, { month: 'Feb', activities: 12 }, { month: 'Mar', activities: 15 },
  { month: 'Apr', activities: 10 }, { month: 'May', activities: 18 }, { month: 'Jun', activities: 14 },
  { month: 'Jul', activities: 11 },
];

export const MOCK_PROGRAMS: WelfareProgram[] = [
  { id: 'wp1', name: 'Housing Allowance', category: 'FINANCIAL', startDate: '2026-01-01', eligiblePersonnel: 'All Permanent Staff', budget: 45000000, coordinator: 'Patrick Habimana', status: 'ACTIVE', participants: 320 },
  { id: 'wp2', name: 'Hardship Fund', category: 'EMERGENCY', startDate: '2026-01-01', eligiblePersonnel: 'All Staff', budget: 12000000, coordinator: 'Patrick Habimana', status: 'ACTIVE', participants: 45 },
  { id: 'wp3', name: 'Education Grant', category: 'EDUCATION', startDate: '2026-01-01', endDate: '2026-12-31', eligiblePersonnel: 'Permanent Staff with Dependents', budget: 8000000, coordinator: 'Claire Mutesi', status: 'ACTIVE', participants: 128 },
  { id: 'wp4', name: 'Counseling Support', category: 'HEALTH_WELLNESS', startDate: '2026-01-01', eligiblePersonnel: 'All Staff', coordinator: 'Eric Habyarimana', status: 'ACTIVE', participants: 86 },
  { id: 'wp5', name: 'Bereavement Support', category: 'FAMILY', startDate: '2026-01-01', eligiblePersonnel: 'All Staff', coordinator: 'Patrick Habimana', status: 'ACTIVE', participants: 12 },
];

export const MOCK_BENEFITS: WelfareBenefit[] = [
  { id: 'b1', name: 'Health Insurance', category: 'Health', eligibility: 'All Permanent Staff', coverage: 'Full family', status: 'ACTIVE', participants: 1842 },
  { id: 'b2', name: 'Housing Support', category: 'Housing', eligibility: 'Officers Grade O3+', coverage: 'Monthly allowance', status: 'ACTIVE', participants: 320 },
  { id: 'b3', name: 'Education Support', category: 'Education', eligibility: 'Staff with dependents', coverage: 'Up to RWF 2M/year', status: 'ACTIVE', participants: 128 },
  { id: 'b4', name: 'Transport Support', category: 'Transport', eligibility: 'Field personnel', coverage: 'Fuel allowance', status: 'ACTIVE', participants: 245 },
  { id: 'b5', name: 'Meal Benefits', category: 'Meals', eligibility: 'HQ staff', coverage: 'Cafeteria subsidy', status: 'ACTIVE', participants: 890 },
];

export const MOCK_ASSISTANCE_REQUESTS: AssistanceRequest[] = [
  { id: 'ar1', requestNumber: 'WF-2026-0089', employeeName: 'Patrick Habimana', department: 'HR', program: 'Hardship Fund', assistanceType: 'Financial Assistance', amountRequested: 500000, reason: 'Medical emergency', status: 'PENDING', submittedAt: '2026-07-06T09:00:00Z', assignedOfficer: 'Jean Mukamana' },
  { id: 'ar2', requestNumber: 'WF-2026-0085', employeeName: 'Alice Uwase', department: 'IT', program: 'Education Grant', assistanceType: 'Education Assistance', amountRequested: 1500000, status: 'APPROVED', submittedAt: '2026-07-02T14:00:00Z', assignedOfficer: 'Patrick Habimana' },
  { id: 'ar3', requestNumber: 'WF-2026-0091', employeeName: 'Claire Mutesi', department: 'Finance', program: 'Family Support', assistanceType: 'Family Support', status: 'IN_PROGRESS', submittedAt: '2026-07-07T08:30:00Z', assignedOfficer: 'Patrick Habimana', priority: 'MEDIUM' },
];

export const MOCK_EMERGENCY_CASES: EmergencyCase[] = [
  { id: 'ec1', caseNumber: 'EMG-2026-0012', employeeName: 'Emmanuel Niyonsenga', department: 'Logistics', category: 'Medical Emergency', priority: 'CRITICAL', assignedOfficer: 'Patrick Habimana', status: 'IN_PROGRESS', submittedAt: '2026-07-07T06:00:00Z' },
  { id: 'ec2', caseNumber: 'EMG-2026-0011', employeeName: 'Eric Habyarimana', department: 'Medical', category: 'Family Crisis', priority: 'HIGH', assignedOfficer: 'Jean Mukamana', status: 'COMPLETED', submittedAt: '2026-07-05T11:00:00Z' },
];

export const MOCK_COUNSELING: CounselingReferral[] = [
  { id: 'cr1', employeeName: 'Patrick Habimana', referralDate: '2026-06-15', counselor: 'Dr. Marie Uwimana', status: 'IN_PROGRESS', nextAppointment: '2026-07-12' },
  { id: 'cr2', employeeName: 'Alice Uwase', referralDate: '2026-07-01', counselor: 'Dr. Paul Nkurunziza', status: 'ACTIVE', nextAppointment: '2026-07-15' },
];

export const MOCK_FAMILY_SUPPORT: FamilySupportRecord[] = [
  { id: 'fs1', employeeName: 'Patrick Habimana', program: 'Dependent Assistance', dependents: 2, status: 'ACTIVE', supportPeriod: '2026-01-01 – 2026-12-31' },
  { id: 'fs2', employeeName: 'Claire Mutesi', program: 'Child Education Program', dependents: 1, status: 'ACTIVE', supportPeriod: '2026-01-01 – 2026-12-31' },
];

export const MOCK_WELLNESS: WellnessProgram[] = [
  { id: 'wl1', name: '30-Day Fitness Challenge', participants: 156, completionRate: 72, upcomingSessions: 4, feedbackScore: 4.5, status: 'ACTIVE' },
  { id: 'wl2', name: 'Mental Wellness Seminar Series', participants: 89, completionRate: 85, upcomingSessions: 2, feedbackScore: 4.8, status: 'ACTIVE' },
  { id: 'wl3', name: 'Nutrition Awareness Campaign', participants: 210, completionRate: 60, upcomingSessions: 1, feedbackScore: 4.2, status: 'ACTIVE' },
];

export const MOCK_EVENTS: WelfareEvent[] = [
  { id: 'ev1', title: 'Family Day 2026', date: '2026-08-15', venue: 'Kigali Convention Centre', organizer: 'HR Welfare', capacity: 500, registered: 342, status: 'ACTIVE' },
  { id: 'ev2', title: 'Blood Donation Drive', date: '2026-07-20', venue: 'Kanombe Medical Centre', organizer: 'Medical Corps', capacity: 100, registered: 78, status: 'ACTIVE' },
  { id: 'ev3', title: 'Wellness Fair', date: '2026-09-10', venue: 'Kigali HQ', organizer: 'Welfare Directorate', capacity: 300, registered: 45, status: 'ACTIVE' },
];

export const MOCK_APPLICATIONS: WelfareApplication[] = [
  { id: 'app1', applicationNumber: 'WFA-2026-0045', employeeName: 'Grace Ingabire', program: 'Education Grant', submittedAt: '2026-07-04T10:00:00Z', status: 'PENDING', assignedOfficer: 'Patrick Habimana' },
  { id: 'app2', applicationNumber: 'WFA-2026-0042', employeeName: 'Fabrice Nkurunziza', program: 'Housing Allowance', submittedAt: '2026-07-01T09:00:00Z', status: 'APPROVED', assignedOfficer: 'Patrick Habimana' },
];

export const MOCK_MY_BENEFITS: MyBenefit[] = [
  { id: 'mb1', name: 'Health Insurance', coverage: 'Full family coverage', status: 'ACTIVE' },
  { id: 'mb2', name: 'Housing Allowance', coverage: 'RWF 150,000/month', status: 'ACTIVE', expiryDate: '2026-12-31' },
  { id: 'mb3', name: 'Education Grant', coverage: 'Up to RWF 2M/year', status: 'ACTIVE' },
];

export const MOCK_DOCUMENTS: WelfareDocument[] = [
  { id: 'doc1', name: 'Hardship Fund Application', type: 'APPLICATION', employeeName: 'Patrick Habimana', uploadedAt: '2026-07-06T09:00:00Z' },
  { id: 'doc2', name: 'Welfare Policy 2026', type: 'POLICY', uploadedAt: '2026-01-01T00:00:00Z' },
  { id: 'doc3', name: 'Approval Letter — Education Grant', type: 'APPROVAL', employeeName: 'Alice Uwase', uploadedAt: '2026-07-03T14:00:00Z' },
];

export const MOCK_WELFARE_HISTORY: WelfareHistoryEntry[] = [
  { id: 'h1', employeeName: 'Patrick Habimana', event: 'Benefit Enrollment', description: 'Enrolled in Housing Allowance program', date: '2026-01-15T00:00:00Z' },
  { id: 'h2', employeeName: 'Alice Uwase', event: 'Assistance Approved', description: 'Education Grant — WFA-2026-0042', date: '2026-07-03T14:00:00Z' },
  { id: 'h3', employeeName: 'Emmanuel Niyonsenga', event: 'Emergency Assistance', description: 'EMG-2026-0012 — Medical emergency', date: '2026-07-07T06:00:00Z' },
  { id: 'h4', employeeName: 'Patrick Habimana', event: 'Wellness Participation', description: 'Joined 30-Day Fitness Challenge', date: '2026-06-01T00:00:00Z' },
];
