import { memo, useEffect } from 'react';
import { v4 as id } from 'uuid';

import styles from '../../Page.module.sass';
import ProductCard from './ProductCard';
import useStore from '../../../../store/store';

const formatter = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);

const FeaturedProductCards = memo(() => {
  const randomTours = useStore((state) => state.randomTours);
  const getRandomTours = useStore((state) => state.getRandomTours);

  useEffect(() => {
    getRandomTours(3);
  }, []);

  return (
    <section id="featured" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">Featured variants</h1>
          <div className={`columns ${styles.my_columns}`}>
            {
              (randomTours.length) ? (
                randomTours.map((productCardData) => (
                  <div className="column is-one-third" key={id()}>
                    <ProductCard
                      date={`${formatter(productCardData.dates.start_date)} – ${formatter(productCardData.dates.end_date)}`}
                      location={`${productCardData.country}, ${productCardData.place}`}
                      src={productCardData.image_id}
                    />
                  </div>
                ))
              ) : ''
            }
          </div>
        </div>
      </div>
    </section>
  );
});

export default FeaturedProductCards;
