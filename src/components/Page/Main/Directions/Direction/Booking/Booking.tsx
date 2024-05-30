import { memo } from 'react';

import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';
import Email from '../../../../../common/Email';
import Name from '../../../../../common/Name';
import Phone from './Phone';
import Duration from '../../../Search/Duration';
import Dropdown from '../../../../common/Dropdown';
import TotalPrice from './TotalPrice';
import Section from '../../../../common/Section';
import skyscanner from '../../../../../../img/skyscanner.svg';

const Booking = memo(() => {
  const tour = useStore((store) => store.chosenTour);

  return (
    <Section id="booking" classes={`is-primary ${styles.section_coloured}`}>
      <h1 className={`title ${styles.container__title}`}>Start your adventure now!</h1>
      <div className={`columns ${styles.booking}`}>
        <div className={`column is-4 ${styles.booking__price}`}>
          <TotalPrice />
        </div>
        <div className={`column is-7 ${styles.booking__info}`}>
          <form className="form is-multiline">
            <div className={styles.info__part}>
              <h3 className={`title ${styles.info__part__title}`}>Personal information</h3>
              <div className="block">
                <div className={`columns ${styles.info__part__flexible}`}>
                  <div className="column">
                    <Name type="First name" camelType="firstName" setter="setFirstName" classes={styles.customColorWhite} />
                  </div>
                  <div className="column">
                    <Name type="Last name" camelType="lastName" setter="setLastName" classes={styles.customColorWhite} />
                  </div>
                </div>
              </div>
              <div className="block">
                <Phone />
              </div>
              <div className="block">
                <Email classes={styles.customColorWhite} />
              </div>
            </div>
            <div className={styles.info__part}>
              <h3 className={`title ${styles.info__part__title}`}>Trip settings</h3>
              <div className="block">
                <div className={`columns ${styles.info__part__flexible}`}>
                  <div className="column">
                    <Duration classes={styles.customColorWhite} />
                  </div>
                  <div className="column">
                    <Dropdown label="Room" type="room" setter="setRoom" classes={styles.customColorWhite} />
                  </div>
                </div>
                <div className={`columns ${styles.info__part__flexible}`}>
                  <div className="column">
                    <Dropdown label="SIM card" type="sim" setter="setSim" classes={styles.customColorWhite} />
                  </div>
                  <div className="column">
                    <Dropdown label="Travel insurance" type="insurance" setter="setInsurance" classes={styles.customColorWhite} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.info__part}>
              <h3 className={`title ${styles.info__part__title}`}>Tickets</h3>
              <div className="block">
                <p className={styles.info__part__content}>
                  We recommend using
                  {' '}
                  <strong className={styles.customColorWhite}>Skyscanner</strong>
                  {' '}
                  to&nbsp;find the&nbsp;cheapest tickets. Enhance your&nbsp;deal
                  {' '}
                  with&nbsp;our&nbsp;exclusive promo code.
                  <span className={styles.info__part__call}>
                    Use our&nbsp;link to&nbsp;activate it!
                  </span>
                </p>
                <a
                  className="button"
                  href={`https://www.skyscanner.net/?redirectedFrom=get-a-trip.solarlime.dev&promoCode=${tour.promocode}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ height: '40px' }}
                >
                  <img src={skyscanner} alt="skyscanner" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
});

export default Booking;
