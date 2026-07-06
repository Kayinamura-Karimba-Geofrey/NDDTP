import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_SERVICE_BASE } from '@/constants/services';
import { TOKEN_KEYS } from '@/constants/app';
import type { ApiError } from '@/types';
import { unwrapApiResponse } from '@/utils/api-response';
import { redirectToSessionExpired } from '@/utils/auth-storage';

const api = axios.create({
  baseURL: API_SERVICE_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem(TOKEN_KEYS.ACCESS) ?? localStorage.getItem(TOKEN_KEYS.ACCESS);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Correlation-Id'] = crypto.randomUUID();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && original && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            if (original.headers) original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshToken =
          sessionStorage.getItem(TOKEN_KEYS.REFRESH) ?? localStorage.getItem(TOKEN_KEYS.REFRESH);
        const { data } = await axios.post(`${API_SERVICE_BASE}/auth/auth/refresh`, { refreshToken });
        const tokens = unwrapApiResponse<{ accessToken: string; refreshToken: string }>(data);
        const storage = localStorage.getItem(TOKEN_KEYS.REFRESH) ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEYS.ACCESS, tokens.accessToken);
        storage.setItem(TOKEN_KEYS.REFRESH, tokens.refreshToken);
        processQueue(tokens.accessToken);
        if (original.headers) original.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return api(original);
      } catch {
        redirectToSessionExpired();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const msg = (data as { message: unknown }).message;
      if (typeof msg === 'string') return msg;
      if (Array.isArray(msg)) return msg.join(', ');
    }
    return error.message ?? 'An unexpected error occurred';
  }
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data: unknown }).data;
    if (typeof data === 'object' && data !== null && 'message' in data) {
      return String((data as { message: string }).message);
    }
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}
