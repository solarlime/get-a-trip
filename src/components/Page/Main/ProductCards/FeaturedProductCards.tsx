import { memo, useEffect } from 'react';
import { v4 as id } from 'uuid';

import styles from '../../Page.module.scss';
import ProductCard from './ProductCard';
import useStore from '../../../../store/store';

const FeaturedProductCards = memo(() => {
  const randomTours = useStore((state) => state.randomTours);
  const getRandomTours = useStore((state) => state.getRandomTours);

  useEffect(() => {
    getRandomTours(6);
  }, []);

  return (
    <section id="featured" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">Featured variants</h1>
          <div className={`columns ${styles.my_columns} is-multiline`}>
            {
              (randomTours.length) ? (
                randomTours.map((productCardData) => (
                  <div className={`column is-one-third ${styles.featuredCard}`} key={id()}>
                    <ProductCard tour={productCardData} />
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
