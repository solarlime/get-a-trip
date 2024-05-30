import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, ScrollRestoration, useLocation } from 'react-router-dom';

import styles from './Checkout.module.scss';
import Payment from './Payment/Payment';
import useStore from '../../store/store';

function Checkout() {
  const location = useLocation();
  const total = useStore((state) => state.total);
  const reset = useStore((state) => state.reset);

  return (
    <>
      <main className={`hero ${styles.customMain} is-fullheight`}>
        <div className="hero-body">
          <div className={`columns ${styles.content} container is-max-desktop`}>
            <section className="column">
              <button
                className="button block"
                type="button"
                onClick={reset}
              >
                <Link className={`is-small ${styles.customColorDark}`} to={(location?.state?.previousLocationPathname) ? location.state.previousLocationPathname : '/'}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  {' Back to Getatrip'}
                </Link>
              </button>
              <h2 className="subtitle is-4">Your total payment</h2>
              <h1 className="title is-1">{`${total}$`}</h1>
            </section>
            <Payment />
          </div>
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
}

export default Checkout;
