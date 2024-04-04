import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { PaymentActions, PaymentState } from './types/payment';
import type { TourActions, TourState } from './types/tour';
import type { SearchActions, SearchState } from './types/search';
import createPaymentSlice from './paymentSlice';
import createTourSlice from './tourSlice';
import createSearchSlice from './searchSlice';

const useStore = create<
PaymentState &
PaymentActions &
TourState &
TourActions &
SearchState &
SearchActions
>()(
  devtools(
    (...a) => ({
      ...createPaymentSlice(...a),
      ...createTourSlice(...a),
      ...createSearchSlice(...a),
    }),
  ),
);

export default useStore;
