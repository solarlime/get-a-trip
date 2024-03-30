import { memo } from 'react';

import Country from './Country';
import Email from './Email';
import Card from './Card/Card';
import CardholderName from './CardholderName';
import PayButton from './PayButton';

const Payment = memo(() => (
  <section className="column">
    <h2 className="subtitle is-4 has-text-weight-normal">Pay with card</h2>
    <div className="payment-form block">
      <Email />
      <Card />
      <CardholderName />
      <Country />
    </div>
    <PayButton />
  </section>
));

export default Payment;
