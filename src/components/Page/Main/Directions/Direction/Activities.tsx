/* eslint-disable max-len */
import { memo } from 'react';

import styles from '../../../Page.module.sass';
import people from '../../../../../img/people.jpg';

const Activities = memo(() => (
  <section id="activities" className={`hero ${styles.my_section} ${styles.my_section_before_coloured}`}>
    <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
      <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
        <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">Activities</h1>
        <div className="columns">
          <div className="column is-6">
            <p className="block">
              We always have an&nbsp;idea for&nbsp;evening event. We can arrange a&nbsp;party and&nbsp;pool, wine tasting or&nbsp;a&nbsp;joint trip to&nbsp;the&nbsp;nearby ancient city on&nbsp;scooters. We will have a&nbsp;list of&nbsp;what we&nbsp;can&nbsp;offer, but&nbsp;each participant is&nbsp;able&nbsp;to&nbsp;offer their&nbsp;own ideas, and&nbsp;we will&nbsp;plan them together!
            </p>
            <p className="block">
              We will&nbsp;finalize a&nbsp;detailed daily schedule after we&nbsp;have&nbsp;interviews with&nbsp;each participant and&nbsp;understand your&nbsp;interests and&nbsp;ideas. At&nbsp;the&nbsp;same time, the&nbsp;program always remains flexible, participants can&nbsp;contribute and&nbsp;offer their event(s) for&nbsp;an&nbsp;evening.
            </p>
            <p className="block">
              It&apos;s always fun to&nbsp;do something together. You can&nbsp;easily find your&nbsp;company among the&nbsp;community for&nbsp;windsurfing, fishing, jogging and&nbsp;anything else.
            </p>
          </div>
          <div className="column" />
          <picture className="column is-5 is-aspect-ratio-16by9">
            <img className={`${styles.my_column}`} src={people} alt="people are sitting next to the fire" style={{ objectPosition: 'top center' }} />
          </picture>
        </div>
      </div>
    </div>
  </section>
));

export default Activities;
