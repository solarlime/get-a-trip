import { memo, useMemo } from 'react';

import styles from '../../Page.module.scss';
import Dropdown from '../../common/Dropdown';
import CheckInDate from './CheckInDate';
import Duration from './Duration';
import People from './People';
import SearchButton from './SearchButton';
import useStore from '../../../../store/store';

const Search = memo((props: { title: string }) => {
  const { title } = props;
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
    <section id="search" className={`hero is-primary ${styles.section} ${styles.section_coloured} ${styles.section_top}`}>
      <div className={`hero-body ${styles.section__body}`}>
        <div className={`container ${styles.section__body__container} is-max-widescreen`}>
          <h1 className={`title ${styles.container__title}`}>{title}</h1>
          <div className={`container ${styles.container__search}`}>
            <form className="field is-grouped">
              <Dropdown label="Where" type="destination" setter="setDestination" />
              <CheckInDate />
              <Duration />
              <People />
              <SearchButton disabled={isDisabled} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Search;
