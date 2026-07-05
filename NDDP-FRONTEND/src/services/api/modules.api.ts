import { baseApi, serviceQuery } from '@/services/api/base-api';
import type { ServiceKey } from '@/constants/services';
import type { PaginatedResponse } from '@/types';
import { unwrapApiResponse, unwrapPaginated } from '@/utils/api-response';

export interface ListResourcesArgs {
  service: ServiceKey;
  path: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listResources: builder.query<PaginatedResponse<Record<string, unknown>>, ListResourcesArgs>({
      query: ({ service, path, page = 1, limit = 20, search }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (search) params.set('search', search);
        const separator = path.includes('?') ? '&' : '?';
        return serviceQuery(service, `${path}${separator}${params.toString()}`);
      },
      transformResponse: (response) => unwrapPaginated<Record<string, unknown>>(response),
      providesTags: (_result, _error, arg) => [{ type: 'Module', id: `${arg.service}:${arg.path}` }],
    }),
    getResource: builder.query<
      Record<string, unknown>,
      { service: ServiceKey; path: string }
    >({
      query: ({ service, path }) => serviceQuery(service, path),
      transformResponse: (response) => unwrapApiResponse<Record<string, unknown>>(response),
    }),
  }),
});

export const { useListResourcesQuery, useGetResourceQuery } = modulesApi;
