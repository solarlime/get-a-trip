import { memo } from 'react';

import styles from '../../../../Page.module.sass';
import Email from '../../../../../Checkout/Payment/Email';
import Name from '../../../../../Checkout/Payment/Name';
import Phone from './Phone';
import Duration from '../../../Search/Duration';
import Dropdown from '../../../Search/Dropdown';
import TotalPrice from './TotalPrice';

const Booking = memo(() => (
  <section id="booking" className={`hero is-primary ${styles.my_section} ${styles.my_section_coloured}`}>
    <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
      <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
        <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-white">Start your adventure now!</h1>
        <div className={`columns ${styles.booking}`}>
          <div className={`column is-4 ${styles.price}`}>
            <TotalPrice />
          </div>
          <div className={`column ${styles.empty}`} />
          <div className="column is-7">
            <form className="form is-multiline">
              <div className={styles.padding}>
                <h3 className="title is-size-4 is-size-4-mobile has-text-white">Personal information</h3>
                <div className="block">
                  <div className="columns">
                    <div className="column">
                      <Name type="First name" camelType="firstName" setter="setFirstName" classes="has-text-white" />
                    </div>
                    <div className="column">
                      <Name type="Last name" camelType="lastName" setter="setLastName" classes="has-text-white" />
                    </div>
                  </div>
                </div>
                <div className="block">
                  <Phone />
                </div>
                <div className="block">
                  <Email classes="has-text-white" />
                </div>
              </div>
              <div>
                <h3 className="title is-size-4 is-size-4-mobile has-text-white">Trip settings</h3>
                <div className="block">
                  <div className="columns">
                    <div className="column">
                      <Duration classes="has-text-white" />
                    </div>
                    <div className="column">
                      <Dropdown label="Room" type="room" setter="setRoom" classes="has-text-white" />
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <Dropdown label="SIM card" type="sim" setter="setSim" classes="has-text-white" />
                    </div>
                    <div className="column">
                      <Dropdown label="Travel insurance" type="insurance" setter="setInsurance" classes="has-text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
));

export default Booking;
