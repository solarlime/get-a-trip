import { memo } from 'react';

import useStore from '../../../../store/store';
import styles from '../../Page.module.scss';

const Duration = memo((props: { classes?: string }) => {
  const { classes } = props;
  const duration = useStore((state) => state.duration);
  const setDuration = useStore((state) => state.setDuration);
  const chosenTour = useStore((state) => state.chosenTour);

  return (
    <div className={styles.search__duration}>
      <label className={`label ${(classes) || ''}`} htmlFor="duration">Duration</label>
      <div id="duration" className="control">
        <input
          className="input"
          type="number"
          placeholder="Number of nights"
          value={duration.value}
          onChange={(event) => {
            if (!chosenTour.place || +event.target.value <= chosenTour.dates.duration) {
              setDuration({ status: 'success', value: event.target.value });
            }
          }}
        />
      </div>
    </div>
  );
});

export default Duration;
