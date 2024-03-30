import { memo } from 'react';
import { isAlpha } from 'validator';

import useStore from '../../../store/store';

const CardholderName = memo(() => {
  const componentState = useStore((state) => state.cardholderName);
  const setState = useStore((state) => state.setCardholderNameState);

  return (
    <div className="field">
      <label className="label" htmlFor="name">
        Cardholder name
      </label>
      <div className="control">
        <input
          id="name"
          className={`input ${(componentState.status !== 'idle') ? 'is-success' : ''}`}
          type="text"
          placeholder="Full name on card"
          value={componentState.value}
          onChange={(event) => {
            const input = event.target.value.trimStart();
            if (input === '' || isAlpha(input, 'en-US', { ignore: ' ' })) {
              setState({ status: 'idle', value: input });
            }
          }}
          onBlur={() => {
            const cleaned = componentState.value.replace(/\s+/g, ' ').trim();
            if (cleaned.length) {
              setState({ value: cleaned, status: 'success' });
            } else {
              setState({ ...componentState, status: 'idle' });
            }
          }}
        />
      </div>
    </div>
  );
});

export default CardholderName;
