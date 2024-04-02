import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Page.module.sass';
import useStore from '../../../store/store';

const ProductCard = memo((props: { date: string, location: string, src: string }) => {
  const { date, location, src } = props;
  const image = useStore((state) => state.image);
  const getImage = useStore((state) => state.getImage);

  useEffect(() => {
    getImage(src);
  }, []);

  return (
    <div className={`card ${styles.specific} ${styles.productCard} has-background-primary`}>
      <div className="card-image">
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
