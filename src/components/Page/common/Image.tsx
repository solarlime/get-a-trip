import { ForwardedRef, forwardRef } from 'react';

import styles from '../Page.module.scss';
import { setSrcset } from '../../../utils';

const Image = forwardRef(
  (
    props: { className: string, src: string, sizes: string, srcSet: Array<number>, alt: string },
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    const {
      className, src, sizes, srcSet, alt,
    } = props;

    return (
      <img
        className={className}
        src={src}
        srcSet={setSrcset(src, srcSet)}
        sizes={sizes}
        alt={alt}
        ref={ref}
        onLoad={(event) => {
          (event.target as HTMLImageElement).classList.remove(styles.disappear);
        }}
      />
    );
  },
);

export default Image;
