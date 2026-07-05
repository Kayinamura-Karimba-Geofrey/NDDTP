import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_GATEWAY_URL, TOKEN_KEYS } from '@/constants/app';
import type { ApiError } from '@/types';

const api = axios.create({
  baseURL: API_GATEWAY_URL,
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
        const { data } = await axios.post(`${API_GATEWAY_URL}/auth/refresh`, { refreshToken });
        const newToken = data.accessToken as string;
        const storage = localStorage.getItem(TOKEN_KEYS.REFRESH) ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEYS.ACCESS, newToken);
        processQueue(newToken);
        if (original.headers) original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        sessionStorage.clear();
        localStorage.removeItem(TOKEN_KEYS.ACCESS);
        localStorage.removeItem(TOKEN_KEYS.REFRESH);
        localStorage.removeItem(TOKEN_KEYS.USER);
        window.location.href = '/auth/session-expired';
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
    return error.response?.data?.message ?? error.message ?? 'An unexpected error occurred';
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}
