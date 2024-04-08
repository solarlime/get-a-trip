import { memo, useEffect, useState } from 'react';
import {
  useParams, Navigate, Link, useLocation,
} from 'react-router-dom';

import useStore from '../../../../../store/store';
import AboutTour from './AboutTour';
import Top from './Top';
import InfoCards from './InfoCards';
import Activities from './Activities';
import Booking from './Booking';

const Direction = memo(() => {
  const location = useLocation();
  const [resolved, setResolved] = useState(false);
  const params = useParams();
  const chosenTour = useStore((state) => state.chosenTour);
  const resolveTour = useStore((state) => state.resolveChosenTour);

  useEffect(() => {
    if (!Object.keys(chosenTour).length && params.location) {
      resolveTour(params.location).then(() => setResolved(true));
    }
  });

  if (!Object.keys(chosenTour).length) {
    if (resolved) {
      return <Navigate to="/directions" />;
    }
    return <div>Loading...</div>;
  }

  return (
    <>
      <Top tour={chosenTour} />
      <AboutTour />
      <InfoCards />
      <Activities />
      <Booking />
      <div className="has-text-centered">
        Checkout page is
        {' '}
        <Link to="/checkout" state={{ previousLocationPathname: location.pathname }}>here</Link>
      </div>
    </>
  );
});

export default Direction;
