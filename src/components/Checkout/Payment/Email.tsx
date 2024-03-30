import { memo } from 'react';
import { isEmail, isEmpty } from 'validator';

import useStore from '../../../store/store';

const Email = memo(() => {
  const componentState = useStore((state) => state.email);
  const setState = useStore((state) => state.setEmailState);

  return (
    <div className="field">
      <label className="label" htmlFor="email">Email</label>
      <div className="control has-icons-right">
        <input
          id="email"
          className={`input ${(componentState.status === 'fail') ? 'is-danger' : (componentState.status === 'success') ? 'is-success' : ''}`}
          type="email"
          value={componentState.value}
          onChange={(event) => setState({ status: 'idle', value: event.target.value })}
          onBlur={() => {
            setState({ ...componentState, status: isEmpty(componentState.value) ? 'idle' : isEmail(componentState.value) ? 'success' : 'fail' });
          }}
          required
        />
        {
          (componentState.status === 'fail') ? (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : ''
        }
      </div>
      <p className={`help is-danger ${(componentState.status !== 'fail') ? 'is-hidden' : ''}`}>
        Your email is incomplete.
      </p>
    </div>
  );
});

export default Email;
