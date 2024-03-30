import { StateCreator } from 'zustand';

import type { PaymentState, PaymentActions } from './types';

const initialState: PaymentState = {
  countries: ['Loading...'],
  email: { value: '', status: 'idle' },
  cardholderName: { value: '', status: 'idle' },
  cardNumber: {
    value: '', status: 'idle', provider: null, focused: false,
  },
  cardCvc: { value: '', status: 'idle' },
  cardDate: { value: '', status: 'idle' },
};

const createPaymentSlice: StateCreator<PaymentState & PaymentActions> = (set, get) => ({
  ...initialState,
  getCountries: async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const result = await response.json();
    const list = result.map((item: any) => item?.name?.common).sort();
    set({ countries: list });
  },
  setEmailState: (newState) => set((state) => ({ ...state, email: newState })),
  setCardholderNameState: (newState) => set(
    (state) => ({ ...state, cardholderName: newState }),
  ),
  setCardNumberState: (newState) => set((state) => ({ ...state, cardNumber: newState })),
  setCardCvcState: (newState) => set(
    (state) => ({ ...state, cardCvc: newState }),
  ),
  setCardDateState: (newState) => set(
    (state) => ({ ...state, cardDate: newState }),
  ),
  reset: () => set(() => ({ ...initialState, countries: get().countries })),
});

export default createPaymentSlice;
