import { memo } from 'react';
import { isAlpha } from 'validator';

import useStore from '../../../store/store';

const Name = memo((props: {
  type: 'Cardholder name' | 'First name' | 'Last name',
  camelType: 'cardholderName' | 'firstName' | 'lastName'
  setter: 'setCardholderNameState' | 'setFirstName' | 'setLastName'
  classes?: string
}) => {
  const {
    type, camelType, setter, classes,
  } = props;
  const componentState = useStore((state) => state[camelType]);
  const setState = useStore((state) => state[setter]);

  return (
    <div className="field">
      <label className={`label ${(classes) || ''}`} htmlFor={camelType}>
        {type}
      </label>
      <div className="control">
        <input
          id={camelType}
          className={`input ${(componentState.status !== 'idle') ? 'is-success' : ''}`}
          type="text"
          placeholder={(camelType === 'cardholderName') ? 'Full name on card' : (camelType === 'firstName') ? 'Sigmund' : 'Freud'}
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

export default Name;
