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
              <Link
                className={`button block ${styles.customColorDark}`}
                to={(location?.state?.previousLocationPathname) ? location.state.previousLocationPathname : '/'}
                onClick={reset}
                data-testid="back_button"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>&nbsp;Back to Getatrip</span>
              </Link>
              <h2 className={`${styles.content__left__subtitle} subtitle is-4`}>Your total payment</h2>
              <h1 className="title is-1" data-testid="Checkout_value">{`${total}$`}</h1>
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
