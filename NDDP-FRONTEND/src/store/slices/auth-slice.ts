import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_KEYS } from '@/constants/app';
import type { AuthTokens, AuthUser } from '@/types';
import {
  clearAuthStorage,
  getStoredTokens,
  isJwtExpired,
  isMockAccessToken,
  sanitizeStoredAuth,
} from '@/utils/auth-storage';

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
}

sanitizeStoredAuth();

const loadUser = (): AuthUser | null => {
  const raw = localStorage.getItem(TOKEN_KEYS.USER) ?? sessionStorage.getItem(TOKEN_KEYS.USER);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
};

function loadSession(): Pick<AuthState, 'user' | 'tokens' | 'isAuthenticated'> {
  const tokens = getStoredTokens();
  if (!tokens) {
    return { user: null, tokens: null, isAuthenticated: false };
  }

  if (
    isMockAccessToken(tokens.accessToken) ||
    isMockAccessToken(tokens.refreshToken) ||
    isJwtExpired(tokens.accessToken)
  ) {
    if (isMockAccessToken(tokens.accessToken) || isMockAccessToken(tokens.refreshToken)) {
      clearAuthStorage();
      return { user: null, tokens: null, isAuthenticated: false };
    }
    // Expired access token — keep refresh token; base-api will refresh on next request.
    return { user: loadUser(), tokens, isAuthenticated: true };
  }

  return { user: loadUser(), tokens, isAuthenticated: true };
}

const session = loadSession();

const initialState: AuthState = {
  user: session.user,
  tokens: session.tokens,
  isAuthenticated: session.isAuthenticated,
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
      clearAuthStorage();
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
