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
    <div className={`card ${styles.faqItem}`}>
      <header className={`card-header ${styles.faqItem__header}`}>
        <p className={`card-header-title ${styles.faqItem__header__text}`}>{question}</p>
        <button
          className={`card-header-icon ${styles.faqItem__header__text}`}
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
      <div className={`card-content ${styles.faqItem__content_default} ${(isOpened) ? styles.faqItem__content_opened : ''}`}>
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
    <section id="faq" className={`hero ${styles.section}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <h1 className={`title ${styles.container__title}`}>FAQ</h1>
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
