import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types';

interface ProfileState {
  profile: AuthUser | null;
  isEditing: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isEditing: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<AuthUser>) => {
      state.profile = action.payload;
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setProfile, setEditing } = profileSlice.actions;
export default profileSlice.reducer;
