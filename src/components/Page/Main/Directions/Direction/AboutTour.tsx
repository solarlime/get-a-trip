/* eslint-disable max-len */
import { memo, useEffect } from 'react';

import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';

const AboutTour = memo(() => {
  const tour = useStore((state) => state.chosenTour);
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);
  const imageId = 'V7R1QbUOVdM';

  useEffect(() => {
    getImage(imageId);
  }, []);

  return (
    <section id="about" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">About tour</h1>
          <div className="columns">
            {
                (image[imageId]) ? (
                  <picture className="column is-aspect-ratio-16by9">
                    <source
                      srcSet={`${image[imageId].value}&auto=compress&fm=jpg&w=320&crop=entropy&fit=clip 320w, 
                      ${image[imageId].value}&auto=compress&fm=jpg&w=640&crop=entropy&fit=clip 640w, 
                      ${image[imageId].value}&auto=compress&fm=jpg&w=960&crop=entropy&fit=clip 960w, 
                      ${image[imageId].value}&auto=compress&fm=jpg&w=1280&crop=entropy&fit=clip 1280w, 
                      ${image[imageId].value}&auto=compress&fm=jpg&w=1920&crop=entropy&fit=clip 1920w, 
                      ${image[imageId].value}&auto=compress&fm=jpg&w=2560&crop=entropy&fit=clip 2560w`}
                      sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, (max-width: 1300px) 500px, 1280px"
                      type="image/jpeg"
                    />
                    <img
                      className={styles.my_column}
                      src={image[imageId].value}
                      alt={`${tour.country}, ${tour.place}`}
                    />
                  </picture>
                ) : (
                  <picture className="column">
                    <img className={`${styles.my_column}`} src={image.placeholder.value} alt="people are sitting next to the fire" />
                  </picture>
                )
              }
            <div className="column is-7">
              <p className="block">
                Kas is&nbsp;everything that&nbsp;a&nbsp;typical Mediterranean seaside resort in&nbsp;Turkey should&nbsp;be. White washed houses cascade down the&nbsp;winding mountain roads to&nbsp;show the&nbsp;way to&nbsp;beautiful beaches and&nbsp;a&nbsp;harbor that&nbsp;reminds you that&nbsp;life is&nbsp;in&nbsp;fact quite good and&nbsp;while in&nbsp;Kas, the&nbsp;best thing to&nbsp;do is&nbsp;to &nbsp;adapt quickly to&nbsp;the&nbsp;Mediterranean lifestyle.
              </p>
              <p className="block">
                Many of&nbsp;the&nbsp;houses in&nbsp;Kas are&nbsp;surrounded with&nbsp;pink bougainvillea flowers that&nbsp;immediately make you&nbsp;notice the&nbsp;influence of&nbsp;Greek architecture in&nbsp;some of&nbsp;the&nbsp;older properties, typically the&nbsp;wooden shutters, narrow streets and&nbsp;large terraces for&nbsp;enjoying the&nbsp;mid-day sun.
              </p>
              <p className="block">
                Like many towns in&nbsp;this&nbsp;area, there used to&nbsp;be a&nbsp;huge Greek population until 1923 when there was an&nbsp;exchange of&nbsp;citizens between Greece and&nbsp;Turkey. That was a&nbsp;turbulent time for&nbsp;the&nbsp;area, when people were unsure of&nbsp;the&nbsp;future. I think they would&nbsp;be&nbsp;proud now, to&nbsp;know that&nbsp;Kas is&nbsp;making a&nbsp;name for&nbsp;itself as&nbsp;a&nbsp;“must visit” Mediterranean destination in&nbsp;Turkey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutTour;
