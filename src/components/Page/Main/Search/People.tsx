import { memo } from 'react';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import { placesLeft } from '../../../../utils';

const People = memo(() => {
  const companions = useStore((state) => state.companions);
  const setCompanions = useStore((state) => state.setCompanions);

  return (
    <div className={styles.search__people}>
      <label className="label" htmlFor="people">People</label>
      <div id="people" className="control">
        <input
          className="input"
          type="number"
          placeholder="How many will go?"
          value={companions.value}
          onChange={(event) => {
            if (+event.target.value <= placesLeft) {
              setCompanions({ status: 'success', value: event.target.value });
            }
          }}
        />
      </div>
    </div>
  );
});

export default People;
