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
  const regex = /(?<=[\s\u00A0]([Tt]he|[Aa]|[Aa]n|[Ii]s|[Aa]re|[Ww]as|[Ww]ere|[Ww]ill|[Ss]hall|[Aa]nd))\s/g;
  return str.replaceAll(regex, '\u00A0');
};
