import { StateCreator } from 'zustand';
import { createApi } from 'unsplash-js';

import type { TourState, TourActions, Tour } from './types/tour';
import type { SearchState } from './types/search';
import { placesLeft } from '../utils';

// @ts-ignore
const unsplash = createApi({ accessKey: import.meta.env.UNSPLASH });

const initialState: TourState = {
  image: {
    placeholder: { value: '/placeholder.svg' },
  },
  tours: [],
  randomTours: [],
  filteredTours: { tours: [], isFilterRun: false },
};

// @ts-ignore
const createTourSlice: StateCreator<TourState & TourActions & SearchState> = (set, get) => ({
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
          left: placesLeft,
          dates: {
            start_date: new Date(`${year}-${monthStart}-${dayStart}`),
            end_date: new Date(`${year}-${monthEnd}-${dayEnd}`),
          },
        });
      });
    });
    set((state) => ({
      ...state,
      tours: withDatesAndFlat
        .sort((a, b) => ((a.dates.start_date > b.dates.start_date) ? 1 : -1))
        .map((tour) => {
          // @ts-ignore
          const daysLeft = Math.floor((tour.dates.end_date - new Date()) / 1000 / 60 / 60 / 24);
          // 5 is chosen randomly. Can be changed
          return { ...tour, left: (daysLeft / 5 > 12) ? 12 : Math.ceil(daysLeft / 5) };
        }),
    }));
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
      if (
        indexes.includes(randomIndex)
        || places.includes(tours[randomIndex].place)
        || (tours[randomIndex].dates.end_date < new Date())) {
        upTo += 1;
      } else {
        indexes.push(randomIndex);
        places.push(tours[randomIndex].place);
        resultingTours.push(tours[randomIndex]);
      }
    }
    set((state) => ({ ...state, randomTours: resultingTours }));
  },
  getFilteredTours: async () => {
    const {
      destination, checkInDate, duration, companions,
    } = get();
    if (!get().tours.length) await get().importTours();
    const { tours } = get();
    set((state) => ({
      ...state,
      filteredTours: {
        isFilterRun: true,
        tours: tours.filter((tour) => {
          const checkIn = new Date(checkInDate.value);
          const checkOut = new Date(checkInDate.value);
          checkOut.setDate(checkOut.getDate() + +duration.value);
          if (
            (tour.continent === destination.value)
            // Tours should be now or in future
            && (tour.dates.end_date >= new Date())
            // Tour should start earlier than check-in or equal to it
            && (tour.dates.start_date <= checkIn)
            // Tour should end later than check-in
            && (tour.dates.end_date > checkIn)
            // Tour should cover duration
            && (tour.dates.end_date >= checkOut)
            // Tour should have places
            && (tour.left >= +companions.value)
          ) {
            return true;
          }
          return false;
        }),
      },
    }));
  },
});

export default createTourSlice;
