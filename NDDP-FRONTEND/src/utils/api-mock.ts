import type { PaginatedResponse } from '@/types';
import { ENABLE_MOCK_API } from '@/constants/app';

/** Artificial latency for mock API responses. */
export function mockDelay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Slice in-memory items into a paginated envelope. */
export function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    data: items.slice((page - 1) * limit, page * limit),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

type BaseQueryResult<T> = { data?: T; error?: unknown };

/**
 * Mock-first query helper: returns mock data when mock mode is on,
 * otherwise runs the live query and falls back to mock on error.
 */
export async function withMockFallback<T>(
  mockData: T,
  query: () => Promise<BaseQueryResult<T>>,
  options?: { delayMs?: number; mockOnly?: boolean },
): Promise<{ data: T } | { error: unknown }> {
  const delayMs = options?.delayMs ?? 200;
  if (ENABLE_MOCK_API || options?.mockOnly) {
    await mockDelay(delayMs);
    return { data: mockData };
  }
  const result = await query();
  if (result.error) return { data: mockData };
  if (result.data === undefined) return { data: mockData };
  return { data: result.data };
}
