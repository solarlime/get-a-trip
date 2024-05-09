import { memo } from 'react';

import styles from '../../Checkout.module.scss';
import CardNumber from './CardNumber';
import CardDate from './CardDate';
import CardCvc from './CardCvc';
import useStore from '../../../../store/store';

const Card = memo(() => {
  const cardNumberStatus = useStore((state) => state.cardNumber.status);
  const cardDateStatus = useStore((state) => state.cardDate.status);
  const cardCvcStatus = useStore((state) => state.cardCvc.status);

  return (
    <div className={`field has-addons-centered ${styles.cardInfo}`}>
      <label className="label" htmlFor="card">Card information</label>
      <CardNumber />
      <div className="field has-addons">
        <CardDate />
        <CardCvc />
      </div>
      <p className={`help is-danger ${(cardNumberStatus !== 'fail') ? styles.hidden : ''}`}>
        Your card number is invalid.
      </p>
      <p className={`help is-danger ${(cardDateStatus !== 'fail') ? styles.hidden : ''}`}>
        Your card&apos;s expiration date is invalid.
      </p>
      <p className={`help is-danger ${(cardCvcStatus !== 'fail') ? styles.hidden : ''}`}>
        Your card&apos;s security code is incomplete.
      </p>
    </div>
  );
});

export default Card;
