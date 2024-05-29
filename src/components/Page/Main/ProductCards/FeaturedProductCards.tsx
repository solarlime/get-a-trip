import { memo, useEffect } from 'react';
import { v4 as id } from 'uuid';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import ProductCard from './ProductCard';
import Section from '../../common/Section';

const FeaturedProductCards = memo(() => {
  const randomTours = useStore((state) => state.randomTours);
  const getRandomTours = useStore((state) => state.getRandomTours);

  useEffect(() => {
    getRandomTours(6);
  }, []);

  return (
    <Section id="featured">
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
    </Section>
  );
});

export default FeaturedProductCards;
