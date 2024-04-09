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
