/* eslint-disable max-len */
import { memo, useEffect } from 'react';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';
import ImagePreloader from '../common/ImagePreloader';
import Section from '../common/Section';

const About = memo(() => {
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const imageId = 'AZMmUy2qL6A';

  useEffect(() => {
    getImages(imageId);
  }, []);

  return (
    <Section id="about" classes={`is-primary ${styles.section_coloured}`}>
      <h1 className={`title ${styles.container__title}`}>What we are doing</h1>
      <div className={`columns ${styles.container__columns}`}>
        {
          (allImages[imageId]) ? (
            <div className={`${styles.columns__picture_right} column is-5`}>
              <ImagePreloader
                className={`${styles.picture__image}`}
                allImages={allImages}
                neededImages={[imageId]}
                sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, (max-width: 1300px) 500px, 1280px"
                srcSet={[320, 640, 960, 1280, 1920, 2560]}
                alt="people are sitting next to the fire"
              />
            </div>
          ) : (
            <div className={`${styles.picture__image} is-skeleton`} />
          )
        }
        <div className={`column is-7 ${styles.columns__text}`}>
          <p className="block">
            Have you ever found yourself wanting to&nbsp;go somewhere but&nbsp;not&nbsp;wishing to&nbsp;choose a&nbsp;hotel or&nbsp;find travel companions? Or&nbsp;maybe you want something unusual. We understand and&nbsp;can&nbsp;help you!
          </p>
          <p className="block">
            We have collected a&nbsp;number of&nbsp;interesting destinations around the&nbsp;world for&nbsp;you. We&apos;ve already found the&nbsp;hotel you&apos;ll love. We&apos;ve also found a&nbsp;group of&nbsp;like-minded travelers you won&apos;t&nbsp;be&nbsp;bored with. Want to&nbsp;go with&nbsp;someone? No problem! Choose where you want to&nbsp;go, add&nbsp;the&nbsp;options you want, and&nbsp;we&apos;ll take care of&nbsp;your&nbsp;future rest!
          </p>
        </div>
      </div>
    </Section>
  );
});

export default About;
