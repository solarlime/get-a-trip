/* eslint-disable max-len */
import { memo, ReactNode } from 'react';

import styles from '../Page.module.scss';

const Section = memo((props: { id: string, classes?: string, children: ReactNode }) => {
  const { id, classes, children } = props;

  return (
    <section id={id} className={`hero ${styles.section} ${classes}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          {children}
        </div>
      </div>
    </section>
  );
});

export default Section;
