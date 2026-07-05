import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_KEYS } from '@/constants/app';
import type { AuthTokens, AuthUser } from '@/types';

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
}

const loadUser = (): AuthUser | null => {
  const raw = localStorage.getItem(TOKEN_KEYS.USER) ?? sessionStorage.getItem(TOKEN_KEYS.USER);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

const loadTokens = (): AuthTokens | null => {
  const access =
    localStorage.getItem(TOKEN_KEYS.ACCESS) ?? sessionStorage.getItem(TOKEN_KEYS.ACCESS);
  const refresh =
    localStorage.getItem(TOKEN_KEYS.REFRESH) ?? sessionStorage.getItem(TOKEN_KEYS.REFRESH);
  if (!access || !refresh) return null;
  return { accessToken: access, refreshToken: refresh, expiresIn: 3600 };
};

const initialState: AuthState = {
  user: loadUser(),
  tokens: loadTokens(),
  isAuthenticated: Boolean(loadTokens()),
  isLoading: false,
  mfaRequired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser; tokens: AuthTokens; remember?: boolean }>,
    ) => {
      const { user, tokens, remember = false } = action.payload;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEYS.ACCESS, tokens.accessToken);
      storage.setItem(TOKEN_KEYS.REFRESH, tokens.refreshToken);
      storage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
      state.user = user;
      state.tokens = tokens;
      state.isAuthenticated = true;
      state.mfaRequired = false;
    },
    setMfaRequired: (state, action: PayloadAction<boolean>) => {
      state.mfaRequired = action.payload;
    },
    logout: (state) => {
      sessionStorage.clear();
      localStorage.removeItem(TOKEN_KEYS.ACCESS);
      localStorage.removeItem(TOKEN_KEYS.REFRESH);
      localStorage.removeItem(TOKEN_KEYS.USER);
      localStorage.removeItem(TOKEN_KEYS.MFA);
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.mfaRequired = false;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        const storage = localStorage.getItem(TOKEN_KEYS.USER) ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEYS.USER, JSON.stringify(state.user));
      }
    },
  },
});

export const { setLoading, setCredentials, setMfaRequired, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectPermissions = (state: { auth: AuthState }) => state.auth.user?.permissions ?? [];
export const selectRoles = (state: { auth: AuthState }) => state.auth.user?.roles ?? [];
