import { Suspense, type ReactNode } from 'react';
import { SuspenseFallback } from '@/app/guards/RouteGuards';

/** Shared lazy-route wrapper used by modular route files. */
export function wrapRoute(element: ReactNode) {
  return <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>;
}
