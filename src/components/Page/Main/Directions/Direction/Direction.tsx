import { memo, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import useStore from '../../../../../store/store';
import AboutTour from './AboutTour';
import Top from './Top';
import InfoCards from './InfoCards/InfoCards';
import Activities from './Activities';
import Booking from './Booking/Booking';
import Faq from './FAQ/Faq';
import NotFound from '../../NotFound';

const Direction = memo(() => {
  const [resolved, setResolved] = useState(false);
  const params = useParams();
  const chosenTour = useStore((state) => state.chosenTour);
  const resolveTour = useStore((state) => state.resolveChosenTour);

  useEffect(() => {
    // chosenTour has 2 default values for Booking tests, so it cannot be empty
    if (Object.keys(chosenTour).length <= 2 && params.location) {
      resolveTour(params.location).then(() => setResolved(true));
    }
  });

  // Here is the same
  if (Object.keys(chosenTour).length <= 2) {
    if (resolved) {
      if (window.location.pathname.startsWith('/directions')) {
        return <Navigate to="/directions" />;
      }
      return <NotFound />;
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
      <Faq />
    </>
  );
});

export default Direction;
