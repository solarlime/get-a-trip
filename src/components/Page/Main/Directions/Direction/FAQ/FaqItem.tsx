import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import type { QuestionAndAnswer } from '../../../../../../store/types/tour';
import styles from '../../../../Page.module.scss';

type State = {
  isOpened: boolean,
  setOpened: (newValue: string | ((previous: string) => string)) => void
};

const FaqItem = memo((props: { id: string } & QuestionAndAnswer & State) => {
  const {
    id, question, answer, isOpened, setOpened,
  } = props;

  return (
    <div id={id} className={`card ${styles.faqItem}`}>
      <header className={`card-header ${styles.faqItem__header}`}>
        <p className={`card-header-title ${styles.faqItem__header__text}`}>{question}</p>
        <button
          className={`card-header-icon ${styles.faqItem__header__text}`}
          onClick={() => setOpened((previous) => ((previous !== id) ? id : ''))}
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
        <div>{answer}</div>
      </div>
    </div>
  );
});

export default FaqItem;
