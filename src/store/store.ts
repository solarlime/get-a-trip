import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type {
  TourActions, TourState, PaymentActions, PaymentState,
} from './types';
import createPaymentSlice from './paymentSlice';
import createTourSlice from './tourSlice';

const useStore = create<PaymentState & PaymentActions & TourState & TourActions>()(
  devtools(
    (...a) => ({
      ...createPaymentSlice(...a),
      ...createTourSlice(...a),
    }),
  ),
);

export default useStore;
