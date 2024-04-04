import { StateCreator } from 'zustand';
import { createApi } from 'unsplash-js';

import type { TourState, TourActions } from './types/tour';

// @ts-ignore
const unsplash = createApi({ accessKey: import.meta.env.UNSPLASH });

const initialState: TourState = {
  image: {
    placeholder: { value: '/placeholder.svg' },
  },
};

const createTourSlice: StateCreator<TourState & TourActions> = (set) => ({
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
});

export default createTourSlice;
