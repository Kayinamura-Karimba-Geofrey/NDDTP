import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_GATEWAY_URL, TOKEN_KEYS } from '@/constants/app';

const baseQuery = fetchBaseQuery({
  baseUrl: API_GATEWAY_URL,
  prepareHeaders: (headers) => {
    const token =
      sessionStorage.getItem(TOKEN_KEYS.ACCESS) ?? localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('X-Correlation-Id', crypto.randomUUID());
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    window.location.href = '/auth/session-expired';
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'Dashboard',
    'User',
    'Personnel',
    'Notification',
    'Profile',
    'Search',
  ],
  endpoints: () => ({}),
});
