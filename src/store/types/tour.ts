import type { Base } from './base';

export interface Tour {
  place: string,
  country: string,
  continent: string,
  dates: {
    start_date: Date,
    end_date: Date,
  },
  left: number,
  image_id: string,
}

interface FilteredTours {
  tours: Array<Tour>,
  isFilterRun: boolean,
}

export interface TourState {
  image: { [key: string]: Base },
  tours: Array<Tour>,
  randomTours: Array<Tour>,
  filteredTours: FilteredTours,
}

export interface TourActions {
  getImage: (id: string) => Promise<void>,
  importTours: () => Promise<void>,
  getRandomTours: (number?: number) => Promise<void>,
  getFilteredTours: () => Promise<void>,
}
