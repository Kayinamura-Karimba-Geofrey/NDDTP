import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isOpen: boolean;
  recentSearches: string[];
}

const initialState: SearchState = {
  query: '',
  isOpen: false,
  recentSearches: JSON.parse(localStorage.getItem('nddtp_recent_searches') ?? '[]') as string[],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const q = action.payload.trim();
      if (!q) return;
      state.recentSearches = [q, ...state.recentSearches.filter((s) => s !== q)].slice(0, 10);
      localStorage.setItem('nddtp_recent_searches', JSON.stringify(state.recentSearches));
    },
  },
});

export const { setQuery, toggleSearch, setSearchOpen, addRecentSearch } = searchSlice.actions;
export default searchSlice.reducer;
