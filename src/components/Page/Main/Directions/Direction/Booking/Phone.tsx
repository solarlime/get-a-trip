import { memo, useEffect } from 'react';
import { v4 as id } from 'uuid';
import { isEmpty, isNumeric } from 'validator';

import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';

const Phone = memo(() => {
  const countries = useStore((state) => state.countries);
  const phone = useStore((state) => state.phone);
  const getCountries = useStore((state) => state.getCountries);
  const setPhone = useStore((state) => state.setPhone);

  useEffect(() => {
    if (countries.length === 1) getCountries();
  }, []);

  return (
    <div className="field">
      <label className={`label ${styles.customColorWhite}`} htmlFor="phone">Phone number</label>
      <div className={`field ${styles.dropdown} has-addons`}>
        <div id="people" className="control">
          <span className={`select ${styles.dropdown__selector}`}>
            <select
              id="phoneCode"
              value={(phone.phoneCountry === '') ? 'GBR' : phone.phoneCountry}
              onChange={(event) => setPhone({
                ...phone,
                phoneCountry: event.target.value,
                phoneCode: countries.find((item) => item.code === event.target.value)!.phoneCode,
              })}
            >
              {countries.map((item) => (
                <option value={item.code} key={id()}>{`${item.phoneCode} (${item.code})`}</option>
              ))}
            </select>
          </span>
        </div>
        <div id="phone" className="control is-expanded">
          <input
            className="input"
            type="tel"
            placeholder="and a bit more numbers"
            value={phone.phoneNumber}
            onChange={(event) => {
              if (isNumeric(event.target.value)) {
                if (phone.phoneCode === '') {
                  setPhone({
                    phoneCode: '+44',
                    phoneCountry: 'GBR',
                    phoneNumber: event.target.value,
                    status: 'success',
                  });
                } else {
                  setPhone({
                    ...phone,
                    phoneNumber: event.target.value,
                    status: 'success',
                  });
                }
              } else if (isEmpty(event.target.value)) {
                setPhone({
                  ...phone,
                  phoneNumber: event.target.value,
                  status: 'idle',
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default Phone;
