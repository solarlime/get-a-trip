import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Page.module.sass';

const Search = memo(() => (
  <section id="search" className={`hero is-primary ${styles.my_section} ${styles.my_section_coloured}`}>
    <div className={`hero-body pl-3 pr-3 ${styles.my_hero_body}`}>
      <div className={`container ${styles.my_hero_padding} is-max-widescreen`}>
        <h1 className="title is-size-1 is-size-3-mobile has-text-centered has-text-white">Choose and buy tours online</h1>
        <div className={`container has-background-white ${styles.my_search_container}`}>
          <div className="field is-grouped">
            <div>
              <label className="label" htmlFor="where">Where</label>
              <div id="where" className="control">
                <div className={`select is-fullwidth ${styles.specific} ${styles.selector}`}>
                  <select defaultValue="idle">
                    <option value="idle" disabled>Choose destination</option>
                    <option value="turkey">Turkey</option>
                    <option value="brazil">Brazil</option>
                    <option value="portugal">Portugal</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="is-flex-shrink-0">
              <label className="label" htmlFor="date">Check in</label>
              <div id="date" className="control">
                <input className="input" type="date" placeholder="Add dates" />
              </div>
            </div>
            <div className="is-flex-grow-1">
              <label className="label" htmlFor="duration">Duration</label>
              <div id="duration" className="control">
                <input className="input" type="number" placeholder="Number of nights" />
              </div>
            </div>
            <div className="is-flex-grow-1">
              <label className="label" htmlFor="companions">Companions</label>
              <div id="companions" className="control">
                <input className="input" type="number" placeholder="Add guests" />
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="button is-primary is-flex-shrink-0" type="button">
              <span className="icon has-text-white">
                <FontAwesomeIcon className="is-size-6-mobile is-size-4" icon={faMagnifyingGlass} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
));

export default Search;
