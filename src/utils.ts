import type { ImageLinks, Images } from './store/types/tour';

export const formatter = (value: Date | string): { date: string, year: number } => {
  let date: Date;
  if (typeof value === 'string') {
    date = new Date(value);
  } else {
    date = value;
  }
  return {
    date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date),
    year: date.getFullYear(),
  };
};

export const getYear = () => (new Date()).getFullYear();

export const placesLeft = 12;

export const nbspify = (str: string) => {
  // Find all spaces after ' [article | auxiliary verb | and]'

  // This one does not work in old Safari
  // eslint-disable-next-line max-len
  // const regex = /(?<=[\s\u00A0](the|a|an|is|are|was|were|will|shall|and|to))\s/gi;
  // return str.replaceAll(regex, '\u00A0');

  // Whereas this works
  const regex = /(?<space>[\s\u00A0](the|a|an|is|are|was|were|will|shall|and|to))\s/gi;
  return str.replace(regex, '$<space>\u00A0');
};

export const setSrcset = (src: string, srcSet: Array<number>) => srcSet
  .reduce((previous, current, index, sources) => {
    const newSource = `${previous}${src}&auto=format&fm=avif&q=50&w=${current}&crop=entropy&fit=clip ${current}w`;
    if (index === sources.length - 1) {
      return newSource;
    }
    return `${newSource}, `;
  }, '');

export const cacheImages = async (
  allImages: Images,
  neededImages: Array<string>,
  type: keyof ImageLinks,
  sizes?: string,
  srcSet?: Array<number>,
) => {
  const imagesToCache = Object.entries(allImages)
    .filter((entry) => neededImages.includes(entry[0]))
    .map((entry) => entry[1][type]);
  const promises = imagesToCache.map(
    (src: string): Promise<void> => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      if (srcSet && sizes) {
        img.srcset = setSrcset(src, srcSet);
        img.sizes = sizes;
      }
      img.addEventListener('load', () => resolve());
      img.addEventListener('error', () => reject());
    }),
  );

  await Promise.all(promises);
};
