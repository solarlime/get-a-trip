import { memo } from 'react';

import useStore from '../../../../store/store';

const Duration = memo(() => {
  const duration = useStore((state) => state.duration);
  const setDuration = useStore((state) => state.setDuration);

  return (
    <div className="is-flex-grow-1">
      <label className="label" htmlFor="duration">Duration</label>
      <div id="duration" className="control">
        <input
          className="input"
          type="number"
          placeholder="Number of nights"
          value={duration.value}
          onChange={(event) => setDuration({ status: 'success', value: event.target.value })}
        />
      </div>
    </div>
  );
});

export default Duration;
