import { memo, useMemo } from 'react';

import styles from '../../Page.module.scss';
import useStore from '../../../../store/store';
import Dropdown from '../../common/Dropdown';
import CheckInDate from './CheckInDate';
import Duration from './Duration';
import People from './People';
import SearchButton from './SearchButton';
import Section from '../../common/Section';

const Search = memo((props: { title: string }) => {
  const { title } = props;
  const destination = useStore((state) => state.whereToGo);
  const checkInDate = useStore((state) => state.checkInDate);
  const duration = useStore((state) => state.duration);
  const companions = useStore((state) => state.companions);

  const isDisabled = useMemo(
    () => ![destination, checkInDate, duration, companions]
      .every((input) => input.status === 'success'),
    [destination, checkInDate, duration, companions],
  );

  return (
    <Section id="search" classes={`is-primary ${styles.section_coloured} ${styles.section_top}`}>
      <h1 className={`title ${styles.container__title}`}>{title}</h1>
      <div className={`container ${styles.container__search}`}>
        <form className="field is-grouped">
          <Dropdown type="where_to_go" />
          <CheckInDate />
          <Duration />
          <People />
          <SearchButton disabled={isDisabled} />
        </form>
      </div>
    </Section>
  );
});

export default Search;
