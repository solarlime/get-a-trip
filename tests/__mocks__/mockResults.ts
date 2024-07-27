const date = new Date();
const gap = 3; // May be any
const beforeFutureMonth = ((date.getMonth() + gap) % 12) + 1;
export const futureMonth = ((date.getMonth() + gap + 1) % 12) + 1;
export const futureMonthString = (`${futureMonth}`.length < 2) ? `0${futureMonth}` : `${futureMonth}`;
export const beforeFutureMonthString = (`${beforeFutureMonth}`.length < 2) ? `0${beforeFutureMonth}` : `${beforeFutureMonth}`;
export const futureMonthLetterString = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(`${date.getFullYear()}-${futureMonth}-01`));

export default {
  results: [
    {
      place: 'Testenburg',
      country: 'Testia',
      continent: 'Asia',
      accommodation: 'https://www.test.test/test.html',
      basicPrice: '100',
      hostedby: 'resorterra',
      dates: [
        { start_date: `01-${futureMonthString}`, end_date: `25-${futureMonthString}` },
      ],
      image_id: 'testenburg',
      carousel: ['testenburg1', 'testenburg2', 'testenburg3'],
      description: ['Test', 'Test', 'Test'],
    },
  ],
};
