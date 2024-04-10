import { memo, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import useStore from '../../../../../store/store';
import AboutTour from './AboutTour';
import Top from './Top';
import InfoCards from './InfoCards/InfoCards';
import Activities from './Activities';
import Booking from './Booking/Booking';
import FAQ from './FAQ/FAQ';

const Direction = memo(() => {
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
      <FAQ />
    </>
  );
});

export default Direction;
