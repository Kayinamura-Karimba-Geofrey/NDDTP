import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_USERS,
  MOCK_DEPARTMENTS,
  type PlatformUser,
  type Department,
} from '../constants/users-data';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
  };
}

function mapApiUser(raw: Record<string, unknown>): PlatformUser {
  const dept = raw.department as { name?: string } | string | undefined;
  return {
    id: raw.id as string,
    employeeNumber: (raw.employeeNumber as string) ?? '—',
    firstName: raw.firstName as string,
    middleName: raw.middleName as string | undefined,
    lastName: raw.lastName as string,
    email: raw.email as string,
    phone: raw.phone as string | undefined,
    profilePhotoUrl: raw.profilePhotoUrl as string | undefined,
    department: typeof dept === 'object' ? dept?.name ?? '—' : (dept as string) ?? '—',
    departmentId: raw.departmentId as string | undefined,
    position: (raw.jobTitle as string) ?? (raw.position as string) ?? '—',
    employmentStatus: (raw.employmentStatus as string) ?? 'Active',
    employmentType: (raw.employmentType as string) ?? 'Permanent',
    status: (raw.status as PlatformUser['status']) ?? 'ACTIVE',
    roles: (raw.roles as string[]) ?? [],
    lastLogin: raw.lastLoginAt as string | undefined,
    createdAt: (raw.createdAt as string) ?? new Date().toISOString(),
  };
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<PlatformUser>, { page?: number; limit?: number; search?: string; status?: string; departmentId?: string }>({
      queryFn: async (params, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 300));
          let items = [...MOCK_USERS];
          if (params.search) {
            const q = params.search.toLowerCase();
            items = items.filter((u) =>
              u.firstName.toLowerCase().includes(q) ||
              u.lastName.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.employeeNumber.toLowerCase().includes(q),
            );
          }
          if (params.status) items = items.filter((u) => u.status === params.status);
          return { data: paginate(items, params.page ?? 1, params.limit ?? 20) };
        }
        const qs = new URLSearchParams({ page: String(params.page ?? 1), limit: String(params.limit ?? 20) });
        if (params.search) qs.set('search', params.search);
        if (params.status) qs.set('status', params.status);
        if (params.departmentId) qs.set('departmentId', params.departmentId);
        const result = await baseQuery(serviceQuery('user', `/users?${qs}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return { data: { ...raw, data: raw.data.map(mapApiUser) } };
      },
      providesTags: ['Users'],
    }),

    getUserById: builder.query<PlatformUser, string>({
      queryFn: async (id, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          const user = MOCK_USERS.find((u) => u.id === id);
          if (!user) return { error: { status: 404, data: { message: 'User not found' } } };
          return { data: user };
        }
        const result = await baseQuery(serviceQuery('user', `/users/${id}`));
        if (result.error) return { error: result.error };
        return { data: mapApiUser(unwrapApiResponse<Record<string, unknown>>(result.data)) };
      },
      providesTags: (_r, _e, id) => [{ type: 'Users', id }],
    }),

    getDepartments: builder.query<Department[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_DEPARTMENTS };
        }
        const result = await baseQuery(serviceQuery('user', '/departments?limit=100'));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const list = Array.isArray(raw) ? raw : raw.data;
        return {
          data: list.map((d) => ({
            id: d.id as string,
            name: d.name as string,
            code: (d.code as string) ?? '—',
            manager: (d.managerName as string) ?? '—',
            userCount: (d.userCount as number) ?? 0,
            status: ((d.status as string) ?? 'ACTIVE') as Department['status'],
          })),
        };
      },
      providesTags: ['Departments'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useGetDepartmentsQuery } = usersApi;
