import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as id } from 'uuid';

import useStore from '../../../../../../store/store';
import styles from '../../../../Page.module.sass';
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
  const sim = useStore((state) => state.sim);
  const insurance = useStore((state) => state.insurance);

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
    () => ![...recurring, ...notRecurring, firstName, lastName, phone, email]
      .every((input) => input.status === 'success'),
    [recurring, notRecurring, firstName, lastName, phone, email],
  );

  return (
    <div className={`box ${styles.my_price_box}`}>
      <div className="p-4">
        <h3 className="title mb-5 is-size-4 is-size-5-touch has-text-centered has-text-primary">Price details</h3>
        {
          (notRecurring.length) ? (
            <div>
              <h3 className="subtitle mb-4 is-size-5 is-size-6-touch has-text-centered has-text-primary">For whole trip</h3>
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
        <div className="mt-5">
          {
            (recurring.length && duration.status === 'success') ? (
              <div>
                <h3 className="subtitle mb-4 is-size-5 is-size-6-touch has-text-centered has-text-primary">
                  {`For ${duration.value} day${!duration.value.endsWith('1') ? 's' : ''}`}
                </h3>
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
        </div>
        <div className="mt-5">
          <div className="is-flex is-gap-1">
            <div className="is-flex-grow-1">
              <p className="content is-size-4 is-size-5-touch"><strong>Total</strong></p>
            </div>
            <div className="is-flex-shrink-0">
              <p className="content has-text-right is-size-4 is-size-5-touch">
                <strong>
                  {
                    `${
                      notRecurring.reduce((accumulator, current) => {
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
                      }, 0)
                    }$`
                  }
                </strong>
              </p>
            </div>
          </div>
        </div>
        <Link
          className={`button is-primary has-text-white is-size-6 is-block mt-5 ${isDisabled ? styles.disabled : ''}`}
          to="/checkout"
          state={{ previousLocationPathname: location.pathname }}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
});

export default TotalPrice;
