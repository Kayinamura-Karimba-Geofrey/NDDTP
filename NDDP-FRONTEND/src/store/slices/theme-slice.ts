import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '@/types';

interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

/** Resolves stored theme preference; defaults to light for consistent contrast. */
const storedTheme = localStorage.getItem('nddtp_theme');
const initialMode: ThemeMode = storedTheme === 'dark' ? 'dark' : 'light';

const initialState: ThemeState = {
  mode: initialMode,
  resolved: initialMode,
  sidebarCollapsed: localStorage.getItem('nddtp_sidebar_collapsed') === 'true',
};

if (initialMode === 'dark') {
  document.documentElement.classList.add('dark');
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode | undefined>) => {
      const requested = action.payload ?? (state.resolved === 'dark' ? 'light' : 'dark');
      const next: 'light' | 'dark' = requested === 'dark' ? 'dark' : 'light';
      state.mode = next;
      state.resolved = next;
      localStorage.setItem('nddtp_theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('nddtp_sidebar_collapsed', String(state.sidebarCollapsed));
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem('nddtp_sidebar_collapsed', String(action.payload));
    },
  },
});

export const { setTheme, toggleSidebar, setSidebarCollapsed } = themeSlice.actions;
export default themeSlice.reducer;
