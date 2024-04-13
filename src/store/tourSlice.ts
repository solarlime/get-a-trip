import { StateCreator } from 'zustand';
import { createApi } from 'unsplash-js';
import { v4 as uuid } from 'uuid';

import type {
  TourState, TourActions, Tour, QuestionAndAnswer,
} from './types/tour';
import type { SearchState } from './types/search';
import { nbspify, placesLeft } from '../utils';

// @ts-ignore
const unsplash = createApi({ accessKey: import.meta.env.UNSPLASH });

const initialState: TourState = {
  image: {
    placeholder: { value: '/placeholder.svg' },
  },
  tours: [],
  randomTours: [],
  filteredTours: { tours: [], isFilterRun: false },
  chosenTour: {} as Tour,
  questionsAndAnswers: [] as Array<QuestionAndAnswer>,
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
    const { default: Typograf } = await import('typograf');
    const typo = new Typograf({ locale: ['en-US'] });
    const year = (new Date()).getFullYear();
    const withDatesAndFlat: Array<Tour> = [];
    results.forEach((tour) => {
      tour.dates.forEach((date) => {
        const [dayStart, monthStart] = date.start_date.split('-');
        const [dayEnd, monthEnd] = date.end_date.split('-');
        const start = new Date(`${year}-${monthStart}-${dayStart}`);
        const end = new Date(`${year}-${monthEnd}-${dayEnd}`);
        const startDate = new Date(`${year}-${monthStart}-${dayStart}`);
        const endDate = new Date(`${year}-${monthEnd}-${dayEnd}`);

        withDatesAndFlat.push({
          ...tour,
          left: placesLeft,
          promocode: uuid().slice(0, 8),
          dates: {
            start_date: (endDate > new Date()) ? startDate : new Date(`${year + 1}-${monthStart}-${dayStart}`),
            end_date: (endDate > new Date()) ? endDate : new Date(`${year + 1}-${monthEnd}-${dayEnd}`),
            // @ts-ignore
            duration: Math.floor((end - start) / 1000 / 60 / 60 / 24),
          },
          description: tour.description.map((paragraph) => nbspify(typo.execute(paragraph))),
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
          // 7 is chosen randomly. Can be changed
          return { ...tour, left: (daysLeft / 7 > 12) ? 12 : Math.ceil(daysLeft / 7) };
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
    const hosters: Array<string> = [];
    for (let i = 0; i < upTo; i += 1) {
      const randomIndex = Math.floor(Math.random() * tours.length);
      if (
        indexes.includes(randomIndex)
        || places.includes(tours[randomIndex].place)
        || (hosters.filter((hoster) => hoster === tours[randomIndex].hostedby).length >= 2)
        || (tours[randomIndex].dates.end_date < new Date())
        || (Math.floor((
          // @ts-ignore
          tours[randomIndex].dates.end_date - new Date()) / 1000 / 60 / 60 / 24 / 30) > 9)) {
        upTo += 1;
      } else {
        indexes.push(randomIndex);
        places.push(tours[randomIndex].place);
        hosters.push(tours[randomIndex].hostedby);
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
            (tour.continent === destination.option.value)
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
  setChosenTour: (tour) => set((state) => ({ ...state, chosenTour: tour })),
  resolveChosenTour: async (searchString: string) => {
    if (!get().tours.length) await get().importTours();
    const { tours, setChosenTour } = get();
    const resolvedTour = tours.find((tour) => `${tour.country.toLocaleLowerCase()}-${tour.place.toLocaleLowerCase()}`
      .replaceAll(' ', '-') === searchString);
    if (resolvedTour) setChosenTour(resolvedTour);
  },
  importQuestionsAndAnswers: async () => {
    const questionsAndAnswers = await import('./q&a.json').then((res) => res.default.questions_answers);
    const { default: Typograf } = await import('typograf');

    const typo = new Typograf({ locale: ['en-US'] });

    set((state) => ({
      ...state,
      questionsAndAnswers: questionsAndAnswers.map(
        (item) => ({
          question: nbspify(typo.execute(item.question)),
          answer: nbspify(typo.execute(item.answer)),
        }),
      ),
    }));
  },
});

export default createTourSlice;
