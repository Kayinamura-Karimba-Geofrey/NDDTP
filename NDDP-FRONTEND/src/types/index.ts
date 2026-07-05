export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'HR_MANAGER'
  | 'FINANCE_OFFICER'
  | 'LOGISTICS_OFFICER'
  | 'MEDICAL_OFFICER'
  | 'EMPLOYEE'
  | 'VIEWER';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  permissions: string[];
  department?: string;
  rank?: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  module: string;
  permissions?: string[];
  roles?: UserRole[];
  children?: NavItem[];
  badge?: string | number;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'approval' | 'notification' | 'system' | 'user';
  module: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  module: string;
  priority: 'low' | 'normal' | 'high';
}

export type ThemeMode = 'light' | 'dark' | 'system';
