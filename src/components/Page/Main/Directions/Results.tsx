import { memo } from 'react';
import { v4 as id } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons/faHeartCrack';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import ProductCard from '../ProductCards/ProductCard';
import Section from '../../common/Section';

const Results = memo(() => {
  const filteredTours = useStore((state) => state.filteredTours);

  return (
    <Section id="results">
      {
        (!filteredTours.isFilterRun) ? (
          <h1 className={`title ${styles.container__title} ${styles.resultsTitle}`}>Your results will be there</h1>
        ) : (
          (!filteredTours.tours.length) ? (
            <h1 className={`title ${styles.container__title} ${styles.resultsTitle}`}>
              Nothing fits your preferences perfectly
              {' '}
              <FontAwesomeIcon className={styles.colorDanger} icon={faHeartCrack} />
            </h1>
          ) : (
            <>
              <h1 className={`title ${styles.container__title} ${styles.resultsTitle}`}>Something fits your preferences!</h1>
              <div className={`columns is-multiline ${styles.container__columns_cards}`}>
                {
                  filteredTours.tours.map((productCardData) => (
                    <div className={`column ${styles.cardContainer} is-one-third`} key={id()}>
                      <ProductCard tour={productCardData} />
                    </div>
                  ))
                }
              </div>
            </>
          )
        )
      }
    </Section>
  );
});

export default Results;
