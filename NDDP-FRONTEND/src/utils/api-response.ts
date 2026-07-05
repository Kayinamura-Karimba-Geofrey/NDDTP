import type { PaginatedResponse } from '@/types';

interface WrappedApiResponse<T> {
  success: boolean;
  data: T;
  timestamp?: string;
  correlationId?: string;
}

interface MfaErrorBody {
  statusCode: number;
  message: string;
  error: 'MfaRequired';
  mfaToken: string;
}

export function isWrappedResponse<T>(body: unknown): body is WrappedApiResponse<T> {
  return (
    typeof body === 'object' &&
    body !== null &&
    'success' in body &&
    (body as WrappedApiResponse<T>).success === true &&
    'data' in body
  );
}

export function unwrapApiResponse<T>(body: unknown): T {
  if (isWrappedResponse<T>(body)) return body.data;
  return body as T;
}

export function unwrapPaginated<T>(body: unknown): PaginatedResponse<T> {
  const unwrapped = unwrapApiResponse<unknown>(body);
  if (
    unwrapped &&
    typeof unwrapped === 'object' &&
    unwrapped !== null &&
    'data' in unwrapped &&
    'meta' in unwrapped
  ) {
    return unwrapped as PaginatedResponse<T>;
  }
  if (Array.isArray(unwrapped)) {
    const arr = unwrapped as T[];
    return {
      data: arr,
      meta: {
        page: 1,
        limit: arr.length,
        total: arr.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
  return {
    data: [],
    meta: { page: 1, limit: 20, total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false },
  };
}

export function isMfaRequiredError(body: unknown): body is MfaErrorBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    (body as MfaErrorBody).error === 'MfaRequired' &&
    'mfaToken' in body
  );
}

export function getErrorMessage(body: unknown, fallback = 'Request failed'): string {
  if (typeof body === 'string') return body;
  if (typeof body === 'object' && body !== null) {
    if ('message' in body && typeof (body as { message: unknown }).message === 'string') {
      const msg = (body as { message: string }).message;
      if (Array.isArray(msg)) return msg.join(', ');
      return msg;
    }
    if ('data' in body) return getErrorMessage((body as { data: unknown }).data, fallback);
  }
  return fallback;
}
