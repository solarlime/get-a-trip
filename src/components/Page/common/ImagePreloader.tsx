import {
  ForwardedRef, forwardRef, useState, memo, useEffect,
} from 'react';

import { Base } from '../../../store/types/base';
import Image from './Image';
import { cacheImages } from '../../../utils';

const ImagePreloader = forwardRef((
  props: {
    className: string,
    allImages: { [key: string]: Base },
    neededImages: Array<string>,
    sizes: string,
    srcSet: Array<number>
    alt: string,
    shown?: number,
    updateDisabled?: Function,
  },
  ref: ForwardedRef<HTMLImageElement>,
) => {
  const {
    className, allImages, sizes, srcSet, alt, neededImages, shown = 0, updateDisabled,
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cacheImages(allImages, neededImages, sizes, srcSet).then(() => {
      if (updateDisabled) updateDisabled(false);
      setIsLoading(false);
    });
  }, []);

  return (
    (isLoading)
      ? <div className={`${className} is-skeleton`} /> : (
        <Image
          className={className}
          src={allImages[neededImages[shown]].value}
          sizes={sizes}
          srcSet={srcSet}
          alt={alt}
          ref={ref}
        />
      )
  );
});

const MemoisedImagePreloader = memo(ImagePreloader);

export default MemoisedImagePreloader;
