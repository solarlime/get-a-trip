import { memo } from 'react';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';

const CheckInDate = memo(() => {
  const checkIn = useStore((state) => state.checkInDate);
  const setCheckIn = useStore((state) => state.setCheckInDate);

  return (
    <div className={styles.search__checkInDate}>
      <label className="label" htmlFor="checkin">Check in</label>
      <div id="checkin" className="control">
        <input
          className={`input ${(checkIn.status === 'fail') ? 'is-danger' : ''}`}
          type="date"
          placeholder="Add dates"
          value={checkIn.value}
          onChange={(event) => {
            setCheckIn({ status: 'idle', value: event.target.value });
          }}
          onBlur={(event) => {
            const chosenDate = new Date(event.target.value);
            const todayDate = new Date();
            if (
              (chosenDate > todayDate)
              && (
                (chosenDate.getFullYear() === todayDate.getFullYear() + 1)
                || (chosenDate.getFullYear() === todayDate.getFullYear())
              )
            ) {
              setCheckIn({ status: 'success', value: event.target.value });
            } else if (event.target.value === '' && event.target.validity.valid) {
              setCheckIn({ status: 'idle', value: event.target.value });
            } else {
              setCheckIn({ status: 'fail', value: event.target.value });
            }
          }}
        />
      </div>
    </div>
  );
});

export default CheckInDate;
