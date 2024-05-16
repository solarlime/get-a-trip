import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { Tour } from '../../../../../store/types/tour';
import Hoster, { Hosters } from '../../../common/Hoster';
import styles from '../../../Page.module.scss';
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
    <section id="top" className={`${styles.firstScreen} ${styles.directions} hero is-medium`}>
      {
        (allImages[imageId]) ? (
          <ImagePreloader
            className={styles.topImage}
            allImages={allImages}
            neededImages={[imageId]}
            sizes="100vw, 1280px"
            srcSet={[640, 1280, 1920]}
            alt={`${tour.country}, ${tour.place}`}
          />
        ) : (
          <div className={`${styles.topImage} is-skeleton`} />
        )
      }
      <div className={`hero-body ${styles.firstScreen__content}`}>
        <div className={`container is-max-widescreen ${styles.directions__content}`}>
          <h1 className={`title ${styles.firstScreen__content__title}`}>{`${tour.country}, ${tour.place}`}</h1>
          <h2 className="subtitle">A&nbsp;place you&apos;ll&nbsp;want to&nbsp;come back&nbsp;to. More&nbsp;than&nbsp;once</h2>
          <p className="buttons">
            <Link
              className={`button ${styles.colorWhite} is-primary`}
              to="./#booking"
            >
              <span>Book now</span>
            </Link>
          </p>
          <div className={styles.directions__content__hosted}>
            <span>by</span>
            <Hoster hostedby={tour.hostedby as Hosters} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Top;
