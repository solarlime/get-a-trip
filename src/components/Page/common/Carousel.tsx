/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  memo, useEffect, useState, useRef, MutableRefObject, useCallback,
} from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Page.module.scss';
import useStore from '../../../store/store';
import ImagePreloader from './ImagePreloader';

const Carousel = memo((props: { imageLocation: 'left' | 'right', pictures?: Array<string> }) => {
  const { imageLocation, pictures: imageFromProps } = props;
  const tour = useStore((state) => state.chosenTour);
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const [neededImages, setNeededImages] = useState(imageFromProps);
  const [shown, setShown] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const shownRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const stableStorageRef = useRef({ inProgress: false });

  const updateDisabled = useCallback((buttonState: boolean) => setIsDisabled(buttonState), []);

  useEffect(() => {
    if (!neededImages) {
      setNeededImages(tour.carousel);
    } else {
      Promise
        .all(neededImages.map((imageId) => getImages(imageId)))
        .then(() => setShown(0));
    }
  }, [neededImages]);

  return (
    <div
      className={`column is-5 ${styles.carousel} ${(imageLocation === 'left') ? styles.columns__picture_left : styles.columns__picture_right}`}
      data-testid="carousel"
    >
      <div className={styles.carousel__content}>
        {
          // @ts-ignore
          (neededImages && allImages[neededImages[shown]])
            ? (
              <ImagePreloader
                className={`${styles.picture__image} ${styles.appear}`}
                allImages={allImages}
                neededImages={neededImages}
                sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, (max-width: 1300px) 500px, 1280px"
                srcSet={[320, 640, 960, 1280, 1920, 2560]}
                alt={`${tour.country}, ${tour.place}`}
                shown={shown}
                updateDisabled={updateDisabled}
                ref={shownRef}
              />
            ) : (
              <div className={`${styles.picture__image} is-skeleton`} />
            )
        }
      </div>
      <div className={styles.carousel__buttons}>
        <button
          className="button"
          type="button"
          disabled={isDisabled}
          onClick={() => {
            if (!stableStorageRef.current.inProgress) {
              stableStorageRef.current.inProgress = true;
              (shownRef.current as unknown as HTMLImageElement).classList.add(styles.disappear);
              const timeout = setTimeout(() => {
                clearTimeout(timeout);
                stableStorageRef.current.inProgress = false;
                setShown((previous) => (
                  (previous === 0) ? tour.carousel.length - 1 : previous - 1));
              }, 500);
            }
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </button>
        <button
          className="button"
          type="button"
          disabled={isDisabled}
          onClick={() => {
            if (!stableStorageRef.current.inProgress) {
              stableStorageRef.current.inProgress = true;
              (shownRef.current as unknown as HTMLImageElement).classList.add(styles.disappear);
              const timeout = setTimeout(() => {
                clearTimeout(timeout);
                stableStorageRef.current.inProgress = false;
                setShown((previous) => (
                  (previous === tour.carousel.length - 1) ? 0 : previous + 1));
              }, 500);
            }
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </div>
  );
});

export default Carousel;
