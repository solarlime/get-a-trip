import { memo } from 'react';
import { isEmpty, isNumeric } from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from '../../Checkout.module.scss';
import useStore from '../../../../store/store';

const prettify = (numberString: string) => {
  const result: Array<string> = [];
  numberString.split('').forEach((char) => {
    result.push(char);
    if (result.length === 2) result.push(' / ');
  });
  if (result[result.length - 1] === ' / ') result.pop();
  return result.join('');
};

const CardDate = memo(() => {
  const componentState = useStore((state) => state.cardDate);
  const setState = useStore((state) => state.setCardDateState);
  return (
    <div className="control is-expanded has-icons-right">
      <input
        id="cardDate"
        className={`input ${styles.cardInfo__date} ${(componentState.status === 'fail') ? 'is-danger' : (componentState.status === 'success') ? 'is-success' : ''}`}
        type="text"
        placeholder="MM / YY"
        value={componentState.value}
        onChange={(event) => {
          if (event.target.value.length <= 7) {
            const input = event.target.value.replace(' / ', '');
            if (isEmpty(input) || isNumeric(input)) {
              setState({ value: prettify(input), status: 'idle' });
            }
          }
        }}
        onBlur={() => {
          if (componentState.value.length === 7) {
            const input = componentState.value.replace(' / ', '');
            const month = input[0] + input[1];
            const year = input[2] + input[3];
            const nowDate = new Date();
            const expiryDate = new Date();
            expiryDate.setFullYear(+`20${year}`, +month - 1, 1);
            if (expiryDate > nowDate && +month < 13 && +month > 0) {
              setState({ ...componentState, status: 'success' });
            } else {
              setState({ ...componentState, status: 'fail' });
            }
          } else if (componentState.value.length >= 1 && componentState.value.length <= 6) {
            setState({ ...componentState, status: 'fail' });
          }
        }}
        required
      />
      <span className={`icon is-small is-right ${(componentState.status !== 'fail') ? styles.hidden : ''}`}>
        <FontAwesomeIcon className={styles.colorDanger} icon={faCircleExclamation} />
      </span>
    </div>
  );
});

export default CardDate;
