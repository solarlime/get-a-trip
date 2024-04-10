import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import type { PaymentActions, PaymentState } from './types/payment';
import type { TourActions, TourState } from './types/tour';
import type { SearchActions, SearchState } from './types/search';
import type { BookingActions, BookingState } from './types/booking';
import createPaymentSlice from './paymentSlice';
import createTourSlice from './tourSlice';
import createSearchSlice from './searchSlice';
import createBookingSlice from './bookingSlice';

const useStore = create<
PaymentState &
PaymentActions &
TourState &
TourActions &
SearchState &
SearchActions &
BookingState &
BookingActions
>()(
  devtools(
    persist(
      (...a) => ({
        ...createPaymentSlice(...a),
        ...createTourSlice(...a),
        ...createSearchSlice(...a),
        ...createBookingSlice(...a),
      }),
      {
        name: 'getatripStore',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          chosenTour: state.chosenTour,
          questionsAndAnswers: state.questionsAndAnswers,
        }),
      },
    ),
  ),
);

export default useStore;
