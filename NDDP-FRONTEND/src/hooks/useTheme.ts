import { useEffect } from 'react';
import { useAppSelector } from '@/store';

export function useTheme() {
  const { mode, resolved, sidebarCollapsed } = useAppSelector((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, [resolved]);

  return { mode, resolved, sidebarCollapsed, setTheme: () => {} };
}
