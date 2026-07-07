import { baseApi } from '@/services/api/base-api';

export interface GatewayHealth {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  routes: number;
}

export interface ServiceHealthCheck {
  key: string;
  label: string;
  port: number;
  status: 'up' | 'down';
  statusCode?: number;
}

export interface ServicesHealthResponse {
  status: 'ok' | 'degraded' | 'down';
  summary: { total: number; up: number; down: number };
  services: ServiceHealthCheck[];
  timestamp: string;
}

export interface GatewayServiceRoute {
  key: string;
  label: string;
  port: number;
  path: string;
}

export interface GatewayInfoResponse {
  gateway: string;
  prefix: string;
  upstreamPattern: string;
  services: GatewayServiceRoute[];
}

async function gatewayFetch<T>(path: string): Promise<T> {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Gateway request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const cloudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGatewayHealth: builder.query<GatewayHealth, void>({
      queryFn: async () => {
        try {
          const data = await gatewayFetch<GatewayHealth>('/health');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
      providesTags: ['Cloud'],
    }),
    getServicesHealth: builder.query<ServicesHealthResponse, void>({
      queryFn: async () => {
        try {
          const data = await gatewayFetch<ServicesHealthResponse>('/health/services');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
      providesTags: ['Cloud'],
    }),
    getGatewayInfo: builder.query<GatewayInfoResponse, void>({
      queryFn: async () => {
        try {
          const data = await gatewayFetch<GatewayInfoResponse>('/api/svc');
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
      providesTags: ['Cloud'],
    }),
  }),
});

export const {
  useGetGatewayHealthQuery,
  useGetServicesHealthQuery,
  useGetGatewayInfoQuery,
} = cloudApi;
