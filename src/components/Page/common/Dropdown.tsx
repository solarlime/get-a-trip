import { memo } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';

type FieldType = 'where_to_go' | 'room' | 'SIM_card' | 'travel_insurance';
type Camelised<T> = T extends FieldType ? ('whereToGo' | 'room' | 'simCard' | 'travelInsurance') : ('setWhereToGo' | 'setRoom' | 'setSimCard' | 'setTravelInsurance');

const labelise = (fieldType: FieldType) => fieldType.charAt(0).toLocaleUpperCase() + fieldType.replace(/(_)/g, ' ').slice(1);
const camelise = (fieldType: FieldType | `set_${FieldType}`) => fieldType
  .split('_')
  .map((substring, index) => ((index === 0)
    ? substring.charAt(0).toLocaleLowerCase()
    : substring.charAt(0).toLocaleUpperCase()) + substring.slice(1).toLocaleLowerCase())
  .join('');

const Dropdown = memo((props: {
  type: FieldType,
  classes?: string,
}) => {
  const { type, classes } = props;
  const label = labelise(type);
  const camelType = camelise(type) as Camelised<FieldType>;
  const setter = camelise(`set_${type}`) as Camelised<`set_${FieldType}`>;
  const componentState = useStore((state) => state[camelType]);
  const setComponentState = useStore((state) => state[setter]);

  return (
    <div className={`${styles.dropdown} ${(type !== 'where_to_go') ? 'field' : ''}`}>
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
