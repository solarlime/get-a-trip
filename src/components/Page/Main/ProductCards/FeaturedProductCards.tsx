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
    <section id="featured" className={`hero ${styles.section}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <h1 className={`title ${styles.container__title}`}>Featured variants</h1>
          <div className={`columns ${styles.container__columns_cards} is-multiline`}>
            {
              (randomTours.length) ? (
                randomTours.map((productCardData) => (
                  <div className={`column ${styles.cardContainer} is-one-third ${styles.cardContainer_featured}`} key={id()}>
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
