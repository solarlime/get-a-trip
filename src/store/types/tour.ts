import type { Base } from './base';

export interface TourState {
  image: { [key: string]: Base },
}

export interface TourActions {
  getImage: (id: string) => Promise<void>,
}
