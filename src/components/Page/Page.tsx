import { memo } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import styles from './Page.module.scss';

const Page = memo(() => (
  <>
    <Header />
    <main className={styles.customMain}>
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </>
));

export default Page;
