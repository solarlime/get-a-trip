import { memo } from 'react';
import { isCreditCard, isEmpty } from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import {
  faCcAmex, faCcJcb, faCcMastercard, faCcVisa,
} from '@fortawesome/free-brands-svg-icons';

import styles from '../../Checkout.module.scss';
import useStore from '../../../../store/store';
import { providers } from '../../../../store/types/payment';

const prettify = (numberString: string) => {
  const result: Array<string> = [];
  numberString.split('').forEach((char) => {
    result.push(char);
    if (result.length === 4 || result.length === 9 || result.length === 14) result.push(' ');
  });
  if (result[result.length - 1] === ' ') result.pop();
  return result.join('');
};

const CardNumber = memo(() => {
  const componentState = useStore((state) => state.cardNumber);
  const setState = useStore((state) => state.setCardNumber);

  return (
    <div className="control has-icons-right">
      <input
        id="card"
        className={`input ${styles.cardInfo__number} ${(componentState.status === 'fail') ? 'is-danger' : (componentState.status === 'success') ? 'is-success' : ''} ${(componentState.focused) ? styles.cardInfo__number_focused : ''}`}
        type="text"
        placeholder="1234 1234 1234 1234"
        value={componentState.value}
        onChange={(event) => {
          const cardNumber = event.target.value.replaceAll(' ', '');
          if (cardNumber.length <= 16 && !Number.isNaN(+cardNumber)) {
            setState({
              status: 'idle', value: prettify(cardNumber), provider: null, focused: componentState.focused,
            });
          }
        }}
        onFocus={() => setState({ ...componentState, focused: true })}
        onBlur={() => {
          if (!isEmpty(componentState.value)) {
            const provider = providers
              .find((company) => isCreditCard(componentState.value, { provider: company }));
            if (provider) {
              setState({
                ...componentState,
                status: 'success',
                provider,
                focused: false,
              });
            } else {
              setState({
                ...componentState,
                status: 'fail',
                provider: null,
                focused: false,
              });
            }
          } else {
            setState({
              ...componentState, status: 'idle', provider: null, focused: false,
            });
          }
        }}
        required
      />
      {
          (componentState.status === 'fail') ? (
            <span role="contentinfo" className={`icon is-small is-right ${(componentState.focused) ? styles.icon_focused : ''}`}>
              <FontAwesomeIcon className={styles.customColorDanger} icon={faCircleExclamation} />
            </span>
          ) : (
            <span className={`icon is-small is-right ${styles.cardInfo__numberIcons} ${(componentState.focused) ? styles.icon_focused : ''}`}>
              {
                (!componentState.provider)
                  ? (
                    <>
                      <FontAwesomeIcon icon={faCcVisa} />
                      <FontAwesomeIcon icon={faCcMastercard} />
                      <FontAwesomeIcon icon={faCcAmex} />
                      <FontAwesomeIcon icon={faCcJcb} />
                    </>
                  ) : (componentState.provider === 'visa') ? <FontAwesomeIcon className={styles.customColorGreen} icon={faCcVisa} />
                    : (componentState.provider === 'mastercard') ? <FontAwesomeIcon className={styles.customColorGreen} icon={faCcMastercard} />
                      : (componentState.provider === 'amex') ? <FontAwesomeIcon className={styles.customColorGreen} icon={faCcAmex} />
                        : <FontAwesomeIcon className={styles.customColorGreen} icon={faCcJcb} />
              }
            </span>
          )
        }
    </div>
  );
});

export default CardNumber;
