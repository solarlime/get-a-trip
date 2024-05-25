/* eslint-disable max-len */
import { memo } from 'react';
import { v4 as id } from 'uuid';

import styles from '../../../Page.module.scss';
import useStore from '../../../../../store/store';
import Carousel from '../../../common/Carousel';

const AboutTour = memo(() => {
  const tour = useStore((state) => state.chosenTour);

  return (
    <section id="about-tour" className={`hero ${styles.section}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <h1 className={`title ${styles.container__title}`}>About tour</h1>
          <div className={`columns ${styles.container__columns}`}>
            <Carousel imageLocation="left" />
            <div className={`column is-7 is-offset-5 ${styles.columns__text}`}>
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
