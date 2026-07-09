import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_ROLES,
  MOCK_PERMISSIONS,
  MOCK_ASSIGNMENTS,
  type AuthRole,
  type AuthPermission,
  type RoleAssignment,
} from '../constants/authorization-data';



export const authorizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<PaginatedResponse<AuthRole>, { page?: number; limit?: number; search?: string; status?: string }>({
      queryFn: async ({ page = 1, limit = 20, search, status }, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(300);
          let items = [...MOCK_ROLES];
          if (search) items = items.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase()));
          if (status) items = items.filter((r) => r.status === status);
          return { data: paginate(items, page, limit) };
        }
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (search) params.set('search', search);
        if (status) params.set('status', status);
        const result = await baseQuery(serviceQuery('authorization', `/roles?${params}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return {
          data: {
            ...raw,
            data: raw.data.map((r) => ({
              ...r,
              userCount: (r.userCount as number) ?? 0,
              createdBy: (r.createdBy as string) ?? 'System',
              updatedAt: (r.updatedAt as string) ?? (r.createdAt as string),
            })) as AuthRole[],
          },
        };
      },
      providesTags: ['Roles'],
    }),

    getPermissions: builder.query<PaginatedResponse<AuthPermission>, { page?: number; limit?: number; module?: string; search?: string }>({
      queryFn: async ({ page = 1, limit = 20, module, search }, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(300);
          let items = [...MOCK_PERMISSIONS];
          if (module) items = items.filter((p) => p.module === module);
          if (search) items = items.filter((p) => p.code.includes(search) || p.name.includes(search));
          return { data: paginate(items, page, limit) };
        }
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (module) params.set('module', module);
        if (search) params.set('search', search);
        const result = await baseQuery(serviceQuery('authorization', `/permissions?${params}`));
        if (result.error) return { error: result.error };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>>>(result.data);
        return {
          data: {
            ...raw,
            data: raw.data.map((p) => ({
              ...p,
              permissionType: ((p.action as string)?.toUpperCase() ?? 'READ') as AuthPermission['permissionType'],
            })) as AuthPermission[],
          },
        };
      },
      providesTags: ['Permissions'],
    }),

    getAssignments: builder.query<RoleAssignment[], { userId?: string }>({
      queryFn: async ({ userId }, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(300);
          const items = userId ? MOCK_ASSIGNMENTS.filter((a) => a.userId === userId) : MOCK_ASSIGNMENTS;
          return { data: items };
        }
        if (userId) {
          const result = await baseQuery(serviceQuery('authorization', `/assignments/user/${userId}`));
          if (result.error) return { error: result.error };
          const raw = unwrapApiResponse<Record<string, unknown>[]>(result.data);
          return {
            data: raw.map((a) => ({
              id: a.id as string,
              userId: a.userId as string,
              employeeName: (a.employeeName as string) ?? '—',
              department: (a.department as string) ?? '—',
              roleCode: a.roleCode as string,
              roleName: a.roleName as string,
              status: a.status as string,
              assignedBy: (a.assignedBy as string) ?? 'System',
              assignedAt: a.assignedAt as string,
              expiresAt: (a.expiresAt as string) ?? null,
            })),
          };
        }
        return { data: MOCK_ASSIGNMENTS };
      },
      providesTags: ['Assignments'],
    }),
  }),
});

export const { useGetRolesQuery, useGetPermissionsQuery, useGetAssignmentsQuery } = authorizationApi;
