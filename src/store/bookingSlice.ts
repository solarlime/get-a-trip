import { StateCreator } from 'zustand';

import type { BookingState, BookingActions } from './types/booking';

const initialState: BookingState = {
  firstName: { value: '', status: 'idle' },
  lastName: { value: '', status: 'idle' },
  phone: {
    phoneNumber: '', phoneCode: '', phoneCountry: '', status: 'idle',
  },
  room: {
    option: { value: '', price: 0 },
    status: 'idle',
    options: [
      { value: 'Shared room', price: 0 },
      { value: 'Private room', price: 20 },
    ],
    isRecurring: true,
  },
  sim: {
    option: { value: '', price: 0 },
    status: 'idle',
    options: [
      { value: 'Without SIM card', price: 0 },
      { value: 'Local SIM card', price: 10 },
      { value: 'International SIM card', price: 20 },
    ],
    isRecurring: false,
  },
  insurance: {
    option: { value: '', price: 0 },
    status: 'idle',
    options: [
      { value: 'Without insurance', price: 0 },
      { value: 'Basic insurance', price: 5 },
      { value: 'Extended insurance', price: 10 },
    ],
    isRecurring: true,
  },
};

const createBookingSlice: StateCreator<BookingState & BookingActions> = (set) => ({
  ...initialState,
  setFirstName: (newState) => set((state) => ({ ...state, firstName: newState })),
  setLastName: (newState) => set((state) => ({ ...state, lastName: newState })),
  setPhone: (newState) => set((state) => ({ ...state, phone: newState })),
  setRoom: (newState) => set((state) => ({ ...state, room: newState })),
  setSim: (newState) => set((state) => ({ ...state, sim: newState })),
  setInsurance: (newState) => set((state) => ({ ...state, insurance: newState })),
});

export default createBookingSlice;
