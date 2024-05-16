/* eslint-disable max-len */
import { memo, useEffect } from 'react';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';
import ImagePreloader from '../common/ImagePreloader';

const About = memo(() => {
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const imageId = 'AZMmUy2qL6A';

  useEffect(() => {
    getImages(imageId);
  }, []);

  return (
    <section id="about" className={`hero is-primary ${styles.my_section} ${styles.my_section_coloured}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-white">What we are doing</h1>
          <div className={`columns has-text-white ${styles.columns}`}>
            <div className="column is-7">
              <p className="block">
                Have you ever found yourself wanting to&nbsp;go somewhere but&nbsp;not&nbsp;wishing to&nbsp;choose a&nbsp;hotel or&nbsp;find travel companions? Or&nbsp;maybe you want something unusual. We understand and&nbsp;can&nbsp;help you!
              </p>
              <p className="block">
                We have collected a&nbsp;number of&nbsp;interesting destinations around the&nbsp;world for&nbsp;you. We&apos;ve already found the&nbsp;hotel you&apos;ll love. We&apos;ve also found a&nbsp;group of&nbsp;like-minded travelers you won&apos;t&nbsp;be&nbsp;bored with. Want to&nbsp;go with&nbsp;someone? No problem! Choose where you want to&nbsp;go, add&nbsp;the&nbsp;options you want, and&nbsp;we&apos;ll take care of&nbsp;your&nbsp;future rest!
              </p>
            </div>
            {
              (allImages[imageId]) ? (
                <div className={`${styles.right_picture} column is-5`}>
                  <ImagePreloader
                    className={`${styles.my_image}`}
                    allImages={allImages}
                    neededImages={[imageId]}
                    sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, (max-width: 1300px) 500px, 1280px"
                    srcSet={[320, 640, 960, 1280, 1920, 2560]}
                    alt="people are sitting next to the fire"
                  />
                </div>
              ) : (
                <div className={`${styles.my_image} is-skeleton`} />
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
