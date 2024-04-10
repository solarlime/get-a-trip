import { memo } from 'react';
import type { ReactNode } from 'react';

import styles from '../../../../Page.module.sass';

const InfoCard = memo((props: { first: string, second: string, children?: ReactNode }) => {
  const { first, second, children } = props;
  return (
    <div className="column">
      <div className={`card ${styles.specific} ${styles.productCard} has-background-primary`}>
        <div className="card-content has-text-white">
          <div className="media">
            <div className={`media-content ${styles.my_media_content}`}>
              <p className="title is-4 pb-3 has-text-white">{first}</p>
              <p className="subtitle is-6 has-text-white">
                {(second === '') ? children : second}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InfoCard;
