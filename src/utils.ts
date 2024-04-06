export const formatter = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);

export const getYear = () => (new Date()).getFullYear();

export const placesLeft = 12;
