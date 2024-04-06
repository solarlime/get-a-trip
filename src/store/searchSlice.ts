import { StateCreator } from 'zustand';

import type { SearchState, SearchActions } from './types/search';

const initialState: SearchState = {
  destination: { value: '', status: 'idle' },
  checkInDate: { value: '', status: 'idle' },
  duration: { value: '', status: 'idle' },
  companions: { value: '', status: 'idle' },
};

const createSearchSlice: StateCreator<SearchState & SearchActions> = (set) => ({
  ...initialState,
  setDestination: (newState) => set((state) => ({ ...state, destination: newState })),
  setCheckInDate: (newState) => set((state) => ({ ...state, checkInDate: newState })),
  setDuration: (newState) => {
    if (+newState.value > 0) {
      set((state) => ({ ...state, duration: newState }));
    }
  },
  setCompanions: (newState) => {
    if (+newState.value > 0) {
      set((state) => ({ ...state, companions: newState }));
    }
  },
});

export default createSearchSlice;
