import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

import styles from '../../Page.module.sass';
import useStore from '../../../../store/store';

const SearchButton = memo((props: { disabled: boolean }) => {
  const location = useLocation();
  const getFilteredTours = useStore((state) => state.getFilteredTours);
  const { disabled } = props;

  return (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <HashLink
      className={`button is-primary is-flex-shrink-0 has-text-white ${disabled ? styles.disabled : ''}`}
      scroll={(results) => {
        if (location.pathname.includes('directions')) {
          setTimeout(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
        } else {
          results.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }}
      to="/directions#results"
      onClick={getFilteredTours}
    >
      <FontAwesomeIcon className="is-size-6-mobile is-size-4" icon={faMagnifyingGlass} />
    </HashLink>
  );
});

export default SearchButton;
