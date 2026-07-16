import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  timezone: string;
  dateFormat: string;
  pageSize: number;
  compactMode: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  timezone: 'Africa/Kigali',
  dateFormat: 'DD MMM YYYY',
  pageSize: 25,
  compactMode: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
