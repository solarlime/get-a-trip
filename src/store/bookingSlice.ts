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
  simCard: {
    option: { value: '', price: 0 },
    status: 'idle',
    options: [
      { value: 'Without SIM card', price: 0 },
      { value: 'Local SIM card', price: 10 },
      { value: 'International SIM card', price: 20 },
    ],
    isRecurring: false,
  },
  travelInsurance: {
    option: { value: '', price: 0 },
    status: 'idle',
    options: [
      { value: 'Without insurance', price: 0 },
      { value: 'Basic insurance', price: 5 },
      { value: 'Extended insurance', price: 10 },
    ],
    isRecurring: true,
  },
  total: 0,
};

const createBookingSlice: StateCreator<BookingState & BookingActions> = (set) => ({
  ...initialState,
  setFirstName: (newState) => set((state) => ({ ...state, firstName: newState })),
  setLastName: (newState) => set((state) => ({ ...state, lastName: newState })),
  setPhone: (newState) => set((state) => ({ ...state, phone: newState })),
  setRoom: (newState) => set((state) => ({ ...state, room: newState })),
  setSimCard: (newState) => set((state) => ({ ...state, simCard: newState })),
  setTravelInsurance: (newState) => set((state) => ({ ...state, travelInsurance: newState })),
  setTotal: (total) => set((state) => ({ ...state, total })),
});

export default createBookingSlice;
