import { memo } from 'react';
import { v4 as id } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons/faHeartCrack';

import styles from '../../Page.module.sass';
import ProductCard from '../ProductCards/ProductCard';
import useStore from '../../../../store/store';

const Results = memo(() => {
  const filteredTours = useStore((state) => state.filteredTours);

  return (
    <section id="results" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          {
            (!filteredTours.isFilterRun) ? (
              <h1 className="title is-size-3 has-text-centered has-text-primary">Your results will be there</h1>
            ) : (
              (!filteredTours.tours.length) ? (
                <h1 className="title is-size-3 has-text-centered has-text-primary">
                  Nothing fits your preferences perfectly
                  {' '}
                  <FontAwesomeIcon className="has-text-danger" icon={faHeartCrack} />
                </h1>
              ) : (
                <>
                  <h1 className="title is-size-3 has-text-centered has-text-primary">Something fits your preferences!</h1>
                  <div className={`columns is-multiline ${styles.my_columns}`}>
                    {
                      filteredTours.tours.map((productCardData) => (
                        <div className="column is-one-third" key={id()}>
                          <ProductCard tour={productCardData} />
                        </div>
                      ))
                    }
                  </div>
                </>
              )
            )
          }
        </div>
      </div>
    </section>
  );
});

export default Results;
