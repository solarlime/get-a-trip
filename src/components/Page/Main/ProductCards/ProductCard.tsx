import { memo, useEffect, ReactElement } from 'react';
import { HashLink } from 'react-router-hash-link';

import type { Tour } from '../../../../store/types/tour';
import styles from '../../Page.module.sass';
import useStore from '../../../../store/store';
import { formatter } from '../../../../utils';
import Resorterra from './Hosters/Resorterra';
import Tripanyday from './Hosters/Tripanyday';
import Whatatravel from './Hosters/Whatatravel';

type Hosters = 'resorterra' | 'tripanyday' | 'whatatravel';
const hosters: { [key in Hosters]: ReactElement } = {
  resorterra: <Resorterra />, tripanyday: <Tripanyday />, whatatravel: <Whatatravel />,
};

const ProductCard = memo((props: { tour: Tour }) => {
  const { tour } = props;
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);
  const setChosenTour = useStore((state) => state.setChosenTour);

  const src = tour.image_id;
  const date = `${formatter(tour.dates.start_date)} – ${formatter(tour.dates.end_date)}`;
  const location = `${tour.country}, ${tour.place}`;
  const { left } = tour;

  useEffect(() => {
    // TODO: image caching
    getImage(src);
  }, []);

  return (
    <div className={`card ${styles.specific} ${styles.productCard} has-background-primary`}>
      <div className="card-image">
        <span className={`button is-static has-text-black has-background-white ${styles.left}`}>{`${left} place${(left === 1) ? '' : 's'} left`}</span>
        <div className={`button is-static has-background-primary has-text-white is-gap-1 ${styles.hosted}`}>
          <span>by</span>
          {
            (tour.hostedby)
              ? hosters[tour.hostedby as Hosters] : <Resorterra />
          }
        </div>
        <figure className="image is-16by9">
          {
            (image[src]) ? (
              <picture className="column is-5">
                <source
                  srcSet={`${image[src].value}&auto=compress&fm=jpg&w=320&crop=entropy&fit=clip 320w,
                      ${image[src].value}&auto=compress&fm=jpg&w=640&crop=entropy&fit=clip 640w,
                      ${image[src].value}&auto=compress&fm=jpg&w=960&crop=entropy&fit=clip 960w,
                      ${image[src].value}&auto=compress&fm=jpg&w=1280&crop=entropy&fit=clip 1280w,
                      ${image[src].value}&auto=compress&fm=jpg&w=1920&crop=entropy&fit=clip 1920w`}
                  sizes="(max-width: 320px) 320px, (max-width: 768px) 640px, 320px"
                  type="image/jpeg"
                />
                <img src={image[src].value} alt={location} />
              </picture>
            ) : (
              <img src={image.placeholder.value} alt={location} />
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
          <HashLink
            className="button is-white has-text-primary is-size-6"
            to={`/directions/${location.toLocaleLowerCase()
              .replace(', ', '-')
              .replace(' ', '-')}#top`}
            onClick={() => setChosenTour(tour)}
            smooth={false}
          >
            Explore program
          </HashLink>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
