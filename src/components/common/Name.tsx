import { memo } from 'react';
import { isAlpha } from 'validator';

import useStore from '../../store/store';

type FieldType = 'cardholder_name' | 'first_name' | 'last_name';
type Camelised<T> = T extends FieldType ? ('cardholderName' | 'firstName' | 'lastName') : ('setCardholderName' | 'setFirstName' | 'setLastName');

const labelise = (fieldType: FieldType) => fieldType.charAt(0).toLocaleUpperCase() + fieldType.replace(/(_)/g, ' ').slice(1);
const camelise = (fieldType: FieldType | `set_${FieldType}`) => fieldType
  .split('_')
  .map((substring, index) => ((index === 0)
    ? substring.charAt(0).toLocaleLowerCase()
    : substring.charAt(0).toLocaleUpperCase()) + substring.slice(1))
  .join('');

const Name = memo((props: {
  type: FieldType,
  classes?: string
}) => {
  const { type, classes } = props;
  const label = labelise(type);
  const camelType = camelise(type) as Camelised<FieldType>;
  const setter = camelise(`set_${type}`) as Camelised<`set_${FieldType}`>;
  const componentState = useStore((state) => state[camelType]);
  const setState = useStore((state) => state[setter]);

  return (
    <div className="field">
      <label className={`label ${(classes) || ''}`} htmlFor={camelType}>
        {label}
      </label>
      <div className="control">
        <input
          id={camelType}
          className={`input ${(componentState.status !== 'idle') ? 'is-success' : ''}`}
          type="text"
          placeholder={(type === 'cardholder_name') ? 'Full name on card' : (type === 'first_name') ? 'Sigmund' : 'Freud'}
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
