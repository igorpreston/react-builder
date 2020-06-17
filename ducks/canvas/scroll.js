import { createSelector } from 'reselect';
import { ScrollPos } from 'app/records/scroll';

// TYPES

export const UPDATE_SCROLL_POS = 'CANVAS/UPDATE_SCROLL_POS';

// ACTIONS

export const updateScrollPos = pos => ({
  type: UPDATE_SCROLL_POS,
  payload: { pos },
});

// STATE

export const initialState = new ScrollPos();

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};

// SELECTORS

export const getScrollPos = state => state.get('canvas').get('scroll');

export const getScrollX = createSelector(
  getScrollPos,
  pos => pos.x,
);

export const getScrollY = createSelector(
  getScrollPos,
  pos => pos.y,
);
