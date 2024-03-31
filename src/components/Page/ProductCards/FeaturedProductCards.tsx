import { memo } from 'react';
import { v4 as id } from 'uuid';

import styles from '../Page.module.sass';
import turkeyKas from '../../../img/denis-volkov-t8PJ2CibOvw-unsplash.jpg';
import brazilFlorianapolis from '../../../img/agustin-diaz-gargiulo-7F65HDP0-E0-unsplash.jpg';
import portugalMadeira from '../../../img/tim-roosjen-4DXo5wrZaus-unsplash.jpg';
import ProductCard from './ProductCard';

const FeaturedProductCards = memo(() => {
  const directions = [
    { date: 'Dec 01 - Dec 30', location: 'Turkey, Kas', src: turkeyKas },
    { date: 'Dec 10 - Jan 10', location: 'Brazil, Florianapolis', src: brazilFlorianapolis },
    { date: 'Dec 01 - Dec 25', location: 'Portugal, Madeira', src: portugalMadeira },
  ];

  return (
    <section id="featured" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">Featured variants</h1>
          <div className={`columns ${styles.my_columns}`}>
            {
              directions.map((productCardData) => (
                <div className="column is-one-third" key={id()}>
                  <ProductCard
                    date={productCardData.date}
                    location={productCardData.location}
                    src={productCardData.src}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
});

export default FeaturedProductCards;
