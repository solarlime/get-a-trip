/* eslint-disable max-len */
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
      <h1 className={`title ${styles.container__title} ${styles.resultsTitle}`}>
        {
          (!filteredTours.isFilterRun)
            ? (<>Your&nbsp;results will&nbsp;be there</>) : (!filteredTours.tours.length && !filteredTours.proposals.length)
              ? (
                <>
                  Nothing fits your&nbsp;preferences
                  {' '}
                  <FontAwesomeIcon className={styles.customColorDanger} icon={faHeartCrack} />
                </>
              )
              : (!filteredTours.tours.length && filteredTours.proposals.length)
                ? (<>Nothing fits your&nbsp;preferences, but&nbsp;these&nbsp;variants are&nbsp;close to&nbsp;it</>)
                : (<>Something fits your&nbsp;preferences!</>)
        }
      </h1>
      {
        (filteredTours.tours.length || filteredTours.proposals.length) ? (
          <div className={`columns is-multiline ${styles.container__columns_cards}`}>
            {
              (filteredTours.tours.length) ? (
                filteredTours.tours.map((productCardData) => (
                  <div className={`column ${styles.cardContainer} is-one-third`} key={id()}>
                    <ProductCard tour={productCardData} />
                  </div>
                ))
              ) : (
                filteredTours.proposals.map((productCardData) => (
                  <div className={`column ${styles.cardContainer} is-one-third`} key={id()}>
                    <ProductCard tour={productCardData} />
                  </div>
                ))
              )
            }
          </div>
        ) : ''
      }
    </Section>
  );
});

export default Results;
