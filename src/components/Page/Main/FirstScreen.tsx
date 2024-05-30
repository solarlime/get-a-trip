import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';
import ImagePreloader from '../common/ImagePreloader';

function FirstScreen() {
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const imageId = 'V0aDN1O-52Y';

  useEffect(() => {
    getImages(imageId);
  }, []);

  return (
    <section className={`${styles.firstScreen} hero is-fullheight`}>
      {
        (allImages[imageId]) ? (
          <ImagePreloader
            className={`${styles.topImage} ${styles.firstScreen__image}`}
            allImages={allImages}
            neededImages={[imageId]}
            sizes="(min-aspect-ratio: 1.5) 100vw, (max-aspect-ratio: 1.49) 150vh, 1280px"
            srcSet={[320, 640, 960, 1280, 1920, 2560]}
            alt="view from balcony"
          />
        ) : (
          <div className={`${styles.topImage} is-skeleton`} />
        )
      }
      <div className={`hero-body ${styles.firstScreen__content}`}>
        <div className="container is-max-widescreen">
          <h1 className={`title ${styles.firstScreen__content__title}`}>From a&nbsp;small trip to&nbsp;a&nbsp;big adventure</h1>
          <p className="buttons">
            <Link
              className={`${styles.customColorWhite} button is-primary`}
              to="/directions#search"
            >
              <span>Find your tour now</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default FirstScreen;
