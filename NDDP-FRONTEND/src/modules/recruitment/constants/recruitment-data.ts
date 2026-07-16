export type RequisitionStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CLOSED';
export type VacancyStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'CANCELLED' | 'DRAFT';
export type ApplicationStatus = 'SUBMITTED' | 'SCREENING' | 'SHORTLISTED' | 'INTERVIEW' | 'ASSESSED' | 'OFFERED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
export type OfferStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
export type WorkforceRequestStatus = 'PENDING' | 'MANAGER_APPROVED' | 'HR_APPROVED' | 'RECRUITMENT' | 'COMPLETED' | 'REJECTED';

export interface WorkforceRequest {
  id: string;
  requestNumber: string;
  department: string;
  position: string;
  numberRequired: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  requestedBy: string;
  requestedDate: string;
  status: WorkforceRequestStatus;
}

export interface JobRequisition {
  id: string;
  requisitionNumber: string;
  department: string;
  position: string;
  employmentType: string;
  vacancies: number;
  reason: string;
  budgetApproved: boolean;
  expectedStartDate: string;
  hiringManager: string;
  priority: string;
  status: RequisitionStatus;
}

export interface Vacancy {
  id: string;
  vacancyNumber: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  openDate: string;
  closingDate: string;
  applicationsReceived: number;
  status: VacancyStatus;
}

export interface JobAdvertisement {
  id: string;
  vacancyId: string;
  jobTitle: string;
  department: string;
  deadline: string;
  employmentType: string;
  location: string;
  published: boolean;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePhotoUrl?: string;
  source: string;
  resumeUrl?: string;
}

export interface Application {
  id: string;
  applicationNumber: string;
  candidateId: string;
  candidateName: string;
  position: string;
  department: string;
  applicationDate: string;
  status: ApplicationStatus;
  recruiter?: string;
  interviewStatus?: string;
  finalDecision?: string;
  vacancyId?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateName: string;
  position: string;
  interviewType: string;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  meetingLink?: string;
  panelMembers: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
}

export interface Assessment {
  id: string;
  applicationId: string;
  candidateName: string;
  type: string;
  score: number;
  passMark: number;
  evaluator: string;
  passed: boolean;
}

export interface Offer {
  id: string;
  applicationId: string;
  candidateName: string;
  position: string;
  department: string;
  startDate: string;
  expiryDate: string;
  status: OfferStatus;
}

export interface TalentPoolCandidate {
  id: string;
  name: string;
  email: string;
  category: string;
  skills: string[];
  lastContact: string;
  notes?: string;
}

export interface RecruitmentActivity {
  id: string;
  action: string;
  subject: string;
  timestamp: string;
}

export const RECRUITMENT_DASHBOARD_KPIS = {
  openVacancies: 24,
  draftRequisitions: 5,
  pendingApprovals: 8,
  applicationsReceived: 342,
  candidatesShortlisted: 48,
  interviewsScheduled: 22,
  offersSent: 12,
  offersAccepted: 9,
  offersDeclined: 2,
  candidatesOnboarded: 7,
  averageTimeToHire: 32,
  recruitmentCost: 18500000,
};

export const RECRUITMENT_PIPELINE = [
  { stage: 'Vacancies', count: 24 },
  { stage: 'Applications', count: 342 },
  { stage: 'Screened', count: 186 },
  { stage: 'Shortlisted', count: 48 },
  { stage: 'Interviewed', count: 35 },
  { stage: 'Selected', count: 18 },
  { stage: 'Offer Sent', count: 12 },
  { stage: 'Offer Accepted', count: 9 },
  { stage: 'Onboarded', count: 7 },
];

export const APPLICATIONS_BY_DEPARTMENT = [
  { name: 'IT', value: 68 },
  { name: 'Logistics', value: 52 },
  { name: 'Medical', value: 41 },
  { name: 'Finance', value: 38 },
  { name: 'HR', value: 29 },
  { name: 'Engineering', value: 74 },
  { name: 'Training', value: 40 },
];

export const HIRING_TREND = [
  { month: 'Jan', hires: 4 }, { month: 'Feb', hires: 6 }, { month: 'Mar', hires: 8 },
  { month: 'Apr', hires: 5 }, { month: 'May', hires: 9 }, { month: 'Jun', hires: 7 },
];

export const CANDIDATE_SOURCES = [
  { name: 'Career Portal', value: 142 },
  { name: 'Employee Referral', value: 68 },
  { name: 'Job Boards', value: 54 },
  { name: 'Universities', value: 48 },
  { name: 'Internal Transfer', value: 30 },
];

export const RECRUITMENT_STATUS_BREAKDOWN = [
  { name: 'Open', value: 24 },
  { name: 'In Progress', value: 18 },
  { name: 'Closed', value: 42 },
  { name: 'Cancelled', value: 3 },
];

export const RECRUITMENT_RECENT_ACTIVITY: RecruitmentActivity[] = [
  { id: '1', action: 'Application received', subject: 'Eric Niyonsenga — Software Engineer', timestamp: '2026-07-07T10:00:00Z' },
  { id: '2', action: 'Interview scheduled', subject: 'Claire Mutesi — Finance Officer', timestamp: '2026-07-07T09:30:00Z' },
  { id: '3', action: 'Offer accepted', subject: 'Patrick Habimana — HR Assistant', timestamp: '2026-07-06T16:00:00Z' },
  { id: '4', action: 'Vacancy published', subject: 'Logistics Officer — Kigali', timestamp: '2026-07-06T14:20:00Z' },
  { id: '5', action: 'Candidate onboarded', subject: 'Alice Uwase — Digitalization Officer', timestamp: '2026-07-05T11:00:00Z' },
];

export const MOCK_WORKFORCE_REQUESTS: WorkforceRequest[] = [
  { id: 'wr1', requestNumber: 'WR-2026-001', department: 'Information Technology', position: 'Software Engineer', numberRequired: 2, priority: 'HIGH', requestedBy: 'Alice Uwase', requestedDate: '2026-06-15', status: 'RECRUITMENT' },
  { id: 'wr2', requestNumber: 'WR-2026-002', department: 'Logistics', position: 'Logistics Officer', numberRequired: 3, priority: 'MEDIUM', requestedBy: 'Emmanuel Niyonsenga', requestedDate: '2026-06-20', status: 'HR_APPROVED' },
  { id: 'wr3', requestNumber: 'WR-2026-003', department: 'Medical', position: 'Medical Officer', numberRequired: 1, priority: 'URGENT', requestedBy: 'Eric Habyarimana', requestedDate: '2026-07-01', status: 'PENDING' },
];

export const MOCK_REQUISITIONS: JobRequisition[] = [
  { id: 'rq1', requisitionNumber: 'REQ-2026-014', department: 'IT', position: 'Software Engineer', employmentType: 'Permanent', vacancies: 2, reason: 'Digital transformation expansion', budgetApproved: true, expectedStartDate: '2026-09-01', hiringManager: 'Alice Uwase', priority: 'HIGH', status: 'APPROVED' },
  { id: 'rq2', requisitionNumber: 'REQ-2026-015', department: 'Logistics', position: 'Logistics Officer', employmentType: 'Contract', vacancies: 3, reason: 'Supply chain capacity', budgetApproved: true, expectedStartDate: '2026-08-15', hiringManager: 'Emmanuel Niyonsenga', priority: 'MEDIUM', status: 'PENDING_APPROVAL' },
  { id: 'rq3', requisitionNumber: 'REQ-2026-016', department: 'Finance', position: 'Finance Officer', employmentType: 'Permanent', vacancies: 1, reason: 'Retirement replacement', budgetApproved: false, expectedStartDate: '2026-10-01', hiringManager: 'Claire Mutesi', priority: 'LOW', status: 'DRAFT' },
];

export const MOCK_VACANCIES: Vacancy[] = [
  { id: 'v1', vacancyNumber: 'VAC-2026-042', jobTitle: 'Software Engineer', department: 'Information Technology', location: 'Kigali HQ', employmentType: 'Permanent', openDate: '2026-06-20', closingDate: '2026-07-20', applicationsReceived: 48, status: 'OPEN' },
  { id: 'v2', vacancyNumber: 'VAC-2026-043', jobTitle: 'Logistics Officer', department: 'Logistics', location: 'Kigali Depot', employmentType: 'Contract', openDate: '2026-06-25', closingDate: '2026-07-25', applicationsReceived: 32, status: 'IN_PROGRESS' },
  { id: 'v3', vacancyNumber: 'VAC-2026-044', jobTitle: 'Medical Officer', department: 'Medical', location: 'Kanombe', employmentType: 'Permanent', openDate: '2026-07-01', closingDate: '2026-08-01', applicationsReceived: 18, status: 'OPEN' },
  { id: 'v4', vacancyNumber: 'VAC-2026-038', jobTitle: 'HR Assistant', department: 'Human Resources', location: 'Kigali HQ', employmentType: 'Permanent', openDate: '2026-05-01', closingDate: '2026-06-01', applicationsReceived: 56, status: 'CLOSED' },
];

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', firstName: 'Eric', lastName: 'Niyonsenga', email: 'eric.n@email.com', phone: '+250 788 400 001', source: 'Career Portal' },
  { id: 'c2', firstName: 'Claire', lastName: 'Mutesi', email: 'claire.m@email.com', phone: '+250 788 400 002', source: 'Employee Referral' },
  { id: 'c3', firstName: 'Fabrice', lastName: 'Nkurunziza', email: 'fabrice.n@email.com', source: 'University' },
  { id: 'c4', firstName: 'Grace', lastName: 'Ingabire', email: 'grace.i@email.com', source: 'Job Board' },
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'a1', applicationNumber: 'APP-2026-1201', candidateId: 'c1', candidateName: 'Eric Niyonsenga', position: 'Software Engineer', department: 'IT', applicationDate: '2026-07-05', status: 'INTERVIEW', recruiter: 'Patrick Habimana', interviewStatus: 'Scheduled', vacancyId: 'v1' },
  { id: 'a2', applicationNumber: 'APP-2026-1202', candidateId: 'c2', candidateName: 'Claire Mutesi', position: 'Finance Officer', department: 'Finance', applicationDate: '2026-07-04', status: 'SHORTLISTED', recruiter: 'Patrick Habimana', vacancyId: 'v2' },
  { id: 'a3', applicationNumber: 'APP-2026-1203', candidateId: 'c3', candidateName: 'Fabrice Nkurunziza', position: 'Logistics Officer', department: 'Logistics', applicationDate: '2026-07-03', status: 'SCREENING', recruiter: 'Patrick Habimana', vacancyId: 'v2' },
  { id: 'a4', applicationNumber: 'APP-2026-1198', candidateId: 'c4', candidateName: 'Grace Ingabire', position: 'HR Assistant', department: 'HR', applicationDate: '2026-06-15', status: 'OFFERED', recruiter: 'Patrick Habimana', finalDecision: 'Pending', vacancyId: 'v4' },
  { id: 'a5', applicationNumber: 'APP-2026-1185', candidateName: 'Former Candidate', candidateId: 'c5', position: 'Medical Officer', department: 'Medical', applicationDate: '2026-05-20', status: 'HIRED', recruiter: 'Patrick Habimana', finalDecision: 'Hired', interviewStatus: 'Completed' },
];

export const MOCK_INTERVIEWS: Interview[] = [
  { id: 'i1', applicationId: 'a1', candidateName: 'Eric Niyonsenga', position: 'Software Engineer', interviewType: 'Technical', scheduledDate: '2026-07-10', scheduledTime: '10:00', location: 'Kigali HQ — Room 204', panelMembers: ['Alice Uwase', 'Patrick Habimana'], status: 'SCHEDULED' },
  { id: 'i2', applicationId: 'a2', candidateName: 'Claire Mutesi', position: 'Finance Officer', interviewType: 'Panel', scheduledDate: '2026-07-12', scheduledTime: '14:00', location: 'Virtual', meetingLink: 'https://meet.mod.gov.rw/interview-002', panelMembers: ['Claire Mutesi', 'Jean Mukamana'], status: 'SCHEDULED' },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  { id: 'as1', applicationId: 'a1', candidateName: 'Eric Niyonsenga', type: 'Technical Assessment', score: 82, passMark: 70, evaluator: 'Alice Uwase', passed: true },
  { id: 'as2', applicationId: 'a3', candidateName: 'Fabrice Nkurunziza', type: 'Written Test', score: 65, passMark: 70, evaluator: 'Emmanuel Niyonsenga', passed: false },
];

export const MOCK_OFFERS: Offer[] = [
  { id: 'o1', applicationId: 'a4', candidateName: 'Grace Ingabire', position: 'HR Assistant', department: 'Human Resources', startDate: '2026-08-01', expiryDate: '2026-07-20', status: 'SENT' },
  { id: 'o2', applicationId: 'a5', candidateName: 'Former Candidate', position: 'Medical Officer', department: 'Medical', startDate: '2026-06-01', expiryDate: '2026-05-25', status: 'ACCEPTED' },
];

export const MOCK_TALENT_POOL: TalentPoolCandidate[] = [
  { id: 'tp1', name: 'Eric Niyonsenga', email: 'eric.n@email.com', category: 'Experienced Professionals', skills: ['Software Development', 'Cloud'], lastContact: '2026-07-05' },
  { id: 'tp2', name: 'Graduate Pool A', email: 'grad.a@email.com', category: 'Graduate Candidates', skills: ['Data Analysis'], lastContact: '2026-06-10', notes: 'Strong internship performance' },
];

export const ONBOARDING_CHECKLIST = [
  { id: 'ob1', label: 'Offer Accepted', completed: true },
  { id: 'ob2', label: 'Documents Submitted', completed: true },
  { id: 'ob3', label: 'Medical Clearance', completed: false },
  { id: 'ob4', label: 'Account Creation', completed: false },
  { id: 'ob5', label: 'Orientation Scheduled', completed: false },
  { id: 'ob6', label: 'Equipment Request', completed: false },
  { id: 'ob7', label: 'Manager Assigned', completed: true },
  { id: 'ob8', label: 'Personnel Record Created', completed: false },
];

export const BACKGROUND_CHECKS = [
  { id: 'bg1', candidate: 'Grace Ingabire', identity: 'VERIFIED', employment: 'PENDING', academic: 'VERIFIED', references: 'PENDING', certifications: 'N/A', status: 'PENDING' },
  { id: 'bg2', candidate: 'Eric Niyonsenga', identity: 'VERIFIED', employment: 'VERIFIED', academic: 'VERIFIED', references: 'VERIFIED', certifications: 'VERIFIED', status: 'VERIFIED' },
];

export const INTERVIEW_PANEL = [
  { id: 'ip1', name: 'Alice Uwase', role: 'Technical Lead', department: 'IT', availability: 'Available' },
  { id: 'ip2', name: 'Patrick Habimana', role: 'HR Representative', department: 'HR', availability: 'Available' },
  { id: 'ip3', name: 'Jean Mukamana', role: 'Hiring Manager', department: 'HQ', availability: 'Conflict on Jul 10' },
];
