import { memo } from 'react';

import Search from '../Search/Search';
import Results from './Results';

const Directions = memo(() => (
  <>
    <Search title="Find your perfect tour" />
    <Results />
  </>
));

export default Directions;
