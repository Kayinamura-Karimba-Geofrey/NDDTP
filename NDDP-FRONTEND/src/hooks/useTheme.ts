import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTheme } from '@/store/slices/theme-slice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const { mode, resolved, sidebarCollapsed } = useAppSelector((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }, [resolved]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') dispatch(setTheme('system'));
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, dispatch]);

  return { mode, resolved, sidebarCollapsed, setTheme: (m: typeof mode) => dispatch(setTheme(m)) };
}
