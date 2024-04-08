import { StateCreator } from 'zustand';

import type { BookingState, BookingActions } from './types/booking';

const initialState: BookingState = {
  firstName: { value: '', status: 'idle' },
  lastName: { value: '', status: 'idle' },
  phone: { phoneNumber: '', phoneCode: '', phoneCountry: '' },
};

const createBookingSlice: StateCreator<BookingState & BookingActions> = (set) => ({
  ...initialState,
  setFirstName: (newState) => set((state) => ({ ...state, firstName: newState })),
  setLastName: (newState) => set((state) => ({ ...state, lastName: newState })),
  setPhone: (newState) => set((state) => ({ ...state, phone: newState })),
});

export default createBookingSlice;
