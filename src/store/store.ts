import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
    (...a) => ({
      ...createPaymentSlice(...a),
      ...createTourSlice(...a),
      ...createSearchSlice(...a),
      ...createBookingSlice(...a),
    }),
  ),
);

export default useStore;
