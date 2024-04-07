import { memo } from 'react';

import styles from '../../../Page.module.sass';
import useStore from '../../../../../store/store';
import InfoCard from './InfoCard';
import { formatter } from '../../../../../utils';

const InfoCards = memo(() => {
  const tour = useStore((state) => state.chosenTour);
  const date = `${formatter(tour.dates.start_date)} – ${formatter(tour.dates.end_date)}`;
  // @ts-ignore
  const duration = Math.floor((tour.dates.end_date - tour.dates.start_date) / 1000 / 60 / 60 / 24);

  return (
    <section id="about" className={`hero ${styles.my_section}`}>
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
                <InfoCard first="Cost" second="100$ per day" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default InfoCards;
