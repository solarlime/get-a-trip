import { create, StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import type { PaymentActions, PaymentState } from './types/payment';
import type { TourActions, TourState } from './types/tour';
import type { SearchActions, SearchState } from './types/search';
import type { BookingActions, BookingState } from './types/booking';
import createPaymentSlice from './paymentSlice';
import createTourSlice from './tourSlice';
import createSearchSlice from './searchSlice';
import createBookingSlice from './bookingSlice';

export type States = PaymentState &
PaymentActions &
TourState &
TourActions &
SearchState &
SearchActions &
BookingState &
BookingActions;
export const storeCreator: StateCreator<States> = (...a) => ({
  ...createPaymentSlice(...a),
  ...createTourSlice(...a),
  ...createSearchSlice(...a),
  ...createBookingSlice(...a),
});

const useStore = create<States>()(
  devtools(
    persist(
      storeCreator,
      {
        name: 'getatripStore',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          questionsAndAnswers: state.questionsAndAnswers,
        }),
      },
    ),
  ),
);

export default useStore;
