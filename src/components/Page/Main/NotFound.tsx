import { Link } from 'react-router-dom';

import styles from '../Page.module.scss';
import notfound from '../../../img/notfound.svg';

function NotFound() {
  return (
    <section className={`hero is-background-white ${styles.not_found}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.not_found_body}`}>
        <div className="container is-max-widescreen is-flex is-flex-direction-column is-justify-content-center">
          <div className={styles.not_found_content}>
            <h1 className={`title ${styles.not_found_title}`}>No way!</h1>
            <p className="content">There&apos;s no&nbsp;route for&nbsp;the&nbsp;direction you&apos;re&nbsp;looking&nbsp;for. But&nbsp;you&nbsp;can&nbsp;find some&nbsp;others!</p>
            <p className="buttons">
              <Link
                className="button is-primary has-text-white"
                to="/directions"
              >
                <span>Find your tour now</span>
              </Link>
            </p>
          </div>
        </div>
        <img className={styles.not_found_img} src={notfound} alt="404: Not found" />
      </div>
    </section>
  );
}

export default NotFound;
