import { memo } from 'react';

import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';
import InfoCard from './InfoCard';
import { formatter } from '../../../../../utils';

const InfoCards = memo(() => {
  const tour = useStore((state) => state.chosenTour);
  const date = `${formatter(tour.dates.start_date)} – ${formatter(tour.dates.end_date)}`;
  const { duration } = tour.dates;

  return (
    <section id="infocards" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <div className="columns is-multiline">
            <div className="column is-half">
              <div className={`columns ${styles.my_columns} ${styles.specific}`}>
                <InfoCard first="When" second={date} />
                <InfoCard first="How long" second={`${duration} days`} />
              </div>
            </div>
            <div className="column is-half">
              <div className={`columns ${styles.my_columns} ${styles.specific}`}>
                <InfoCard first="Where" second="">
                  <a className="has-text-white is-underlined" href={tour.accommodation} rel="noreferrer" target="_blank">See hotel</a>
                </InfoCard>
                <InfoCard first="Cost" second="From 100$/day" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default InfoCards;
