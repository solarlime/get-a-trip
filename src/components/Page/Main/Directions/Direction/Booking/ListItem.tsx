import { memo } from 'react';

import styles from '../../../../Page.module.scss';

const ListItem = memo((props: { first: string, second: string, isBold?: boolean }) => {
  const { first, second, isBold } = props;

  return (
    <div className={(isBold) ? styles.part__listItem_bold : styles.part__listItem}>
      <div className={styles.part__listItem__key}>
        <p>{first}</p>
      </div>
      <div className={styles.part__listItem__value}>
        <p>{`${second}$`}</p>
      </div>
    </div>
  );
});

export default ListItem;
