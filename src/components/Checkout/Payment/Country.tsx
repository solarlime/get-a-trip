import { memo, useEffect, useState } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Checkout.module.sass';
import useStore from '../../../store/store';

const Country = memo(() => {
  const countries = useStore((state) => state.countries);
  const getCountries = useStore((state) => state.getCountries);
  const [country, setCountry] = useState('');

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="field">
      <label className="label" htmlFor="country">Country or region</label>
      <div className={`control ${styles.specific}`}>
        <div className={`select is-fullwidth ${styles.specific} ${styles.selector}`}>
          <select id="country" value={(country === '') ? 'United Kingdom' : country} onChange={(event) => setCountry(event.target.value)}>
            {countries.map((item) => <option value={item} key={id()}>{item}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
});

export default Country;
