/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from 'react';

import styles from '../../../Page.module.sass';
import Email from '../../../../Checkout/Payment/Email';
import Name from '../../../../Checkout/Payment/Name';
import Phone from './Booking/Phone';
import Duration from '../../Search/Duration';

const Booking = memo(() => {
  console.log('wow');

  return (
    <section id="booking" className={`hero is-primary ${styles.my_section} ${styles.my_section_coloured}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-white">Start your adventure now!</h1>
          <div className="columns">
            <div className="column is-4">
              <div className={`container has-background-white ${styles.my_search_container}`}>
                <h3 className="title is-size-4 is-size-5-touch has-text-centered has-text-primary">Price details</h3>
              </div>
            </div>
            <div className="column" />
            <div className="column is-7">
              <form className="form is-multiline">
                <div className="pb-6">
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
                        <label className="label has-text-white" htmlFor="last_name">Room</label>
                        <div id="people" className="control">
                          <span className="select is-fullwidth">
                            <select>
                              <option value="" disabled>Choose the type</option>
                              <option value="shared">Shared room</option>
                              <option value="private">Private room (+20$/day)</option>
                            </select>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="columns">
                      <div className="column">
                        <label className="label has-text-white" htmlFor="sim">SIM card</label>
                        <div id="sim" className="control">
                          <span className="select is-fullwidth">
                            <select>
                              <option value="" disabled>Choose the type</option>
                              <option value="without">Without SIM card</option>
                              <option value="local">Local SIM card (+10$)</option>
                              <option value="international">International SIM card (+20$)</option>
                            </select>
                          </span>
                        </div>
                      </div>
                      <div className="column">
                        <label className="label has-text-white" htmlFor="insurance">Travel insurance</label>
                        <div id="insurance" className="control">
                          <span className="select is-fullwidth">
                            <select>
                              <option value="" disabled>Choose the type</option>
                              <option value="without">Without insurance</option>
                              <option value="basic">Basic insurance (+5$/day)</option>
                              <option value="extended">Extended insurance (+10$/day)</option>
                            </select>
                          </span>
                        </div>
                      </div>
                    </div>
                    <h5 className="label has-text-white">Tickets</h5>
                    <div className="tabs is-toggle">
                      <ul className="control">
                        <li className="is-active">
                          <a className="is-block">
                            <label
                              className="radio"
                              htmlFor="without"
                            >
                              Without tickets
                            </label>
                            <input
                              id="without"
                              type="radio"
                              className="is-display-none"
                              name="tickets"
                              onClick={(e) => { console.log(e.target); }}
                            />
                          </a>
                        </li>
                        <li>
                          <a className="is-block">
                            <label className="radio" htmlFor="without">Add tickets</label>
                            <input id="without" type="radio" className="is-display-none" name="tickets" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Booking;
