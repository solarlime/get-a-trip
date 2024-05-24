import { memo, MutableRefObject, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import useButtonSize from './useButtonSize';

const SearchButton = memo((props: { disabled: boolean }) => {
  const ref: MutableRefObject<HTMLAnchorElement | null> = useRef(null);
  const getFilteredTours = useStore((state) => state.getFilteredTours);
  useButtonSize(ref);
  const { disabled } = props;

  return (
    <Link
      className={`button ${styles.search__button} is-primary ${disabled ? styles.disabled : ''}`}
      to="/directions#results"
      onClick={getFilteredTours}
      ref={ref}
    >
      <FontAwesomeIcon className={`${styles.search__button__icon} ${styles.colorWhite}`} icon={faMagnifyingGlass} />
    </Link>
  );
});

export default SearchButton;
