import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import styles from './Page.module.sass';

const Header = memo(() => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <header>
      <nav className="navbar is-black is-fixed-top pt-4 pb-4" role="navigation" aria-label="main navigation">
        <div className="container is-max-widescreen">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <svg className={`${styles.specific} ${styles.logo}`} strokeMiterlimit="10" version="1.1" viewBox="0 0 266 38.5212" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                <defs />
                <clipPath id="ArtboardFrame">
                  <rect height="38.5212" width="266" x="0" y="0" />
                </clipPath>
                <g clipPath="url(#ArtboardFrame)" id="Слой-1">
                  <g opacity="1">
                    <path d="M19.8108 38.5212C17.0309 38.5212 14.4442 38.0296 12.0508 37.0465C9.6574 36.0634 7.55494 34.6914 5.74342 32.9308C3.9319 31.1701 2.52179 29.1249 1.51307 26.7951C0.504357 24.4654 0 21.9539 0 19.2606C0 16.5674 0.501856 14.0559 1.50557 11.7261C2.50928 9.39633 3.90425 7.35111 5.69048 5.59045C7.47671 3.82978 9.56639 2.45787 11.9595 1.47472C14.3526 0.491575 16.9264 0 19.6808 0C22.7653 0 25.6771 0.616205 28.4162 1.84862C31.1552 3.08103 33.419 4.78987 35.2075 6.97514L29.8004 11.9403C28.5299 10.3547 27.0274 9.15304 25.2929 8.33523C23.5583 7.51742 21.6876 7.10852 19.6808 7.10852C18.0046 7.10852 16.4541 7.41711 15.0294 8.03429C13.6047 8.65146 12.3604 9.50345 11.2964 10.5903C10.2323 11.6771 9.40703 12.957 8.82042 14.43C8.23381 15.9031 7.9405 17.5133 7.9405 19.2606C7.9405 20.9979 8.24006 22.612 8.83917 24.1029C9.43829 25.5937 10.2826 26.8889 11.3722 27.9885C12.4618 29.0881 13.7317 29.9465 15.182 30.5636C16.6323 31.1808 18.2083 31.4894 19.91 31.4894C21.6718 31.4894 23.27 31.1543 24.7048 30.484C26.1395 29.8138 27.3419 28.8872 28.3119 27.7042C29.282 26.5213 29.9246 25.1787 30.2398 23.6764L19.2139 23.6764L19.2139 16.9564L38.5229 16.9564L38.5229 19.3356C38.5229 22.085 38.0541 24.6246 37.1165 26.9544C36.179 29.2841 34.873 31.3167 33.1988 33.0521C31.5246 34.7875 29.5466 36.1328 27.2649 37.0882C24.9832 38.0435 22.4985 38.5212 19.8108 38.5212Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <path d="M43.8034 37.9343L43.8034 0.586888L72.4801 0.586888L72.4801 7.30609L51.5372 7.30609L51.5372 15.836L65.324 15.836L65.324 22.3493L51.5372 22.3493L51.5372 31.2151L72.6935 31.2151L72.6935 37.9343L43.8034 37.9343Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <path d="M88.3786 37.9343L88.3786 7.43614L75.7963 7.43614L75.7963 0.586888L108.695 0.586888L108.695 7.43614L96.1123 7.43614L96.1123 37.9343L88.3786 37.9343Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <g opacity="1">
                      <path d="M120.868 0.59L109.844 37.94L124.521 37.94L125.583 26.1979L129.768 26.1979L130.767 37.94L145.632 37.94L134.702 0.59L127.676 0.59L127.988 5.05576L127.332 5.05576L127.644 0.59L120.868 0.59ZM127.207 6.61722L128.113 6.61722L129.456 22.669L125.864 22.669L127.207 6.61722Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    </g>
                    <path d="M159.395 37.9343L159.395 7.43614L146.812 7.43614L146.812 0.586888L179.711 0.586888L179.711 7.43614L167.128 7.43614L167.128 37.9343L159.395 37.9343Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <path d="M184.039 37.9343L184.039 0.586888L202.259 0.586888C204.79 0.586888 207.026 1.07596 208.967 2.05411C210.908 3.03226 212.424 4.39166 213.514 6.13232C214.604 7.87298 215.148 9.87901 215.148 12.1504C215.148 14.5285 214.485 16.6298 213.159 18.4541C211.833 20.2784 210.075 21.6351 207.886 22.5243L216.11 37.9343L207.491 37.9343L200.175 23.6306L191.773 23.6306L191.773 37.9343L184.039 37.9343ZM191.773 17.2999L201.572 17.2999C203.309 17.2999 204.704 16.8378 205.758 15.9135C206.812 14.9893 207.339 13.773 207.339 12.2646C207.339 10.7668 206.812 9.55583 205.758 8.6316C204.704 7.70736 203.309 7.24524 201.572 7.24524L191.773 7.24524L191.773 17.2999Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <path d="M220.284 37.9343L220.284 0.586888L228.018 0.586888L228.018 37.9343L220.284 37.9343Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                    <path d="M234.784 37.9343L234.784 0.586888L253.484 0.586888C255.939 0.586888 258.102 1.08874 259.975 2.09246C261.847 3.09617 263.32 4.47725 264.392 6.23569C265.464 7.99413 266 10.0216 266 12.318C266 14.5388 265.464 16.5221 264.392 18.2677C263.32 20.0134 261.839 21.3842 259.948 22.3801C258.058 23.3761 255.903 23.874 253.484 23.874L242.518 23.874L242.518 37.9343L234.784 37.9343ZM242.518 17.4374L252.63 17.4374C254.316 17.4374 255.664 16.9727 256.674 16.0431C257.685 15.1136 258.19 13.8897 258.19 12.3713C258.19 10.828 257.685 9.58779 256.674 8.65077C255.664 7.71375 254.316 7.24524 252.63 7.24524L242.518 7.24524L242.518 17.4374Z" fill="#fffef2" fillRule="nonzero" opacity="1" stroke="none" />
                  </g>
                </g>
              </svg>
            </Link>

            <button
              type="button"
              className={`navbar-burger ${(!collapsed) ? '' : 'is-active'}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => setCollapsed((previous) => !previous)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className={`navbar-menu ${(!collapsed) ? '' : 'is-active'}`}>
            <div className={`navbar-start ml-auto mr-auto is-flex-touch is-flex-wrap-wrap is-justify-content-center ${styles.specific} ${styles.links}`}>

              <Link
                className="navbar-item has-text-white is-size-6"
                to="/"
                onClick={() => { if (collapsed) setCollapsed(!collapsed); }}
              >
                Find your direction
              </Link>

              <HashLink
                className="navbar-item has-text-white is-size-6"
                smooth
                to="/#about"
                onClick={() => { if (collapsed) setCollapsed(!collapsed); }}
              >
                What we are doing
              </HashLink>

              <HashLink
                className="navbar-item has-text-white is-size-6"
                smooth
                to="/#featured"
                onClick={() => { if (collapsed) setCollapsed(!collapsed); }}
              >
                Featured variants
              </HashLink>
            </div>

            <div className="navbar-end is-flex-touch is-flex-wrap-wrap is-justify-content-center">
              <div className="navbar-item">
                <a className="button is-primary has-text-white is-size-6" href="mailto:dmitriy@solarlime.dev?subject=Предложение о сотрудничестве" target="_blank" rel="noreferrer">
                  Write us
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;
