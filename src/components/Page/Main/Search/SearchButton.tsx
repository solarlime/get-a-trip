import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';

import styles from '../../Page.module.sass';

const SearchButton = memo((props: { disabled: boolean }) => {
  const { disabled } = props;

  return (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <HashLink
      className={`button is-primary is-flex-shrink-0 has-text-white ${disabled ? styles.disabled : ''}`}
      smooth
      to="/directions#results"
    >
      <FontAwesomeIcon className="is-size-6-mobile is-size-4" icon={faMagnifyingGlass} />
    </HashLink>
  );
});

export default SearchButton;
