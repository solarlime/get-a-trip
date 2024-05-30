import { memo } from 'react';
import type { ReactNode } from 'react';

import styles from '../../../../Page.module.scss';

const InfoCard = memo((props: { first: string, second?: string, children?: ReactNode }) => {
  const { first, second, children } = props;
  return (
    <div className={`column ${styles.cardContainer}`}>
      <div className={`card ${styles.card}`}>
        <div className="card-content">
          <div className="media">
            <div className={`media-content ${styles.card__content}`}>
              <p className={`${styles.card__content__title} title is-4`}>{first}</p>
              <p className={`${styles.customColorWhite} subtitle is-6`}>
                {(!second) ? children : second}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InfoCard;
