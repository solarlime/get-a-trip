import { memo } from 'react';

import useStore from '../../../../store/store';

const Companions = memo(() => {
  const companions = useStore((state) => state.companions);
  const setCompanions = useStore((state) => state.setCompanions);

  return (
    <div className="is-flex-grow-1">
      <label className="label" htmlFor="companions">Companions</label>
      <div id="companions" className="control">
        <input
          className="input"
          type="number"
          placeholder="Add guests"
          value={companions.value}
          onChange={(event) => setCompanions({ status: 'success', value: event.target.value })}
        />
      </div>
    </div>
  );
});

export default Companions;
