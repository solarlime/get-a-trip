import {
  ForwardedRef, forwardRef, useState, memo, useEffect,
} from 'react';

import { ImageLinks } from '../../../store/types/tour';
import Image from './Image';
import { cacheImages } from '../../../utils';

type LoadingState = 0 | 1 | 2;

const ImagePreloader = forwardRef((
  props: {
    className: string,
    allImages: { [key: string]: ImageLinks },
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
  const [isLoading, setIsLoading] = useState<LoadingState>(0);

  useEffect(() => {
    cacheImages(allImages, neededImages, 'thumb')
      .then(() => {
        if (updateDisabled) updateDisabled(false);
        setIsLoading(1);
      })
      .then(() => cacheImages(allImages, neededImages, 'full', sizes, srcSet))
      .then(() => {
        if (updateDisabled) updateDisabled(false);
        setIsLoading(2);
      });
  }, []);

  return (
    (isLoading === 2)
      ? (
        <Image
          className={className}
          src={allImages[neededImages[shown]].full}
          sizes={sizes}
          srcSet={srcSet}
          alt={alt}
          ref={ref}
        />
      ) : (isLoading === 1)
        ? (
          <Image
            className={className}
            src={allImages[neededImages[shown]].thumb}
            alt={alt}
            ref={ref}
          />
        ) : (
          <div className={`${className} is-skeleton`} />
        )
  );
});

const MemoisedImagePreloader = memo(ImagePreloader);

export default MemoisedImagePreloader;
