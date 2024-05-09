import { memo, useEffect, useState } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Checkout.module.scss';
import useStore from '../../../store/store';

const Country = memo(() => {
  const countries = useStore((state) => state.countries);
  const getCountries = useStore((state) => state.getCountries);
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (countries.length === 1) getCountries();
  }, []);

  return (
    <div className="field">
      <label className="label" htmlFor="country">Country or region</label>
      <div className="control">
        <div className={`select is-fullwidth ${styles.countrySelector}`}>
          <select id="country" value={(country === '') ? 'United Kingdom' : country} onChange={(event) => setCountry(event.target.value)}>
            {countries.map((item) => <option value={item.name} key={id()}>{item.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
});

export default Country;
