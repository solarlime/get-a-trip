import { ReactElement } from 'react';

import Resorterra from '../../../img/resorterra.svg?react';
import Tripanyday from '../../../img/tripanyday.svg?react';
import Whatatravel from '../../../img/whatatravel.svg?react';

export type Hosters = 'resorterra' | 'tripanyday' | 'whatatravel';
const hosters: { [key in Hosters]: ReactElement } = {
  resorterra: <Resorterra />, tripanyday: <Tripanyday />, whatatravel: <Whatatravel />,
};

function Hoster({ hostedby }: { hostedby?: Hosters | undefined }) {
  return (
    (hostedby)
      ? hosters[hostedby] : <Resorterra />
  );
}

export default Hoster;
