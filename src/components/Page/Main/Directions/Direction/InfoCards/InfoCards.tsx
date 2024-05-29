import { memo } from 'react';

import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';
import InfoCard from './InfoCard';
import Section from '../../../../common/Section';
import { formatter } from '../../../../../../utils';

const InfoCards = memo(() => {
  const tour = useStore((state) => state.chosenTour);
  const { date: startDate, year } = formatter(tour.dates.start_date);
  const date = `${startDate} – ${formatter(tour.dates.end_date).date}`;
  const { duration } = tour.dates;

  return (
    <Section id="infocards">
      <div className={`columns ${styles.infoCards} is-multiline`}>
        <div className={`column ${styles.infoCards__block} is-half`}>
          <div className="columns">
            <InfoCard first="When" second={`${year}: ${date}`} />
            <InfoCard first="How long" second={`${duration} day${(!duration.toString().endsWith('1')) ? 's' : ''}`} />
          </div>
        </div>
        <div className={`column ${styles.infoCards__block} is-half`}>
          <div className="columns">
            <InfoCard first="Where">
              <a className={styles.infoCard__child} href={tour.accommodation} rel="noreferrer" target="_blank">See hotel</a>
            </InfoCard>
            <InfoCard first="Cost" second={`From ${tour.basicPrice}$/day`} />
          </div>
        </div>
      </div>
    </Section>
  );
});

export default InfoCards;
