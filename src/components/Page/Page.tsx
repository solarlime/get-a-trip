import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const Page = memo(() => (
  <>
    <Header />
    <main className="has-background-white">
      <Outlet />
    </main>
    <Footer />
  </>
));

export default Page;
