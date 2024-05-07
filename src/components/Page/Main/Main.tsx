import { memo } from 'react';
import FeaturedProductCards from './ProductCards/FeaturedProductCards';
import About from './About';
import FirstScreen from './FirstScreen';

const Main = memo(() => (
  <>
    <FirstScreen />
    <About />
    <FeaturedProductCards />
  </>
));

export default Main;
