/* eslint-disable max-len */
import { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { v4 as id } from 'uuid';

import type { QuestionAndAnswer } from '../../../../../../store/types/tour';
import styles from '../../../../Page.module.scss';
import useStore from '../../../../../../store/store';

const FAQItem = memo((props: QuestionAndAnswer) => {
  const { question, answer } = props;
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="card is-overflow-hidden">
      <header className="card-header has-background-primary has-text-white">
        <p className="card-header-title is-size-4 is-size-5-mobile p-5 has-text-white">{question}</p>
        <button
          className="card-header-icon is-size-4 is-size-5-mobile p-5"
          onClick={() => setIsOpened(!isOpened)}
          type="button"
        >
          <span className="icon">
            {
              (isOpened) ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )
            }
          </span>
        </button>
      </header>
      <div className={`card-content has-background-white ${styles.my_card_content} ${(isOpened) ? styles.opened : ''}`}>
        <div className="content">{answer}</div>
      </div>
    </div>
  );
});

const FAQ = memo(() => {
  const questionsAndAnswers = useStore((state) => state.questionsAndAnswers);
  const importQuestionsAndAnswers = useStore((state) => state.importQuestionsAndAnswers);

  useEffect(() => {
    if (!questionsAndAnswers.length) {
      importQuestionsAndAnswers();
    }
  }, []);

  return (
    <section id="faq" className={`hero ${styles.my_section}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-primary">FAQ</h1>
          {
            questionsAndAnswers.map((pair) => (
              <FAQItem key={id()} question={pair.question} answer={pair.answer} />
            ))
          }
        </div>
      </div>
    </section>
  );
});

export default FAQ;
