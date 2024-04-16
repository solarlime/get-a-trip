export const formatter = (value: Date | string) => {
  let date: Date;
  if (typeof value === 'string') {
    date = new Date(value);
  } else {
    date = value;
  }
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
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
