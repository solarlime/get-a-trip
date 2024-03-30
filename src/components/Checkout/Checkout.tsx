import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Payment from './Payment/Payment';
import useStore from '../../store/store';

function Checkout() {
  const reset = useStore((state) => state.reset);

  return (
    <main className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container is-max-desktop">
          <section className="column">
            <button
              className="button block"
              type="button"
              onClick={reset}
            >
              <Link className="is-small has-text-dark" to="/">
                <FontAwesomeIcon icon={faArrowLeft} />
                {' Back to Getatrip'}
              </Link>
            </button>
            <h1 className="title is-4 has-text-weight-normal">Your total payment</h1>
            <h2 className="subtitle is-1 has-text-weight-semibold">$300</h2>
          </section>
          <Payment />
        </div>
      </div>
    </main>
  );
}

export default Checkout;
