import { memo, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as id } from 'uuid';

import useStore from '../../../../../../store/store';
import styles from '../../../../Page.module.scss';
import ListItem from './ListItem';

const TotalPrice = memo(() => {
  const location = useLocation();
  const firstName = useStore((state) => state.firstName);
  const lastName = useStore((state) => state.lastName);
  const phone = useStore((state) => state.phone);
  const email = useStore((state) => state.email);

  const basicPrice = useStore((state) => state.chosenTour.basicPrice);
  const duration = useStore((state) => state.duration);
  const room = useStore((state) => state.room);
  const sim = useStore((state) => state.simCard);
  const insurance = useStore((state) => state.travelInsurance);
  const total = useStore((state) => state.total);
  const setTotal = useStore((state) => state.setTotal);

  const [recurring, notRecurring] = useMemo(
    () => {
      const items = [room, sim, insurance];
      const basicProgram = { status: 'success', option: { value: 'Basic program', price: +basicPrice } };
      return [
        [...items.filter((item) => item.isRecurring), basicProgram],
        items.filter((item) => !item.isRecurring),
      ];
    },
    [room, sim, insurance],
  );

  const isDisabled = useMemo(
    () => ![...recurring, ...notRecurring, firstName, lastName, phone, email, duration]
      .every((input) => input.status === 'success'),
    [recurring, notRecurring, firstName, lastName, phone, email, duration],
  );

  const calculated = notRecurring.reduce((accumulator, current) => {
    if (current.option.price) {
      return accumulator + current.option.price;
    }
    return accumulator;
  }, 0)
    + recurring.reduce((accumulator, current) => {
      if (current.option.price && duration.status === 'success') {
        return accumulator + current.option.price * +duration.value;
      }
      return accumulator;
    }, 0);

  useEffect(() => {
    if (calculated !== total) setTotal(calculated);
  }, [calculated]);

  return (
    <div className={`box ${styles.booking__price__priceBox}`}>
      <div className={styles.priceBox__content}>
        <h3 className={`title ${styles.priceBox__content__title}`}>Price details</h3>
        {
          (notRecurring.length && notRecurring.some((item) => item.status === 'success')) ? (
            <div className={styles.priceBox__content__part}>
              <h4 className={`subtitle ${styles.part__title}`}>For whole trip</h4>
              {
                notRecurring.map((item) => ((item.status === 'success' && item.option.price !== undefined) ? (
                  <ListItem
                    first={item.option.value}
                    second={item.option.price.toString()}
                    key={id()}
                  />
                ) : ''))
              }
            </div>
          ) : ''
        }
        {
          (recurring.length && duration.status === 'success') ? (
            <div className={styles.priceBox__content__part}>
              <h4 className={`subtitle ${styles.part__title}`}>
                {`For ${duration.value} day${!duration.value.endsWith('1') ? 's' : ''}`}
              </h4>
              {
                recurring.map((item) => ((item.status === 'success' && item.option.price !== undefined) ? (
                  <ListItem
                    first={item.option.value}
                    second={(item.option.price * +duration.value).toString()}
                    key={id()}
                  />
                ) : ''))
              }
            </div>
          ) : ''
        }
        <div className={styles.priceBox__content__part}>
          <ListItem
            first="Total"
            second={calculated.toString()}
            isBold
          />
        </div>
        <div className={styles.priceBox__content__part}>
          <Link
            className={`button is-primary ${styles.part__button} ${isDisabled ? styles.disabled : ''}`}
            to="/checkout"
            state={{ previousLocationPathname: location.pathname }}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
});

export default TotalPrice;
