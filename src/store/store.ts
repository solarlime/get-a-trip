import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { PaymentActions, PaymentState } from './types';
import createPaymentSlice from './paymentSlice';

const useStore = create<PaymentState & PaymentActions>()(
  devtools(
    (...a) => ({
      ...createPaymentSlice(...a),
    }),
  ),
);

export default useStore;
