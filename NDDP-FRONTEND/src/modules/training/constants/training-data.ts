export type TrainingStatus =
  | 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'ENROLLED'
  | 'IN_PROGRESS' | 'COMPLETED' | 'WITHDRAWN' | 'CANCELLED' | 'REQUESTED' | 'EXPIRED'
  | 'EXPIRING_SOON' | 'ISSUED' | 'REVOKED' | 'PRESENT' | 'ABSENT' | 'EXCUSED' | 'LATE'
  | 'PASS' | 'FAIL' | 'NOT_STARTED';

export interface TrainingCourse {
  id: string;
  code: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  deliveryMode: string;
  capacity: number;
  enrolled?: number;
  status: TrainingStatus;
  description?: string;
  passingScore?: number;
}

export interface TrainingProgram {
  id: string;
  name: string;
  objectives: string;
  duration: string;
  requiredCourses: number;
  electives: number;
  competencies: string;
  certification: string;
  status: TrainingStatus;
  participants?: number;
}

export interface LearningPath {
  id: string;
  name: string;
  role: string;
  courses: number;
  duration: string;
  enrolled: number;
  status: TrainingStatus;
}

export interface Enrollment {
  id: string;
  personnelName: string;
  course: string;
  enrollmentDate: string;
  progress: number;
  status: TrainingStatus;
  completionDate?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  instructor: string;
  personnelName: string;
  status: TrainingStatus;
  notes?: string;
}

export interface Instructor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  courses: number;
  certifications: string;
  rating: number;
  availability: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  building: string;
  equipment: string;
  availability: string;
  isVirtual: boolean;
  meetingLink?: string;
}

export interface LearningMaterial {
  id: string;
  name: string;
  type: string;
  course: string;
  uploadedAt: string;
}

export interface TrainingAssessment {
  id: string;
  title: string;
  course: string;
  type: string;
  passingScore: number;
  attempts: number;
  duration: string;
  status: TrainingStatus;
}

export interface Examination {
  id: string;
  name: string;
  course: string;
  date: string;
  duration: string;
  passingScore: number;
  location: string;
  invigilator: string;
  status: TrainingStatus;
}

export interface Certification {
  id: string;
  certificateNumber: string;
  course: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
  status: TrainingStatus;
}

export interface Competency {
  id: string;
  name: string;
  category: string;
  level: string;
  personnelCount: number;
  targetLevel: string;
}

export interface TrainingRequest {
  id: string;
  personnelName: string;
  requestedCourse: string;
  reason: string;
  priority: string;
  supervisor: string;
  status: TrainingStatus;
  submittedAt: string;
}

export interface TrainingApproval {
  id: string;
  employeeName: string;
  course: string;
  requestDate: string;
  status: TrainingStatus;
  priority: string;
}

export interface TrainingHistoryEntry {
  id: string;
  personnelName: string;
  event: string;
  description: string;
  date: string;
}

export interface MyLearningCourse {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  remainingLessons: number;
  assessmentStatus: string;
  completionDate?: string;
}

export const TRAINING_DASHBOARD_KPIS = {
  activePrograms: 8,
  availableCourses: 64,
  personnelEnrolled: 1240,
  coursesInProgress: 186,
  coursesCompleted: 892,
  certificationsIssued: 456,
  certificationsExpiring: 23,
  upcomingSessions: 12,
  pendingRequests: 18,
  completionRate: 78,
};

export const PARTICIPATION_BY_DEPARTMENT = [
  { name: 'IT', value: 92 }, { name: 'HR', value: 85 }, { name: 'Logistics', value: 78 },
  { name: 'Medical', value: 88 }, { name: 'Finance', value: 65 }, { name: 'Training', value: 95 },
];

export const COURSE_COMPLETION_BREAKDOWN = [
  { name: 'Completed', value: 892 },
  { name: 'In Progress', value: 186 },
  { name: 'Not Started', value: 162 },
];

export const CERTIFICATION_STATUS_BREAKDOWN = [
  { name: 'Active', value: 420 },
  { name: 'Expired', value: 36 },
  { name: 'Expiring Soon', value: 23 },
];

export const MONTHLY_TRAINING_HOURS = [
  { month: 'Jan', hours: 420 }, { month: 'Feb', hours: 480 }, { month: 'Mar', hours: 520 },
  { month: 'Apr', hours: 390 }, { month: 'May', hours: 560 }, { month: 'Jun', hours: 510 },
  { month: 'Jul', hours: 340 },
];

export const COMPETENCY_RADAR = [
  { skill: 'Leadership', value: 72 },
  { skill: 'Communication', value: 85 },
  { skill: 'Technical', value: 78 },
  { skill: 'Compliance', value: 90 },
  { skill: 'Project Mgmt', value: 68 },
  { skill: 'Cybersecurity', value: 62 },
];

export const TRAINING_CATEGORIES = [
  { name: 'Technical', value: 28 },
  { name: 'Leadership', value: 18 },
  { name: 'Compliance', value: 12 },
  { name: 'Health & Safety', value: 10 },
  { name: 'Professional Dev', value: 22 },
];

export const MOCK_COURSES: TrainingCourse[] = [
  { id: 'c1', code: 'TRN-CS-101', title: 'Cyber Security Fundamentals', category: 'Technical', instructor: 'Eric Habyarimana', duration: '5 days', deliveryMode: 'Classroom', capacity: 30, enrolled: 24, status: 'ACTIVE', passingScore: 70 },
  { id: 'c2', code: 'TRN-LD-201', title: 'Leadership Development', category: 'Leadership', instructor: 'Jean Mukamana', duration: '10 days', deliveryMode: 'Hybrid', capacity: 25, enrolled: 22, status: 'ACTIVE', passingScore: 75 },
  { id: 'c3', code: 'TRN-CM-301', title: 'Compliance & Ethics', category: 'Compliance', instructor: 'Patrick Habimana', duration: '3 days', deliveryMode: 'Online', capacity: 100, enrolled: 89, status: 'ACTIVE', passingScore: 80 },
  { id: 'c4', code: 'TRN-PM-102', title: 'Project Management Professional', category: 'Professional Development', instructor: 'Claire Mutesi', duration: '14 days', deliveryMode: 'Classroom', capacity: 20, enrolled: 18, status: 'ACTIVE', passingScore: 70 },
  { id: 'c5', code: 'TRN-HS-101', title: 'Occupational Health & Safety', category: 'Health & Safety', instructor: 'Dr. Marie Uwimana', duration: '2 days', deliveryMode: 'Workshop', capacity: 40, enrolled: 35, status: 'ACTIVE', passingScore: 85 },
];

export const MOCK_PROGRAMS: TrainingProgram[] = [
  { id: 'p1', name: 'Leadership Development Program', objectives: 'Develop next-generation leaders', duration: '6 months', requiredCourses: 4, electives: 2, competencies: 'Leadership, Communication', certification: 'Leadership Certificate', status: 'ACTIVE', participants: 45 },
  { id: 'p2', name: 'Cyber Security Academy', objectives: 'Build cyber defense capabilities', duration: '4 months', requiredCourses: 5, electives: 1, competencies: 'Cybersecurity, Risk Management', certification: 'Cyber Security Certificate', status: 'ACTIVE', participants: 32 },
  { id: 'p3', name: 'Officer Professional Development', objectives: 'Career progression for officers', duration: '12 months', requiredCourses: 8, electives: 3, competencies: 'Leadership, Strategy', certification: 'Officer Development Certificate', status: 'ACTIVE', participants: 28 },
];

export const MOCK_LEARNING_PATHS: LearningPath[] = [
  { id: 'lp1', name: 'Software Developer Path', role: 'Software Developer', courses: 6, duration: '8 months', enrolled: 24, status: 'ACTIVE' },
  { id: 'lp2', name: 'Logistics Officer Path', role: 'Logistics Officer', courses: 5, duration: '6 months', enrolled: 18, status: 'ACTIVE' },
  { id: 'lp3', name: 'HR Specialist Path', role: 'HR Specialist', courses: 4, duration: '5 months', enrolled: 12, status: 'ACTIVE' },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  { id: 'e1', personnelName: 'Patrick Habimana', course: 'Leadership Development', enrollmentDate: '2026-06-01', progress: 65, status: 'IN_PROGRESS' },
  { id: 'e2', personnelName: 'Alice Uwase', course: 'Cyber Security Fundamentals', enrollmentDate: '2026-07-01', progress: 30, status: 'ENROLLED' },
  { id: 'e3', personnelName: 'Emmanuel Niyonsenga', course: 'Project Management Professional', enrollmentDate: '2026-05-15', progress: 100, status: 'COMPLETED', completionDate: '2026-06-28' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'at1', date: '2026-07-07', course: 'Cyber Security Fundamentals', instructor: 'Eric Habyarimana', personnelName: 'Alice Uwase', status: 'PRESENT' },
  { id: 'at2', date: '2026-07-07', course: 'Leadership Development', instructor: 'Jean Mukamana', personnelName: 'Patrick Habimana', status: 'PRESENT' },
  { id: 'at3', date: '2026-07-06', course: 'Compliance & Ethics', instructor: 'Patrick Habimana', personnelName: 'Claire Mutesi', status: 'LATE', notes: 'Arrived 15 min late' },
];

export const MOCK_INSTRUCTORS: Instructor[] = [
  { id: 'i1', name: 'Eric Habyarimana', department: 'IT', specialization: 'Cybersecurity', courses: 4, certifications: 'CISSP, CEH', rating: 4.8, availability: 'Mon–Thu' },
  { id: 'i2', name: 'Jean Mukamana', department: 'HR', specialization: 'Leadership', courses: 3, certifications: 'PMP, SHRM', rating: 4.6, availability: 'Tue–Fri' },
  { id: 'i3', name: 'Dr. Marie Uwimana', department: 'Medical', specialization: 'Health & Safety', courses: 2, certifications: 'OSH Certificate', rating: 4.9, availability: 'Wed–Fri' },
];

export const MOCK_CLASSROOMS: Classroom[] = [
  { id: 'rm1', name: 'Training Room A', capacity: 30, building: 'Kigali HQ', equipment: 'Projector, Whiteboard', availability: 'Available', isVirtual: false },
  { id: 'rm2', name: 'Computer Lab B', capacity: 25, building: 'Kanombe Campus', equipment: '30 PCs, Network', availability: 'Available', isVirtual: false },
  { id: 'rm3', name: 'Virtual Classroom', capacity: 100, building: 'Online', equipment: 'Teams, Zoom', availability: 'Always', isVirtual: true, meetingLink: 'https://teams.microsoft.com/...' },
];

export const MOCK_MATERIALS: LearningMaterial[] = [
  { id: 'm1', name: 'Cyber Security Module 1 — Slides', type: 'PDF', course: 'Cyber Security Fundamentals', uploadedAt: '2026-06-01T00:00:00Z' },
  { id: 'm2', name: 'Leadership Video Series', type: 'Video', course: 'Leadership Development', uploadedAt: '2026-05-15T00:00:00Z' },
  { id: 'm3', name: 'PMBOK Reference Guide', type: 'Document', course: 'Project Management Professional', uploadedAt: '2026-04-01T00:00:00Z' },
];

export const MOCK_ASSESSMENTS: TrainingAssessment[] = [
  { id: 'as1', title: 'Cyber Security Quiz — Module 1', course: 'Cyber Security Fundamentals', type: 'Quiz', passingScore: 70, attempts: 3, duration: '45 min', status: 'ACTIVE' },
  { id: 'as2', title: 'Leadership Case Study', course: 'Leadership Development', type: 'Assignment', passingScore: 75, attempts: 2, duration: '2 weeks', status: 'ACTIVE' },
  { id: 'as3', title: 'PM Practical Exercise', course: 'Project Management Professional', type: 'Practical Exercise', passingScore: 70, attempts: 1, duration: '4 hours', status: 'ACTIVE' },
];

export const MOCK_EXAMINATIONS: Examination[] = [
  { id: 'ex1', name: 'Cyber Security Final Exam', course: 'Cyber Security Fundamentals', date: '2026-07-20', duration: '2 hours', passingScore: 70, location: 'Computer Lab B', invigilator: 'Eric Habyarimana', status: 'SCHEDULED' as TrainingStatus },
  { id: 'ex2', name: 'PMP Certification Exam', course: 'Project Management Professional', date: '2026-06-28', duration: '4 hours', passingScore: 70, location: 'Training Room A', invigilator: 'Claire Mutesi', status: 'COMPLETED' },
];

export const MOCK_CERTIFICATIONS: Certification[] = [
  { id: 'cert1', certificateNumber: 'CERT-2026-0089', course: 'Project Management Professional', recipient: 'Emmanuel Niyonsenga', issueDate: '2026-06-28', expiryDate: '2029-06-28', status: 'ISSUED' },
  { id: 'cert2', certificateNumber: 'CERT-2026-0075', course: 'Compliance & Ethics', recipient: 'Patrick Habimana', issueDate: '2026-05-10', expiryDate: '2027-05-10', status: 'ISSUED' },
  { id: 'cert3', certificateNumber: 'CERT-2025-0042', course: 'Leadership Development', recipient: 'Alice Uwase', issueDate: '2025-12-15', expiryDate: '2026-07-15', status: 'EXPIRING_SOON' },
];

export const MOCK_COMPETENCIES: Competency[] = [
  { id: 'comp1', name: 'Leadership', category: 'Soft Skills', level: 'Intermediate', personnelCount: 320, targetLevel: 'Advanced' },
  { id: 'comp2', name: 'Cybersecurity', category: 'Technical', level: 'Beginner', personnelCount: 180, targetLevel: 'Intermediate' },
  { id: 'comp3', name: 'Project Management', category: 'Professional', level: 'Advanced', personnelCount: 95, targetLevel: 'Expert' },
  { id: 'comp4', name: 'Communication', category: 'Soft Skills', level: 'Intermediate', personnelCount: 450, targetLevel: 'Advanced' },
];

export const MOCK_TRAINING_REQUESTS: TrainingRequest[] = [
  { id: 'tr1', personnelName: 'Grace Ingabire', requestedCourse: 'Cyber Security Fundamentals', reason: 'Role requires security clearance', priority: 'High', supervisor: 'Jean Mukamana', status: 'PENDING', submittedAt: '2026-07-06T10:00:00Z' },
  { id: 'tr2', personnelName: 'Fabrice Nkurunziza', requestedCourse: 'Leadership Development', reason: 'Promotion preparation', priority: 'Medium', supervisor: 'Patrick Habimana', status: 'APPROVED', submittedAt: '2026-07-04T14:00:00Z' },
];

export const MOCK_APPROVALS: TrainingApproval[] = [
  { id: 'ap1', employeeName: 'Grace Ingabire', course: 'Cyber Security Fundamentals', requestDate: '2026-07-06T10:00:00Z', status: 'PENDING', priority: 'High' },
  { id: 'ap2', employeeName: 'Fabrice Nkurunziza', course: 'Leadership Development', requestDate: '2026-07-04T14:00:00Z', status: 'APPROVED', priority: 'Medium' },
];

export const MOCK_TRAINING_HISTORY: TrainingHistoryEntry[] = [
  { id: 'h1', personnelName: 'Emmanuel Niyonsenga', event: 'Enrollment', description: 'Enrolled in Project Management Professional', date: '2026-05-15T00:00:00Z' },
  { id: 'h2', personnelName: 'Emmanuel Niyonsenga', event: 'Examination', description: 'PMP Certification Exam — Pass (82%)', date: '2026-06-28T00:00:00Z' },
  { id: 'h3', personnelName: 'Emmanuel Niyonsenga', event: 'Certification', description: 'CERT-2026-0089 issued', date: '2026-06-28T00:00:00Z' },
  { id: 'h4', personnelName: 'Patrick Habimana', event: 'Attendance', description: 'Leadership Development — Session 4', date: '2026-07-07T00:00:00Z' },
];

export const MY_LEARNING_SUMMARY = {
  completedCourses: 12,
  inProgress: 2,
  upcoming: 1,
  trainingHours: 86,
  certifications: 5,
  pathProgress: 65,
};

export const MY_LEARNING_COURSES: MyLearningCourse[] = [
  { id: 'ml1', name: 'Leadership Development', instructor: 'Jean Mukamana', progress: 65, remainingLessons: 4, assessmentStatus: 'Pending' },
  { id: 'ml2', name: 'Compliance & Ethics', instructor: 'Patrick Habimana', progress: 100, remainingLessons: 0, assessmentStatus: 'Passed', completionDate: '2026-05-10' },
];
