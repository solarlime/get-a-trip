import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { Tour } from '../../../../store/types/tour';
import Hoster, { Hosters } from '../../common/Hoster';
import styles from '../../Page.module.sass';
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
    <div className={`card ${styles.specific} ${styles.productCard} has-background-primary`}>
      <div className="card-image">
        <span className={`button is-static has-text-black has-background-white ${styles.left}`}>{`${left} place${(left === 1) ? '' : 's'} left`}</span>
        <div className={`button is-static has-background-primary has-text-white is-gap-1 ${styles.hosted}`}>
          <span>by</span>
          <Hoster hostedby={tour.hostedby as Hosters} />
        </div>
        <figure className="image is-16by9">
          {
            (allImages[src]) ? (
              <ImagePreloader
                className={styles.my_image}
                allImages={allImages}
                neededImages={[src]}
                sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, 320px"
                srcSet={[320, 640, 960, 1280, 1920]}
                alt={location}
              />
            ) : (
              <div className={`${styles.my_image} is-skeleton`} />
            )
          }
        </figure>
      </div>
      <div className="card-content has-text-white">
        <div className="media">
          <div className={`media-content ${styles.my_media_content}`}>
            <p className="title is-4 pb-3 has-text-white">{date}</p>
            <p className="subtitle is-6 has-text-white">{location}</p>
          </div>
        </div>

        <div className="content">
          <Link
            className="button is-white has-text-primary is-size-6"
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
