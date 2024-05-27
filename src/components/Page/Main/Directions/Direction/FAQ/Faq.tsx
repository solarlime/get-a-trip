import {
  memo, useEffect, useMemo, useState,
} from 'react';
import { v4 as id } from 'uuid';

import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';
import FaqItem from './FaqItem';

const idsArray = (length: number) => [...Array(length)].map(() => id());

const Faq = memo(() => {
  const questionsAndAnswers = useStore((state) => state.questionsAndAnswers);
  const importQuestionsAndAnswers = useStore((state) => state.importQuestionsAndAnswers);
  const [opened, setOpened] = useState('');
  const ids = useMemo(() => idsArray(questionsAndAnswers.length), [questionsAndAnswers]);

  useEffect(() => {
    if (!questionsAndAnswers.length) {
      importQuestionsAndAnswers();
    }
  }, []);

  return (
    <section id="faq" className={`hero ${styles.section}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <h1 className={`title ${styles.container__title}`}>FAQ</h1>
          {
            questionsAndAnswers.map((pair, i) => (
              <FaqItem
                key={ids[i]}
                id={ids[i]}
                question={pair.question}
                answer={pair.answer}
                isOpened={(opened === ids[i])}
                setOpened={setOpened}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
});

export default Faq;
