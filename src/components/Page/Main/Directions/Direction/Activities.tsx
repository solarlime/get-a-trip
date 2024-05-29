/* eslint-disable max-len */
import { memo } from 'react';

import styles from '../../../Page.module.scss';
import Carousel from '../../../common/Carousel';
import Section from '../../../common/Section';

const pictures = ['tXiMrX3Gc-g', 'e3OUQGT9bWU', 'UmV2wr-Vbq8'];

const Activities = memo(() => (
  <Section id="activities" classes={styles.section_beforeColoured}>
    <h1 className={`title ${styles.container__title}`}>Activities</h1>
    <div className={`columns ${styles.container__columns}`}>
      <Carousel imageLocation="right" pictures={pictures} />
      <div className={`column is-7 ${styles.columns__text}`}>
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
    </div>
  </Section>
));

export default Activities;
