export type MedicalStatus =
  | 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  | 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT' | 'ISSUED' | 'REVOKED' | 'EXPIRED'
  | 'ACTIVE' | 'CLEARED' | 'RESTRICTED' | 'UNDER_REVIEW' | 'FIT' | 'FIT_WITH_RESTRICTIONS'
  | 'TEMPORARILY_UNFIT' | 'LIMITED_DUTY' | 'RESOLVED' | 'OPEN';

export interface MedicalAppointment {
  id: string;
  appointmentNumber: string;
  personnelName: string;
  department: string;
  medicalProfessional: string;
  date: string;
  time: string;
  location: string;
  appointmentType: string;
  status: MedicalStatus;
}

export interface MedicalProfile {
  id: string;
  personnelNumber: string;
  firstName: string;
  lastName: string;
  department: string;
  age: number;
  bloodGroup?: string;
  emergencyContact: string;
  medicalStatus: MedicalStatus;
  fitnessStatus: string;
  clearanceStatus: string;
  nextAssessmentDate?: string;
}

export interface MedicalAssessment {
  id: string;
  personnelName: string;
  category: string;
  assessmentDate: string;
  examiner: string;
  status: MedicalStatus;
  followUpRequired: boolean;
}

export interface MedicalClearance {
  id: string;
  personnelName: string;
  clearanceType: string;
  issueDate: string;
  expiryDate: string;
  status: MedicalStatus;
  approvedBy: string;
}

export interface FitnessRecord {
  id: string;
  personnelName: string;
  classification: string;
  restrictions?: string;
  reviewDate: string;
  status: MedicalStatus;
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  personnelName: string;
  vaccine: string;
  dose: string;
  administrationDate: string;
  nextDueDate?: string;
  provider: string;
  status: MedicalStatus;
}

export interface LabResult {
  id: string;
  personnelName: string;
  testName: string;
  resultDate: string;
  status: MedicalStatus;
  provider: string;
}

export interface MedicalReferral {
  id: string;
  referralNumber: string;
  personnelName: string;
  reason: string;
  receivingFacility: string;
  appointmentDate?: string;
  status: MedicalStatus;
  outcome?: string;
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  personnelName?: string;
  uploadedAt: string;
}

export interface MedicalIncident {
  id: string;
  incidentNumber: string;
  personnelName: string;
  date: string;
  location: string;
  description: string;
  severity: string;
  status: MedicalStatus;
}

export interface HealthCampaign {
  id: string;
  name: string;
  participants: number;
  completionRate: number;
  upcomingSessions: number;
  feedbackScore: number;
  status: MedicalStatus;
}

export interface MedicalApproval {
  id: string;
  personnelName: string;
  request: string;
  status: MedicalStatus;
  reviewer: string;
  submittedAt: string;
}

export interface MedicalHistoryEntry {
  id: string;
  personnelName: string;
  event: string;
  description: string;
  date: string;
}

export const MEDICAL_DASHBOARD_KPIS = {
  totalUnderCare: 1842,
  appointmentsToday: 18,
  upcomingAppointments: 42,
  pendingAssessments: 15,
  pendingClearances: 8,
  medicallyCleared: 1765,
  awaitingReview: 12,
  referralCases: 6,
  occupationalCases: 9,
  activeCampaigns: 3,
};

export const ASSESSMENT_STATUS_BREAKDOWN = [
  { name: 'Pending', value: 15 },
  { name: 'Completed', value: 142 },
  { name: 'Under Review', value: 8 },
  { name: 'Expired', value: 5 },
];

export const CLEARANCE_STATUS_BREAKDOWN = [
  { name: 'Cleared', value: 1765 },
  { name: 'Restricted', value: 45 },
  { name: 'Pending', value: 8 },
  { name: 'Expired', value: 24 },
];

export const MONTHLY_APPOINTMENT_TREND = [
  { month: 'Jan', appointments: 120 }, { month: 'Feb', appointments: 135 },
  { month: 'Mar', appointments: 148 }, { month: 'Apr', appointments: 112 },
  { month: 'May', appointments: 156 }, { month: 'Jun', appointments: 138 },
  { month: 'Jul', appointments: 95 },
];

export const OCCUPATIONAL_BY_DEPARTMENT = [
  { name: 'Logistics', value: 12 }, { name: 'Medical', value: 8 }, { name: 'IT', value: 5 },
  { name: 'Training', value: 7 }, { name: 'Finance', value: 3 }, { name: 'HR', value: 4 },
];

export const CAMPAIGN_PARTICIPATION = [
  { name: 'Medical Screening', value: 420 },
  { name: 'Vaccination Drive', value: 380 },
  { name: 'Mental Wellness', value: 210 },
  { name: 'Blood Donation', value: 156 },
];

export const MOCK_APPOINTMENTS: MedicalAppointment[] = [
  { id: 'a1', appointmentNumber: 'MAP-2026-0045', personnelName: 'Patrick Habimana', department: 'HR', medicalProfessional: 'Dr. Marie Uwimana', date: '2026-07-08', time: '09:00', location: 'Kanombe Medical Centre', appointmentType: 'Routine Assessment', status: 'SCHEDULED' },
  { id: 'a2', appointmentNumber: 'MAP-2026-0042', personnelName: 'Alice Uwase', department: 'IT', medicalProfessional: 'Dr. Paul Nkurunziza', date: '2026-07-07', time: '14:30', location: 'Kigali HQ Clinic', appointmentType: 'Follow-up', status: 'CONFIRMED' },
  { id: 'a3', appointmentNumber: 'MAP-2026-0040', personnelName: 'Emmanuel Niyonsenga', department: 'Logistics', medicalProfessional: 'Dr. Marie Uwimana', date: '2026-07-07', time: '11:00', location: 'Kanombe Medical Centre', appointmentType: 'Fitness Assessment', status: 'COMPLETED' },
];

export const MOCK_PROFILES: MedicalProfile[] = [
  { id: 'mp1', personnelNumber: 'MOD-2012-0045', firstName: 'Patrick', lastName: 'Habimana', department: 'HR', age: 38, bloodGroup: 'O+', emergencyContact: 'Marie Habimana — +250 788 123 456', medicalStatus: 'CLEARED', fitnessStatus: 'Fit', clearanceStatus: 'Cleared', nextAssessmentDate: '2026-12-15' },
  { id: 'mp2', personnelNumber: 'MOD-2015-0089', firstName: 'Alice', lastName: 'Uwase', department: 'IT', age: 32, bloodGroup: 'A+', emergencyContact: 'Jean Uwase — +250 788 234 567', medicalStatus: 'UNDER_REVIEW', fitnessStatus: 'Fit with Restrictions', clearanceStatus: 'Restricted', nextAssessmentDate: '2026-08-20' },
  { id: 'mp3', personnelNumber: 'MOD-2010-0012', firstName: 'Emmanuel', lastName: 'Niyonsenga', department: 'Logistics', age: 42, bloodGroup: 'B+', emergencyContact: 'Grace Niyonsenga — +250 788 345 678', medicalStatus: 'CLEARED', fitnessStatus: 'Fit', clearanceStatus: 'Cleared' },
];

export const MOCK_ASSESSMENTS: MedicalAssessment[] = [
  { id: 'as1', personnelName: 'Patrick Habimana', category: 'Annual Assessment', assessmentDate: '2026-01-15', examiner: 'Dr. Marie Uwimana', status: 'COMPLETED', followUpRequired: false },
  { id: 'as2', personnelName: 'Alice Uwase', category: 'Return-to-Work Assessment', assessmentDate: '2026-07-05', examiner: 'Dr. Paul Nkurunziza', status: 'UNDER_REVIEW', followUpRequired: true },
  { id: 'as3', personnelName: 'Emmanuel Niyonsenga', category: 'Fitness Assessment', assessmentDate: '2026-06-20', examiner: 'Dr. Marie Uwimana', status: 'APPROVED', followUpRequired: false },
];

export const MOCK_CLEARANCES: MedicalClearance[] = [
  { id: 'cl1', personnelName: 'Patrick Habimana', clearanceType: 'General Fitness', issueDate: '2026-01-20', expiryDate: '2027-01-20', status: 'CLEARED', approvedBy: 'Dr. Marie Uwimana' },
  { id: 'cl2', personnelName: 'Alice Uwase', clearanceType: 'Return to Work', issueDate: '2026-07-06', expiryDate: '2026-10-06', status: 'RESTRICTED', approvedBy: 'Dr. Paul Nkurunziza' },
  { id: 'cl3', personnelName: 'Emmanuel Niyonsenga', clearanceType: 'Travel Clearance', issueDate: '2026-05-10', expiryDate: '2026-11-10', status: 'CLEARED', approvedBy: 'Dr. Marie Uwimana' },
];

export const MOCK_FITNESS: FitnessRecord[] = [
  { id: 'f1', personnelName: 'Patrick Habimana', classification: 'Fit', reviewDate: '2026-12-15', status: 'FIT', notes: 'No restrictions' },
  { id: 'f2', personnelName: 'Alice Uwase', classification: 'Fit with Restrictions', restrictions: 'No heavy lifting for 8 weeks', reviewDate: '2026-08-20', status: 'FIT_WITH_RESTRICTIONS' },
  { id: 'f3', personnelName: 'Claire Mutesi', classification: 'Under Review', reviewDate: '2026-07-15', status: 'UNDER_REVIEW' },
];

export const MOCK_VACCINATIONS: VaccinationRecord[] = [
  { id: 'v1', personnelName: 'Patrick Habimana', vaccine: 'Hepatitis B', dose: '3rd Dose', administrationDate: '2026-03-15', provider: 'Kanombe Medical Centre', status: 'COMPLETED' },
  { id: 'v2', personnelName: 'Patrick Habimana', vaccine: 'Tetanus', dose: 'Booster', administrationDate: '2025-11-20', nextDueDate: '2030-11-20', provider: 'Kigali HQ Clinic', status: 'COMPLETED' },
  { id: 'v3', personnelName: 'Alice Uwase', vaccine: 'Influenza', dose: 'Annual', administrationDate: '2026-06-01', nextDueDate: '2027-06-01', provider: 'Kigali HQ Clinic', status: 'COMPLETED' },
];

export const MOCK_LAB_RESULTS: LabResult[] = [
  { id: 'lr1', personnelName: 'Patrick Habimana', testName: 'Complete Blood Count', resultDate: '2026-01-15', status: 'COMPLETED', provider: 'Kanombe Lab' },
  { id: 'lr2', personnelName: 'Alice Uwase', testName: 'Chest X-Ray', resultDate: '2026-07-05', status: 'UNDER_REVIEW', provider: 'Kigali Imaging Centre' },
];

export const MOCK_REFERRALS: MedicalReferral[] = [
  { id: 'rf1', referralNumber: 'MRF-2026-0012', personnelName: 'Alice Uwase', reason: 'Orthopedic consultation', receivingFacility: 'CHUK', appointmentDate: '2026-07-20', status: 'SCHEDULED' },
  { id: 'rf2', referralNumber: 'MRF-2026-0010', personnelName: 'Emmanuel Niyonsenga', reason: 'Cardiology follow-up', receivingFacility: 'King Faisal Hospital', status: 'COMPLETED', outcome: 'Stable — annual review recommended' },
];

export const MOCK_DOCUMENTS: MedicalDocument[] = [
  { id: 'd1', name: 'Medical Clearance Certificate', type: 'CLEARANCE', personnelName: 'Patrick Habimana', uploadedAt: '2026-01-20T10:00:00Z' },
  { id: 'd2', name: 'Annual Assessment Report', type: 'ASSESSMENT', personnelName: 'Patrick Habimana', uploadedAt: '2026-01-15T14:00:00Z' },
  { id: 'd3', name: 'Referral Letter — Orthopedic', type: 'REFERRAL', personnelName: 'Alice Uwase', uploadedAt: '2026-07-01T09:00:00Z' },
];

export const MOCK_INCIDENTS: MedicalIncident[] = [
  { id: 'i1', incidentNumber: 'MIN-2026-0008', personnelName: 'Emmanuel Niyonsenga', date: '2026-06-28', location: 'Warehouse B', description: 'Minor back strain during lifting', severity: 'Minor', status: 'RESOLVED' },
  { id: 'i2', incidentNumber: 'MIN-2026-0009', personnelName: 'Fabrice Nkurunziza', date: '2026-07-03', location: 'Training Ground', description: 'Ankle sprain during exercise', severity: 'Moderate', status: 'OPEN' },
];

export const MOCK_CAMPAIGNS: HealthCampaign[] = [
  { id: 'hc1', name: 'Annual Medical Screening 2026', participants: 420, completionRate: 68, upcomingSessions: 5, feedbackScore: 4.6, status: 'ACTIVE' },
  { id: 'hc2', name: 'Hepatitis B Vaccination Drive', participants: 380, completionRate: 85, upcomingSessions: 2, feedbackScore: 4.8, status: 'ACTIVE' },
  { id: 'hc3', name: 'Mental Wellness Awareness', participants: 210, completionRate: 45, upcomingSessions: 3, feedbackScore: 4.4, status: 'ACTIVE' },
];

export const MOCK_APPROVALS: MedicalApproval[] = [
  { id: 'ap1', personnelName: 'Alice Uwase', request: 'Return-to-Work Clearance', status: 'PENDING', reviewer: 'Dr. Paul Nkurunziza', submittedAt: '2026-07-06T10:00:00Z' },
  { id: 'ap2', personnelName: 'Claire Mutesi', request: 'Fitness Certification', status: 'UNDER_REVIEW', reviewer: 'Dr. Marie Uwimana', submittedAt: '2026-07-05T14:00:00Z' },
];

export const MOCK_MEDICAL_HISTORY: MedicalHistoryEntry[] = [
  { id: 'h1', personnelName: 'Patrick Habimana', event: 'Medical Assessment', description: 'Annual assessment completed — Fit', date: '2026-01-15T00:00:00Z' },
  { id: 'h2', personnelName: 'Patrick Habimana', event: 'Medical Clearance', description: 'General Fitness clearance issued', date: '2026-01-20T00:00:00Z' },
  { id: 'h3', personnelName: 'Alice Uwase', event: 'Referral', description: 'MRF-2026-0012 — Orthopedic consultation', date: '2026-07-01T00:00:00Z' },
  { id: 'h4', personnelName: 'Emmanuel Niyonsenga', event: 'Laboratory Result', description: 'Complete Blood Count — Normal', date: '2026-06-20T00:00:00Z' },
];

export const MY_MEDICAL_STATUS = {
  clearanceStatus: 'Cleared' as const,
  nextAssessmentDate: '2026-12-15',
  restrictions: null as string | null,
  fitnessStatus: 'Fit',
};
