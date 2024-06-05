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
    const result = await Promise.any([
      fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd').then((response) => {
        console.info('Successfully loaded countries');
        return response.json();
      }),
      new Promise((resolve) => {
        setTimeout(() => import('./fallback_countries.json').then((module) => {
          console.info('Fallback countries loaded');
          resolve(module.default);
        }), 5000);
      }),
    ]);
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
  setEmail: (newState) => set((state) => ({ ...state, email: newState })),
  setCardholderName: (newState) => set(
    (state) => ({ ...state, cardholderName: newState }),
  ),
  setCardNumber: (newState) => set((state) => ({ ...state, cardNumber: newState })),
  setCardCvc: (newState) => set(
    (state) => ({ ...state, cardCvc: newState }),
  ),
  setCardDate: (newState) => set(
    (state) => ({ ...state, cardDate: newState }),
  ),
  reset: () => set(() => ({ ...initialState, countries: get().countries })),
});

export default createPaymentSlice;
