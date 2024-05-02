import { memo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

import type { Tour } from '../../../../../store/types/tour';
import Hoster, { Hosters } from '../../../common/Hoster';
import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';

const Top = memo((props: { tour: Tour }) => {
  const { tour } = props;
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);
  const imageId = tour.image_id;

  useEffect(() => {
    getImage(imageId);
  }, []);

  return (
    <section id="top" className={`hero is-medium is-background-white ${styles.specific} ${styles.first_screen} ${styles.directions}`}>
      {
        (image[imageId]) ? (
          <picture>
            <source
              srcSet={`${image[imageId].value}&auto=compress&fm=jpg&w=1280&crop=entropy&fit=clip 1280w,
                      ${image[imageId].value}&auto=compress&fm=jpg&w=1920&crop=entropy&fit=clip 1920w`}
              type="image/jpeg"
            />
            <img
              className={styles.first_screen_image}
              src={image[imageId].value}
              alt="people are hiking"
            />
          </picture>
        ) : (
          <img src={image.placeholder.value} className={styles.first_screen_image} alt={`${tour.country}, ${tour.place}`} />
        )
      }
      <div className="hero-body pl-3 pr-3 is-align-items-flex-start">
        <div className={`container is-max-widescreen ${styles.my_container}`}>
          <h1 className={`title ${styles.first_screen_title}`}>{`${tour.country}, ${tour.place}`}</h1>
          <h2 className="subtitle">A&nbsp;place you&apos;ll&nbsp;want to&nbsp;come back&nbsp;to. More&nbsp;than&nbsp;once</h2>
          <p className="buttons">
            <HashLink
              className="button is-primary has-text-white"
              smooth
              to="./#booking"
            >
              <span>Book now</span>
            </HashLink>
          </p>
          <div className={styles.hosted_directions}>
            <span>by</span>
            <Hoster hostedby={tour.hostedby as Hosters} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Top;
