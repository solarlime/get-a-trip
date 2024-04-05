import { memo } from 'react';

import useStore from '../../../../store/store';

const CheckInDate = memo(() => {
  const checkIn = useStore((state) => state.checkInDate);
  const setCheckIn = useStore((state) => state.setCheckInDate);

  return (
    <div className="is-flex-shrink-0">
      <label className="label" htmlFor="checkin">Check in</label>
      <div id="checkin" className="control">
        <input
          className="input"
          type="date"
          placeholder="Add dates"
          value={checkIn.value}
          onChange={(event) => {
            if (new Date(event.target.value) > new Date()) {
              setCheckIn({ status: 'success', value: event.target.value });
            } else {
              setCheckIn({ status: 'idle', value: event.target.value });
            }
          }}
        />
      </div>
    </div>
  );
});

export default CheckInDate;
