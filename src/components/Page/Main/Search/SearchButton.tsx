import { memo, MutableRefObject, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import useResizeObserver from './useResizeObserver';

const SearchButton = memo((props: { disabled: boolean }) => {
  const ref: MutableRefObject<HTMLAnchorElement | null> = useRef(null);
  const getFilteredTours = useStore((state) => state.getFilteredTours);
  useResizeObserver(ref);
  const { disabled } = props;

  return (
    <Link
      className={`button is-primary is-flex-shrink-0 has-text-white ${disabled ? styles.disabled : ''}`}
      to="/directions#results"
      onClick={getFilteredTours}
      ref={ref}
    >
      <FontAwesomeIcon className="is-size-6-mobile is-size-4" icon={faMagnifyingGlass} />
    </Link>
  );
});

export default SearchButton;
