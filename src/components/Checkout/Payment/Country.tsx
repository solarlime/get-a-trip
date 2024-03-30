import { memo, useEffect } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Checkout.module.sass';
import useStore from '../../../store/store';

const Country = memo(() => {
  const countries = useStore((state) => state.countries);
  const getCountries = useStore((state) => state.getCountries);

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="field">
      <label className="label" htmlFor="country">Country or region</label>
      <div className={`control ${styles.specific}`}>
        <div className={`select is-fullwidth ${styles.specific} ${styles.selector}`}>
          <select id="country">
            {countries.map((item) => <option value="" key={id()}>{item}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
});

export default Country;
