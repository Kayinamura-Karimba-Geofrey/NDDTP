import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '@/types';

interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const storedMode = (localStorage.getItem('nddtp_theme') as ThemeMode) ?? 'system';
const resolved = storedMode === 'system' ? getSystemTheme() : storedMode;

const initialState: ThemeState = {
  mode: storedMode,
  resolved,
  sidebarCollapsed: localStorage.getItem('nddtp_sidebar_collapsed') === 'true',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.resolved = action.payload === 'system' ? getSystemTheme() : action.payload;
      localStorage.setItem('nddtp_theme', action.payload);
      document.documentElement.classList.toggle('dark', state.resolved === 'dark');
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
