import { memo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { isEmpty, isNumeric } from 'validator';

import styles from '../../Checkout.module.sass';
import useStore from '../../../../store/store';

const CardCvc = memo(() => {
  const componentState = useStore((state) => state.cardCvc);
  const cardProvider = useStore((state) => state.cardNumber.provider);
  const setState = useStore((state) => state.setCardCvcState);

  useEffect(() => {
    setState({ value: '', status: 'idle' });
  }, [cardProvider]);

  return (
    <div className="control is-expanded has-icons-right">
      <input
        id="cardCvc"
        className={`input ${styles.card_cvc} ${(componentState.status === 'success') ? 'is-success' : (componentState.status === 'fail') ? 'is-danger' : ''}`}
        type="text"
        placeholder="CVC"
        value={componentState.value}
        onChange={(event) => {
          if (
            (isNumeric(event.target.value) && event.target.value.length <= 4)
            || isEmpty(event.target.value)
          ) {
            setState({ value: event.target.value, status: 'idle' });
          }
        }}
        onBlur={() => {
          // Visa, MC, JCB has 3-digit CVC whereas Amex has 4-digit one
          if (isNumeric(componentState.value) && componentState.value.length === 3 && cardProvider !== 'amex' && cardProvider !== null) {
            setState({ ...componentState, status: 'success' });
          } else if (isNumeric(componentState.value) && componentState.value.length === 4 && cardProvider === 'amex') {
            setState({ ...componentState, status: 'success' });
          } else if (componentState.value.length > 0 && componentState.value.length !== 4 && cardProvider === 'amex') {
            setState({ ...componentState, status: 'fail' });
          } else if (componentState.value.length > 0 && componentState.value.length !== 3 && cardProvider !== 'amex' && cardProvider !== null) {
            setState({ ...componentState, status: 'fail' });
          } else {
            console.log(componentState.value.length, cardProvider);
            setState({ ...componentState, status: 'idle' });
          }
        }}
        required
      />
      <span className={`icon is-small is-right ${(componentState.status !== 'fail') ? 'is-hidden' : ''}`}>
        <FontAwesomeIcon className="has-text-danger" icon={faCircleExclamation} />
      </span>
    </div>
  );
});

export default CardCvc;
