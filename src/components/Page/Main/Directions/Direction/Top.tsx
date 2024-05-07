import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { Tour } from '../../../../../store/types/tour';
import Hoster, { Hosters } from '../../../common/Hoster';
import styles from '../../../Page.module.sass';
import ImagePreloader from '../../../common/ImagePreloader';
import useStore from '../../../../../store/store';

const Top = memo((props: { tour: Tour }) => {
  const { tour } = props;
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const imageId = tour.image_id;

  useEffect(() => {
    getImages(imageId);
  }, []);

  return (
    <section id="top" className={`hero is-medium is-background-white ${styles.specific} ${styles.first_screen} ${styles.directions}`}>
      {
        (allImages[imageId]) ? (
          <ImagePreloader
            className={styles.top_image}
            allImages={allImages}
            neededImages={[imageId]}
            sizes="100vw, 1280px"
            srcSet={[640, 1280, 1920]}
            alt={`${tour.country}, ${tour.place}`}
          />
        ) : (
          <div className={`${styles.top_image} is-skeleton`} />
        )
      }
      <div className="hero-body pl-3 pr-3 is-align-items-flex-start">
        <div className={`container is-max-widescreen ${styles.my_container}`}>
          <h1 className={`title ${styles.first_screen_title}`}>{`${tour.country}, ${tour.place}`}</h1>
          <h2 className="subtitle">A&nbsp;place you&apos;ll&nbsp;want to&nbsp;come back&nbsp;to. More&nbsp;than&nbsp;once</h2>
          <p className="buttons">
            <Link
              className="button is-primary has-text-white"
              to="./#booking"
            >
              <span>Book now</span>
            </Link>
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
