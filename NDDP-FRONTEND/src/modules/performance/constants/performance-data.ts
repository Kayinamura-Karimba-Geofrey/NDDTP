export type PerformanceStatus =
  | 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'APPROVED' | 'REJECTED'
  | 'OPEN' | 'CLOSED' | 'ARCHIVED' | 'PLANNED' | 'SELF_SUBMITTED' | 'MANAGER_REVIEW'
  | 'CALIBRATION' | 'FINALIZED' | 'IN_PROGRESS' | 'ON_TRACK' | 'AT_RISK' | 'OVERDUE';

export type RatingLevel =
  | 'OUTSTANDING' | 'EXCEEDS' | 'MEETS' | 'PARTIALLY_MEETS' | 'NEEDS_IMPROVEMENT' | 'BELOW' | 'UNSATISFACTORY';

export interface PerformanceGoal {
  id: string;
  goalNumber?: string;
  title: string;
  description?: string;
  owner?: string;
  employee?: string;
  supervisor?: string;
  department?: string;
  level: 'organizational' | 'department' | 'individual';
  strategicObjective?: string;
  weight?: number;
  target?: string;
  measurementMethod?: string;
  startDate?: string;
  targetDate?: string;
  dueDate?: string;
  progressPercent: number;
  status: PerformanceStatus;
}

export interface KpiRecord {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  actualValue: number;
  frequency: string;
  weight: number;
  status: PerformanceStatus;
}

export interface CompetencyRating {
  id: string;
  category: string;
  level: string;
  rating: number;
  comments?: string;
  employee?: string;
}

export interface PerformanceReview {
  id: string;
  reviewNumber: string;
  employee: string;
  reviewer?: string;
  cycle: string;
  reviewType: string;
  overallRating?: RatingLevel | string;
  status: PerformanceStatus;
  submittedAt?: string;
}

export interface FeedbackRecord {
  id: string;
  type: string;
  from: string;
  to: string;
  message: string;
  date: string;
  acknowledged: boolean;
}

export interface RecognitionAward {
  id: string;
  award: string;
  employee: string;
  reason: string;
  date: string;
  department: string;
  presentedBy: string;
}

export interface ImprovementPlan {
  id: string;
  planNumber: string;
  employee: string;
  supervisor: string;
  performanceGap: string;
  timeline: string;
  status: PerformanceStatus;
}

export interface DevelopmentPlan {
  id: string;
  employee: string;
  careerGoals: string;
  progress: number;
  status: PerformanceStatus;
}

export interface CoachingSession {
  id: string;
  coach: string;
  employee: string;
  objectives: string;
  nextMeeting?: string;
  progress: string;
}

export interface ReviewCycle {
  id: string;
  code: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: PerformanceStatus;
}

export interface PerformanceApproval {
  id: string;
  type: string;
  reference: string;
  requester: string;
  submittedDate: string;
  status: PerformanceStatus;
}

export const PERFORMANCE_DASHBOARD_KPIS = {
  activeReviews: 186,
  employeesReviewed: 142,
  reviewsPending: 44,
  averageScore: 3.8,
  highPerformers: 68,
  onImprovementPlans: 12,
  completedDevelopmentPlans: 89,
  activeCoachingSessions: 24,
  outstandingObjectives: 156,
  orgGoalAchievement: 72,
};

export const PERFORMANCE_DISTRIBUTION = [
  { name: 'Outstanding', value: 18 },
  { name: 'Exceeds Expectations', value: 32 },
  { name: 'Meets Expectations', value: 38 },
  { name: 'Needs Improvement', value: 9 },
  { name: 'Unsatisfactory', value: 3 },
];

export const DEPARTMENT_PERFORMANCE = [
  { name: 'Operations', score: 4.1 },
  { name: 'Medical', score: 4.3 },
  { name: 'IT', score: 3.9 },
  { name: 'Training', score: 4.0 },
  { name: 'HR', score: 3.7 },
  { name: 'Logistics', score: 3.6 },
];

export const GOAL_ACHIEVEMENT = [
  { level: 'Organizational', percent: 72 },
  { level: 'Departmental', percent: 68 },
  { level: 'Individual', percent: 81 },
];

export const COMPETENCY_DISTRIBUTION = [
  { subject: 'Leadership', A: 78, fullMark: 100 },
  { subject: 'Communication', A: 85, fullMark: 100 },
  { subject: 'Technical', A: 82, fullMark: 100 },
  { subject: 'Teamwork', A: 88, fullMark: 100 },
  { subject: 'Decision Making', A: 75, fullMark: 100 },
  { subject: 'Problem Solving', A: 80, fullMark: 100 },
];

export const PERFORMANCE_TREND = [
  { quarter: 'Q1', score: 3.6 }, { quarter: 'Q2', score: 3.7 },
  { quarter: 'Q3', score: 3.8 }, { quarter: 'Q4', score: 3.9 },
];

export const MOCK_ORG_GOALS: PerformanceGoal[] = [
  { id: 'og1', goalNumber: 'OG-2026-001', title: 'Digital Transformation', strategicObjective: 'Modernize MOD operations', description: 'Complete core systems modernization', owner: 'Executive Leadership', level: 'organizational', weight: 30, startDate: '2025-07-01', targetDate: '2026-06-30', progressPercent: 65, status: 'ACTIVE' },
  { id: 'og2', goalNumber: 'OG-2026-002', title: 'Workforce Readiness', strategicObjective: 'Build capable workforce', owner: 'HR Directorate', level: 'organizational', weight: 25, startDate: '2025-07-01', targetDate: '2026-06-30', progressPercent: 78, status: 'ACTIVE' },
];

export const MOCK_DEPT_GOALS: PerformanceGoal[] = [
  { id: 'dg1', goalNumber: 'DG-IT-2026-001', title: 'Cloud Migration Phase 2', department: 'IT', owner: 'Alice Uwase', level: 'department', target: 'Migrate 80% workloads', progressPercent: 55, status: 'ACTIVE' },
  { id: 'dg2', goalNumber: 'DG-MED-2026-001', title: 'Clinical Quality Improvement', department: 'Medical', owner: 'Dr. Claire Mutesi', level: 'department', target: 'Reduce wait times 20%', progressPercent: 70, status: 'ACTIVE' },
];

export const MOCK_INDIVIDUAL_OBJECTIVES: PerformanceGoal[] = [
  { id: 'io1', goalNumber: 'OBJ-2026-0892', title: 'Complete security certification', employee: 'Alice Uwase', supervisor: 'Jean Mukamana', description: 'Obtain CISSP certification', level: 'individual', weight: 25, target: 'Pass exam by Q3', measurementMethod: 'Certification achieved', dueDate: '2026-09-30', progressPercent: 40, status: 'ACTIVE' },
  { id: 'io2', goalNumber: 'OBJ-2026-0891', title: 'Lead digital onboarding project', employee: 'Patrick Habimana', supervisor: 'Marie Uwase', level: 'individual', weight: 30, target: 'Launch by August', dueDate: '2026-08-31', progressPercent: 75, status: 'ON_TRACK' },
  { id: 'io3', goalNumber: 'OBJ-2026-0890', title: 'Reduce procurement cycle time', employee: 'Eric Niyonsenga', supervisor: 'Marie Uwase', level: 'individual', weight: 20, target: '15% reduction', dueDate: '2026-06-30', progressPercent: 90, status: 'ACTIVE' },
];

export const MOCK_KPIS: KpiRecord[] = [
  { id: 'k1', name: 'Projects Completed', description: 'Major projects delivered on time', targetValue: 12, actualValue: 9, frequency: 'Annual', weight: 20, status: 'ON_TRACK' },
  { id: 'k2', name: 'Training Hours', description: 'Average training hours per employee', targetValue: 40, actualValue: 32, frequency: 'Annual', weight: 15, status: 'AT_RISK' },
  { id: 'k3', name: 'Attendance Rate', description: 'Workforce attendance compliance', targetValue: 98, actualValue: 96, frequency: 'Monthly', weight: 10, status: 'ACTIVE' },
];

export const MOCK_COMPETENCIES: CompetencyRating[] = [
  { id: 'c1', category: 'Leadership', level: 'Advanced', rating: 4, employee: 'Alice Uwase' },
  { id: 'c2', category: 'Communication', level: 'Expert', rating: 5, employee: 'Alice Uwase' },
  { id: 'c3', category: 'Technical Expertise', level: 'Proficient', rating: 4, employee: 'Alice Uwase' },
  { id: 'c4', category: 'Collaboration', level: 'Advanced', rating: 4, employee: 'Alice Uwase' },
];

export const MOCK_REVIEWS: PerformanceReview[] = [
  { id: 'r1', reviewNumber: 'REV-2026-0456', employee: 'Alice Uwase', reviewer: 'Jean Mukamana', cycle: '2026 Annual Review', reviewType: 'Annual', overallRating: 'EXCEEDS', status: 'MANAGER_REVIEW' },
  { id: 'r2', reviewNumber: 'REV-2026-0455', employee: 'Patrick Habimana', reviewer: 'Marie Uwase', cycle: '2026 Annual Review', reviewType: 'Annual', overallRating: 'MEETS', status: 'SELF_SUBMITTED' },
  { id: 'r3', reviewNumber: 'REV-2026-0454', employee: 'Eric Niyonsenga', reviewer: 'Marie Uwase', cycle: '2026 Annual Review', reviewType: 'Annual', overallRating: 'EXCEEDS', status: 'FINALIZED' },
];

export const MOCK_FEEDBACK: FeedbackRecord[] = [
  { id: 'f1', type: 'Positive', from: 'Jean Mukamana', to: 'Alice Uwase', message: 'Excellent leadership on the security audit project.', date: '2026-07-05', acknowledged: true },
  { id: 'f2', type: 'Constructive', from: 'Marie Uwase', to: 'Patrick Habimana', message: 'Consider delegating more to develop team capacity.', date: '2026-07-02', acknowledged: false },
  { id: 'f3', type: 'Recognition', from: 'Executive', to: 'Eric Niyonsenga', message: 'Outstanding procurement process improvements.', date: '2026-06-28', acknowledged: true },
];

export const MOCK_RECOGNITION: RecognitionAward[] = [
  { id: 'aw1', award: 'Employee of the Month', employee: 'Eric Niyonsenga', reason: 'Procurement cycle time reduction', date: '2026-06-30', department: 'Finance', presentedBy: 'Marie Uwase' },
  { id: 'aw2', award: 'Innovation Award', employee: 'Alice Uwase', reason: 'Security automation initiative', date: '2026-05-15', department: 'IT', presentedBy: 'Jean Mukamana' },
];

export const MOCK_PIPS: ImprovementPlan[] = [
  { id: 'pip1', planNumber: 'PIP-2026-0008', employee: 'Grace Ingabire', supervisor: 'Patrick Habimana', performanceGap: 'Attendance and deadline compliance', timeline: '90 days', status: 'ACTIVE' },
];

export const MOCK_IDPS: DevelopmentPlan[] = [
  { id: 'idp1', employee: 'Alice Uwase', careerGoals: 'IT Security Leadership', progress: 65, status: 'ACTIVE' },
  { id: 'idp2', employee: 'Fabrice Nkurunziza', careerGoals: 'Training Program Manager', progress: 40, status: 'ACTIVE' },
];

export const MOCK_COACHING: CoachingSession[] = [
  { id: 'ch1', coach: 'Jean Mukamana', employee: 'Alice Uwase', objectives: 'Leadership development for senior role', nextMeeting: '2026-07-15', progress: 'On track' },
  { id: 'ch2', coach: 'Marie Uwase', employee: 'Patrick Habimana', objectives: 'Delegation and team management', nextMeeting: '2026-07-18', progress: 'In progress' },
];

export const MOCK_CYCLES: ReviewCycle[] = [
  { id: 'cy1', code: 'FY2026-ANNUAL', name: '2026 Annual Review', type: 'ANNUAL', startDate: '2026-04-01', endDate: '2026-07-31', status: 'ACTIVE' },
  { id: 'cy2', code: 'FY2026-Q1', name: 'Q1 2026 Review', type: 'QUARTERLY', startDate: '2026-01-01', endDate: '2026-03-31', status: 'CLOSED' },
  { id: 'cy3', code: 'PROB-2026', name: 'Probation Reviews', type: 'PROBATION', startDate: '2026-01-01', endDate: '2026-12-31', status: 'ACTIVE' },
];

export const MOCK_APPROVALS: PerformanceApproval[] = [
  { id: 'a1', type: 'Performance Review', reference: 'REV-2026-0456', requester: 'Jean Mukamana', submittedDate: '2026-07-06', status: 'PENDING' },
  { id: 'a2', type: 'Development Plan', reference: 'IDP-Alice-2026', requester: 'Alice Uwase', submittedDate: '2026-07-04', status: 'APPROVED' },
  { id: 'a3', type: 'Recognition Award', reference: 'AW-2026-012', requester: 'Marie Uwase', submittedDate: '2026-07-03', status: 'PENDING' },
];

export const MOCK_HISTORY = [
  { id: 'h1', event: 'Goal Created', description: 'OBJ-2026-0892 — Security certification', date: '2026-04-01' },
  { id: 'h2', event: 'Review Completed', description: 'REV-2025-0890 — Annual 2025 — Exceeds', date: '2025-07-15' },
  { id: 'h3', event: 'Recognition', description: 'Innovation Award — Security automation', date: '2026-05-15' },
  { id: 'h4', event: 'Training Completed', description: 'Advanced Cybersecurity — Training Service', date: '2026-06-20' },
];
