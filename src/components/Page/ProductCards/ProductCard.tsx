import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.sass';

const ProductCard = memo((props: { date: string, location: string, src: string }) => {
  const { date, location, src } = props;
  return (
    <div className={`card ${styles.specific} ${styles.productCard} has-background-primary`}>
      <div className="card-image">
        <figure className="image is-16by9">
          <img
            src={src}
            alt={location}
          />
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
            to={`/directions/${location.toLocaleLowerCase().replace(', ', '-')}`}
          >
            Explore program
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
