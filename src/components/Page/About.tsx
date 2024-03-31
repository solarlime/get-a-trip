/* eslint-disable max-len */
import { memo } from 'react';

import styles from './Page.module.sass';
import about from '../../img/kimson-doan-AZMmUy2qL6A-unsplash.jpg';

const About = memo(() => (
  <section id="about" className={`hero ${styles.my_section}`}>
    <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
      <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
        <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">What we are doing</h1>
        <div className="columns">
          <div className="column is-6">
            <p className="block">
              Have you ever found yourself wanting to&nbsp;go somewhere but&nbsp;not&nbsp;wishing to&nbsp;choose a&nbsp;hotel or&nbsp;find travel companions? Or&nbsp;maybe you want something unusual. We understand and&nbsp;can&nbsp;help you!
            </p>
            <p className="block">
              We have collected a&nbsp;number of&nbsp;interesting destinations around the&nbsp;world for&nbsp;you. We&apos;ve already found the&nbsp;hotel you&apos;ll love. We&apos;ve also found a&nbsp;group of&nbsp;like-minded travelers you won&apos;t&nbsp;be&nbsp;bored with. Want to&nbsp;go with&nbsp;someone? No problem! Choose where you want to&nbsp;go, add&nbsp;the&nbsp;options you want, and&nbsp;we&apos;ll take care of&nbsp;your&nbsp;future rest!
            </p>
          </div>
          <div className="column" />
          <img className={`column is-5 ${styles.my_column}`} src={about} alt="people are sitting next to the fire" />
        </div>
      </div>
    </div>
  </section>
));

export default About;
