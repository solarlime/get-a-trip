import { StateCreator } from 'zustand';
import { createApi } from 'unsplash-js';

import type { TourState, TourActions, Tour } from './types/tour';

// @ts-ignore
const unsplash = createApi({ accessKey: import.meta.env.UNSPLASH });

const initialState: TourState = {
  image: {
    placeholder: { value: '/placeholder.svg' },
  },
  tours: [],
  randomTours: [],
};

const createTourSlice: StateCreator<TourState & TourActions> = (set, get) => ({
  ...initialState,
  getImage: async (id) => {
    try {
      const result = await unsplash.photos.get({ photoId: id });
      if (result.response) {
        set((state) => ({
          image: {
            ...state.image,
            [id]: { value: result.response.urls.raw },
          },
        }));
        console.info(`Image author: ${result.response.user.first_name} ${result.response.user.last_name}, link: ${result.response.links.html}?utm_source=Homepage&utm_medium=referral`);
      }
    } catch {
      console.error('Failed to load Unsplash');
    }
  },
  importTours: async () => {
    const results = await import('./results.json').then((res) => res.default.results);
    const year = (new Date()).getFullYear();
    const withDatesAndFlat: Array<Tour> = [];
    results.forEach((tour) => {
      tour.dates.forEach((date) => {
        const [dayStart, monthStart] = date.start_date.split('-');
        const [dayEnd, monthEnd] = date.end_date.split('-');
        withDatesAndFlat.push({
          ...tour,
          dates: {
            start_date: new Date(`${year}-${monthStart}-${dayStart}`),
            end_date: new Date(`${year}-${monthEnd}-${dayEnd}`),
          },
        });
      });
    });
    set((state) => ({ ...state, tours: withDatesAndFlat }));
  },
  getRandomTours: async (number) => {
    const resultingTours: Array<Tour> = [];
    if (!get().tours.length) await get().importTours();
    const { tours } = get();
    let upTo = number ?? tours.length;
    const indexes: Array<number> = [];
    const places: Array<string> = [];
    for (let i = 0; i < upTo; i += 1) {
      const randomIndex = Math.floor(Math.random() * tours.length);
      if (indexes.includes(randomIndex) || places.includes(tours[randomIndex].place)) {
        upTo += 1;
      } else {
        indexes.push(randomIndex);
        places.push(tours[randomIndex].place);
        resultingTours.push(tours[randomIndex]);
      }
      console.log(randomIndex);
    }
    set((state) => ({ ...state, randomTours: resultingTours }));
  },
});

export default createTourSlice;
