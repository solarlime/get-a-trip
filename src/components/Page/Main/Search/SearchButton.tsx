import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';

const SearchButton = memo((props: { disabled: boolean }) => {
  const { disabled } = props;

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      className="button is-primary is-flex-shrink-0"
      type="button"
      disabled={disabled}
    >
      <HashLink className="icon has-text-white" smooth to="/directions#results">
        <FontAwesomeIcon className="is-size-6-mobile is-size-4" icon={faMagnifyingGlass} />
      </HashLink>
    </button>
  );
});

export default SearchButton;
