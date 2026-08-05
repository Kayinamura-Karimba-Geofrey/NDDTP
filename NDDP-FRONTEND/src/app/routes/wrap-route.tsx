import React, { Suspense, type ReactNode } from 'react';
import { SuspenseFallback } from '@/app/guards/RouteGuards';

class RouteErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Route dynamic import failed:', error);
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      // Auto reload on stale chunk/Vite dev server watch error
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-slate-900 text-slate-100 rounded-lg m-4 border border-slate-800">
          <h2 className="text-lg font-bold text-amber-400 mb-2">Module Load Error</h2>
          <p className="text-xs text-slate-400 mb-4">A temporary network or watcher interruption occurred while loading this page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded hover:bg-blue-500 transition"
          >
            RELOAD PAGE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Shared lazy-route wrapper used by modular route files. */
export function wrapRoute(element: ReactNode) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
    </RouteErrorBoundary>
  );
}

