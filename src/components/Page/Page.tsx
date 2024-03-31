import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import styles from './Page.module.sass';
import firstScreen from '../../img/luke-porter-NEqEC7qa9FM-unsplash.jpg';
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
        <img className={styles.first_screen_image} src={firstScreen} alt="people are hiking" />
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
