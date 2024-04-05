import { memo, useMemo } from 'react';

import styles from '../../Page.module.sass';
import Destination from './Destination';
import CheckInDate from './CheckInDate';
import Duration from './Duration';
import Companions from './Companions';
import SearchButton from './SearchButton';
import useStore from '../../../../store/store';

const Search = memo((props: { title: string, isTop: boolean }) => {
  const { isTop, title } = props;
  const destination = useStore((state) => state.destination);
  const checkInDate = useStore((state) => state.checkInDate);
  const duration = useStore((state) => state.duration);
  const companions = useStore((state) => state.companions);

  const isDisabled = useMemo(
    () => ![destination, checkInDate, duration, companions]
      .every((input) => input.status === 'success'),
    [destination, checkInDate, duration, companions],
  );

  return (
    <section id="search" className={`hero is-primary ${styles.my_section} ${styles.my_section_coloured} ${(isTop) ? styles.top : ''}`}>
      <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
        <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
          <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-white">{title}</h1>
          <div className={`container has-background-white ${styles.my_search_container}`}>
            <form className="field is-grouped">
              <Destination />
              <CheckInDate />
              <Duration />
              <Companions />
              <SearchButton disabled={isDisabled} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Search;