import { memo } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';

const Dropdown = memo((props: {
  label: 'Where' | 'Room' | 'SIM card' | 'Travel insurance',
  type: 'destination' | 'room' | 'sim' | 'insurance',
  setter: 'setDestination' | 'setRoom' | 'setSim' | 'setInsurance',
  classes?: string,
}) => {
  const {
    label, type, setter, classes,
  } = props;
  const componentState = useStore((state) => state[type]);
  const setComponentState = useStore((state) => state[setter]);

  return (
    <div className={`${styles.dropdown} ${(type !== 'destination') ? 'field' : ''}`}>
      <label className={`label ${(classes) || ''}`} htmlFor={type}>{label}</label>
      <div id={type} className="control">
        <div className={`select ${styles.dropdown__selector} is-fullwidth`}>
          <select
            value={componentState.option.value}
            data-testid={type}
            // @ts-ignore
            onChange={(event) => setComponentState({ ...componentState, status: 'success', option: componentState.options.find((option) => option.value === event.target.value) })}
          >
            <option value="" disabled>Choose any option</option>
            {
              componentState.options
                .map((item) => <option value={item.value} key={id()}>{`${item.value}${(item.price) ? ` (+${item.price}$)` : ''}`}</option>)
            }
          </select>
        </div>
      </div>
    </div>
  );
});

export default Dropdown;
