import {
  memo, useEffect, useMemo, useState,
} from 'react';
import { v4 as id } from 'uuid';

import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';
import FaqItem from './FaqItem';
import Section from '../../../../common/Section';

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
    <Section id="faq">
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
    </Section>
  );
});

export default Faq;
