/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  memo, useEffect, useState, useRef,
} from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';

const Carousel = memo((props: { imageLocation: 'left' | 'right', pictures?: Array<string> }) => {
  const { imageLocation, pictures: imageFromProps } = props;
  const tour = useStore((state) => state.chosenTour);
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);
  const [resultImage, setResultImage] = useState(imageFromProps);
  const [shown, setShown] = useState(0);
  const shownRef = useRef(null);

  useEffect(() => {
    if (!resultImage) {
      setResultImage(tour.carousel);
    } else {
      Promise
        .all(resultImage.map((imageId) => getImage(imageId)))
        .then(() => setShown(0));
    }
  }, [resultImage]);

  return (
    <div className={`column is-5 ${styles.my_carousel} ${(imageLocation === 'left') ? styles.left_picture : styles.right_picture}`}>
      <picture>
        {
          // @ts-ignore
          (resultImage && image[resultImage[shown]])
            ? (
              <>
                <source
                  srcSet={`${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=320&crop=entropy&fit=clip 320w,
                              ${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=640&crop=entropy&fit=clip 640w,
                              ${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=960&crop=entropy&fit=clip 960w,
                              ${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=1280&crop=entropy&fit=clip 1280w,
                              ${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=1920&crop=entropy&fit=clip 1920w,
                              ${image[resultImage[shown]].value}&auto=compress&fm=jpg&w=2560&crop=entropy&fit=clip 2560w`}
                  sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, (max-width: 1300px) 500px, 1280px"
                  type="image/jpeg"
                />
                <img
                  className={`${styles.my_column} ${styles.appear}`}
                  src={image[resultImage[shown]].value}
                  alt={`${tour.country}, ${tour.place}`}
                  ref={shownRef}
                  onLoad={(event) => {
                    (event.target as HTMLImageElement).classList.remove(styles.disappear);
                  }}
                />
              </>
            ) : (
              <img className={`${styles.my_column}`} src={image.placeholder.value} alt="placeholder" ref={shownRef} />
            )
        }
      </picture>
      <div className={styles.my_carousel_buttons}>
        <button
          className="button"
          type="button"
          onClick={() => {
            (shownRef.current as unknown as HTMLImageElement).classList.add(styles.disappear);
            setTimeout(() => {
              setShown((previous) => (
                (previous === 0) ? tour.carousel.length - 1 : previous - 1));
            }, 500);
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </button>
        <button
          className="button"
          type="button"
          onClick={() => {
            (shownRef.current as unknown as HTMLImageElement).classList.add(styles.disappear);
            setTimeout(() => {
              setShown((previous) => (
                (previous === tour.carousel.length - 1) ? 0 : previous + 1));
            }, 500);
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
