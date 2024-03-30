import { memo, useState } from 'react';

import useStore from '../../../store/store';

const Payment = memo(() => {
  const emailStatus = useStore((state) => state.email.status);
  const cardNumberStatus = useStore((state) => state.cardNumber.status);
  const cardDateStatus = useStore((state) => state.cardDate.status);
  const cardCvcStatus = useStore((state) => state.cardCvc.status);
  const cardholderNameStatus = useStore((state) => state.cardholderName.status);

  const statuses = [
    emailStatus, cardNumberStatus, cardDateStatus, cardCvcStatus, cardholderNameStatus,
  ];

  const [button, setButton] = useState('idle');

  return (
    <div className="field">
      <div className="control">
        <button
          className={`button is-dark is-fullwidth ${(button === 'loading') ? 'is-loading' : ''}`}
          type="button"
          disabled={!(statuses.every((status) => status === 'success')) || (button === 'loading')}
          onClick={() => setButton('loading')}
        >
          Pay
        </button>
      </div>
    </div>
  );
});

export default Payment;
