import { memo } from 'react';

import styles from '../../Page.module.sass';
import useStore from '../../../../store/store';

const Destination = memo(() => {
  const destination = useStore((state) => state.destination);
  const setDestination = useStore((state) => state.setDestination);

  return (
    <div>
      <label className="label" htmlFor="where">Where</label>
      <div id="where" className="control">
        <div className={`select is-fullwidth ${styles.specific} ${styles.selector}`}>
          <select
            value={destination.value}
            onChange={(event) => setDestination({ status: 'success', value: event.target.value })}
          >
            <option value="" disabled>Choose destination</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="South_America">South America</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default Destination;
