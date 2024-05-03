import { memo } from 'react';
import FeaturedProductCards from './ProductCards/FeaturedProductCards';
import About from './About';
import Search from './Search/Search';
import FirstScreen from './FirstScreen';

const Main = memo(() => (
  <>
    <FirstScreen />
    <Search title="Choose and buy tours online" isTop={false} />
    <About />
    <FeaturedProductCards />
  </>
));

export default Main;
