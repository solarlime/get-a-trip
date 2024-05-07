import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.sass';
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
    <section className={`hero is-fullheight is-background-white ${styles.specific} ${styles.first_screen}`}>
      {
        (allImages[imageId]) ? (
          <ImagePreloader
            className={`${styles.top_image} ${styles.first_screen_image}`}
            allImages={allImages}
            neededImages={[imageId]}
            sizes="(min-aspect-ratio: 1.5) 100vw, (max-aspect-ratio: 1.49) 150vh, 1280px"
            srcSet={[320, 640, 960, 1280, 1920, 2560]}
            alt="view from balcony"
          />
        ) : (
          <div className={`${styles.top_image} is-skeleton`} />
        )
      }
      <div className="hero-body pl-3 pr-3 is-align-items-flex-start">
        <div className="container is-max-widescreen">
          <h1 className={`title ${styles.first_screen_title}`}>From a&nbsp;small trip to&nbsp;a&nbsp;big adventure</h1>
          <p className="buttons">
            <Link
              className="button is-primary has-text-white"
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
