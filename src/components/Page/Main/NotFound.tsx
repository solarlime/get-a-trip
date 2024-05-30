import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';
import notfound from '../../../img/notfound.svg';

function NotFound() {
  return (
    <section className={`hero ${styles.section}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <div className={styles.container__content}>
            <h1 className={`title ${styles.container__content__title}`}>No way!</h1>
            <p className="block">There&apos;s no&nbsp;route for&nbsp;the&nbsp;direction you&apos;re&nbsp;looking&nbsp;for. But&nbsp;you&nbsp;can&nbsp;find some&nbsp;others!</p>
            <p className="buttons">
              <Link
                className={`button ${styles.customColorWhite} is-primary`}
                to="/directions"
              >
                <span>Find your tour now</span>
              </Link>
            </p>
          </div>
        </div>
        <img className={styles.section__body__image} src={notfound} alt="404: Not found" />
      </div>
    </section>
  );
}

export default NotFound;
