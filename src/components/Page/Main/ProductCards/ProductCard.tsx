import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { Tour } from '../../../../store/types/tour';
import Hoster, { Hosters } from '../../common/Hoster';
import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import ImagePreloader from '../../common/ImagePreloader';
import { formatter } from '../../../../utils';

const ProductCard = memo((props: { tour: Tour }) => {
  const { tour } = props;
  const allImages = useStore((state) => state.images);
  const getImages = useStore((state) => state.getImages);
  const setChosenTour = useStore((state) => state.setChosenTour);

  const src = tour.image_id;
  const { date: startDate, year } = formatter(tour.dates.start_date);
  const date = `${startDate} – ${formatter(tour.dates.end_date).date}`;
  const location = `${tour.country}, ${tour.place}`;
  const { left } = tour;

  useEffect(() => {
    getImages(src);
  }, []);

  return (
    <div className={`card ${styles.card}`}>
      <div className="card-image">
        <span className={`button is-static ${styles.card__label_left}`}>{`${left} place${(left === 1) ? '' : 's'} left`}</span>
        <div className={`button is-static ${styles.card__label_hosted}`}>
          <span>by</span>
          <Hoster hostedby={tour.hostedby as Hosters} />
        </div>
        <figure className="image is-16by9">
          {
            (allImages[src]) ? (
              <ImagePreloader
                className={styles.card__image}
                allImages={allImages}
                neededImages={[src]}
                sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, 320px"
                srcSet={[320, 640, 960, 1280, 1920]}
                alt={location}
              />
            ) : (
              <div className={`${styles.card__image} is-skeleton`} />
            )
          }
        </figure>
      </div>
      <div className="card-content">
        <div className="block">
          <div className={styles.card__content}>
            <p className={`${styles.card__content__title} title is-4`}>{date}</p>
            <p className={`${styles.customColorWhite} subtitle is-6`}>{location}</p>
          </div>
        </div>

        <div>
          <Link
            className={`button ${styles.customColorGreen} is-white`}
            data-testid="test-direction"
            to={`/directions/${location.toLocaleLowerCase()
              .replace(', ', '-')
              .replace(' ', '-')}-${year}-${startDate.replace(/ /i, '-')}#top`}
            onClick={() => setChosenTour(tour)}
          >
            Explore program
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
