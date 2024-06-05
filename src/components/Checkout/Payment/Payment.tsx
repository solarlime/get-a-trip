import { memo } from 'react';

import Country from './Country';
import Email from '../../common/Email';
import Card from './Card/Card';
import Name from '../../common/Name';
import PayButton from './PayButton';

const Payment = memo(() => (
  <section className="column">
    <h2 className="subtitle is-4">Pay with card</h2>
    <div className="payment-form block">
      <Email />
      <Card />
      <Name type="cardholder_name" />
      <Country />
    </div>
    <PayButton />
  </section>
));

export default Payment;
