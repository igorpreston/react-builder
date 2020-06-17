import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// TYPES

export const FETCH_UNSPLASH_IMAGES = 'FETCH_UNSPLASH_IMAGES';
export const FETCH_UNSPLASH_IMAGES_SUCCESS = 'FETCH_UNSPLASH_IMAGES_SUCCESS';

// ACTIONS

export const fetchUnsplashImages = () => ({
  type: FETCH_UNSPLASH_IMAGES,
});

export const fetchUnsplashImagesSuccess = images => ({
  type: FETCH_UNSPLASH_IMAGES,
  payload: { images },
});

// STATE

export const initialState = fromJS({});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};