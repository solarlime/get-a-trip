/* eslint-disable max-len */
import { memo } from 'react';
import { v4 as id } from 'uuid';

import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';
import Carousel from '../../../common/Carousel';

const AboutTour = memo(() => {
  const tour = useStore((state) => state.chosenTour);

  return (
    <section id="about" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">About tour</h1>
          <div className={`columns ${styles.columns}`}>
            <Carousel imageLocation="left" />
            <div className="column is-7 is-offset-5">
              {
                tour.description.map((paragraph) => (
                  <p className="block" key={id()}>{paragraph}</p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutTour;
