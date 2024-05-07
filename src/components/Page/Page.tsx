import { memo } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const Page = memo(() => (
  <>
    <Header />
    <main className="has-background-white">
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </>
));

export default Page;
