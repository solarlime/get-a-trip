import { memo } from 'react';
import { isEmail, isEmpty } from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import useStore from '../../../store/store';
import styles from '../Checkout.module.scss';

const Email = memo((props: { classes?: string }) => {
  const { classes } = props;
  const componentState = useStore((state) => state.email);
  const setState = useStore((state) => state.setEmailState);

  return (
    <div className="field">
      <label className={`label ${(classes) || ''}`} htmlFor="email">Email</label>
      <div className="control has-icons-right">
        <input
          id="email"
          className={`input ${(componentState.status === 'fail') ? 'is-danger' : (componentState.status === 'success') ? 'is-success' : ''}`}
          type="email"
          value={componentState.value}
          placeholder="sigmund@freud.site"
          onChange={(event) => setState({ status: 'idle', value: event.target.value })}
          onBlur={() => {
            setState({ ...componentState, status: isEmpty(componentState.value) ? 'idle' : isEmail(componentState.value) ? 'success' : 'fail' });
          }}
          required
        />
        {
          (componentState.status === 'fail') ? (
            <span className="icon is-small is-right">
              <FontAwesomeIcon className={styles.colorDanger} icon={faCircleExclamation} />
            </span>
          ) : ''
        }
      </div>
      <p className={`help ${(classes) || 'is-danger'} ${(componentState.status !== 'fail') ? styles.hidden : ''}`}>
        Your email is incomplete.
      </p>
    </div>
  );
});

export default Email;
