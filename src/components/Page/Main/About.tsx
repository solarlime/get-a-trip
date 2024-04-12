/* eslint-disable max-len */
import { memo, useEffect } from 'react';

import styles from '../Page.module.sass';
import useStore from '../../../store/store';

const About = memo(() => {
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);
  const imageId = 'AZMmUy2qL6A';

  useEffect(() => {
    getImage(imageId);
  }, []);

  return (
    <section id="about" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">What we are doing</h1>
          <div className={`columns ${styles.columns}`}>
            <div className="column is-7">
              <p className="block">
                Have you ever found yourself wanting to&nbsp;go somewhere but&nbsp;not&nbsp;wishing to&nbsp;choose a&nbsp;hotel or&nbsp;find travel companions? Or&nbsp;maybe you want something unusual. We understand and&nbsp;can&nbsp;help you!
              </p>
              <p className="block">
                We have collected a&nbsp;number of&nbsp;interesting destinations around the&nbsp;world for&nbsp;you. We&apos;ve already found the&nbsp;hotel you&apos;ll love. We&apos;ve also found a&nbsp;group of&nbsp;like-minded travelers you won&apos;t&nbsp;be&nbsp;bored with. Want to&nbsp;go with&nbsp;someone? No problem! Choose where you want to&nbsp;go, add&nbsp;the&nbsp;options you want, and&nbsp;we&apos;ll take care of&nbsp;your&nbsp;future rest!
              </p>
            </div>
            {
              (image[imageId]) ? (
                <picture className={`${styles.right_picture} column is-5`}>
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
                    className={`${styles.my_column}`}
                    src={image[imageId].value}
                    alt="people are sitting next to the fire"
                  />
                </picture>
              ) : (
                <img className={`column is-5 ${styles.my_column}`} src={image.placeholder.value} alt="people are sitting next to the fire" />
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
