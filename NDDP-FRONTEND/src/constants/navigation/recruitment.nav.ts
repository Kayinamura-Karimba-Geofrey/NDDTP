import type { NavItem } from '@/types';

export const recruitmentNav: NavItem = {
    id: 'recruitment',
    label: 'Recruitment',
    path: '/recruitment/dashboard',
    icon: 'FiUserPlus',
    module: 'recruitment',
    permissions: ['recruitment:read:applications', 'recruitment:read:postings'],
    children: [
      { id: 'recruitment-dashboard', label: 'Dashboard', path: '/recruitment/dashboard', icon: 'FiGrid', module: 'recruitment' },
      { id: 'recruitment-workforce', label: 'Workforce Requests', path: '/recruitment/workforce-requests', icon: 'FiInbox', module: 'recruitment' },
      { id: 'recruitment-requisitions', label: 'Requisitions', path: '/recruitment/requisitions', icon: 'FiFileText', module: 'recruitment' },
      { id: 'recruitment-vacancies', label: 'Vacancies', path: '/recruitment/vacancies', icon: 'FiBriefcase', module: 'recruitment' },
      { id: 'recruitment-applications', label: 'Applications', path: '/recruitment/applications', icon: 'FiUsers', module: 'recruitment' },
      { id: 'recruitment-screening', label: 'Screening', path: '/recruitment/screening', icon: 'FiFilter', module: 'recruitment' },
      { id: 'recruitment-interviews', label: 'Interviews', path: '/recruitment/interviews', icon: 'FiCalendar', module: 'recruitment' },
      { id: 'recruitment-offers', label: 'Offers', path: '/recruitment/offers', icon: 'FiMail', module: 'recruitment' },
      { id: 'recruitment-onboarding', label: 'Onboarding', path: '/recruitment/onboarding', icon: 'FiCheckCircle', module: 'recruitment' },
      { id: 'recruitment-talent', label: 'Talent Pool', path: '/recruitment/talent-pool', icon: 'FiStar', module: 'recruitment' },
      { id: 'recruitment-calendar', label: 'Calendar', path: '/recruitment/calendar', icon: 'FiClock', module: 'recruitment' },
      { id: 'recruitment-reports', label: 'Reports', path: '/recruitment/reports', icon: 'FiBarChart2', module: 'recruitment' },
      { id: 'recruitment-settings', label: 'Settings', path: '/recruitment/settings', icon: 'FiSliders', module: 'recruitment' },
    ],
  };
