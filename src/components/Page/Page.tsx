import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import styles from './Page.module.sass';
import firstScreen1280 from '../../img/firstScreen1280.jpg';
import firstScreen2560 from '../../img/firstScreen2560.jpg';
import FeaturedProductCards from './ProductCards/FeaturedProductCards';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';

const Page = memo(() => (
  <>
    <Header />
    <main className="has-background-white">
      <section className={`hero is-fullheight is-background-grey-lighter ${styles.specific} ${styles.first_screen}`}>
        <picture>
          <source
            srcSet={`${firstScreen1280} 1280w, ${firstScreen2560} 2560w`}
            type="image/jpeg"
          />
          <img
            className={styles.first_screen_image}
            src={firstScreen2560}
            alt="people are hiking"
          />
        </picture>
        <div className="hero-body pl-3 pr-3 is-align-items-flex-start">
          <div className="container is-max-widescreen">
            <h1 className={`title ${styles.first_screen_title}`}>From a&nbsp;small trip to&nbsp;a&nbsp;big adventure</h1>
            <p className="buttons">
              <Link
                className="button is-primary is-outlined has-background-white"
                to="/directions"
              >
                <span>Explore tours</span>
              </Link>
              <HashLink
                className="button is-primary has-text-white"
                smooth
                to="/#search"
              >
                <span>Find your tour now</span>
              </HashLink>
            </p>
          </div>
        </div>
      </section>
      <Search />
      <About />
      <FeaturedProductCards />
      <div className="has-text-centered">
        Checkout page is
        {' '}
        <Link to="./checkout">here</Link>
      </div>
    </main>
    <Footer />
  </>
));

export default Page;
