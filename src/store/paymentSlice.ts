import { StateCreator } from 'zustand';

import type { PaymentState, PaymentActions, Country } from './types/payment';

const initialState: PaymentState = {
  countries: [{ name: 'Loading...', code: '...', phoneCode: '...' }],
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
    const countriesAndCodesAndPhonesList = result
      .filter((item: any) => item.idd.root)
      .map((item: any) => ({
        name: item.name.common,
        code: item.cca3,
        phoneCode: `${item.idd.root}${(item.idd.suffixes.length > 1) ? '' : item.idd.suffixes[0]}`,
      })).sort(
        (a: Country, b: Country) => a.name.localeCompare(b.name),
      );
    set((state) => (
      { ...state, countries: countriesAndCodesAndPhonesList }
    ));
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
