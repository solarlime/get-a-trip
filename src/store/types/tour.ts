import type { Base } from './base';

export interface Tour {
  place: string,
  country: string,
  continent: string,
  accommodation: string,
  basicPrice: string,
  hostedby: string,
  promocode: string,
  dates: {
    start_date: Date,
    end_date: Date,
    duration: number
  },
  left: number,
  image_id: string,
  carousel: Array<string>
  description: Array<string>
}

interface FilteredTours {
  tours: Array<Tour>,
  proposals: Array<Tour>,
  isFilterRun: boolean,
}

export interface QuestionAndAnswer {
  question: string,
  answer: string,
}

export interface Images {
  [key: string]: Base,
}

export interface TourState {
  images: Images,
  tours: Array<Tour>,
  randomTours: Array<Tour>,
  filteredTours: FilteredTours,
  chosenTour: Tour,
  questionsAndAnswers: Array<QuestionAndAnswer>
}

export interface TourActions {
  getImages: (id: string) => Promise<void>,
  importTours: () => Promise<void>,
  getRandomTours: (number?: number) => Promise<void>,
  getFilteredTours: () => Promise<void>,
  setChosenTour: (tour: Tour) => void,
  resolveChosenTour: (searchString: string) => Promise<void>,
  importQuestionsAndAnswers: () => Promise<void>,
}
