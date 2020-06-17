import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { MousePos, MouseDirection } from 'app/records/mouse';

// TYPES

export const UPDATE_START_MOUSE_POS = 'CANVAS/UPDATE_START_MOUSE_POS';
export const UPDATE_CURRENT_MOUSE_POS = 'CANVAS/UPDATE_CURRENT_MOUSE_POS';
export const UPDATE_OFFSET_MOUSE_POS = 'CANVAS/UPDATE_OFFSET_MOUSE_POS';

// ACTIONS

export const updateStartMousePos = pos => ({
  type: UPDATE_START_MOUSE_POS,
  payload: { pos },
});

export const updateCurrentMousePos = pos => ({
  type: UPDATE_CURRENT_MOUSE_POS,
  payload: { pos },
});

export const updateOffsetMousePos = pos => ({
  type: UPDATE_OFFSET_MOUSE_POS,
  payload: { pos },
});

// STATE

export const initialState = Map({
  start: new MousePos(),
  current: new MousePos(),
  offset: new MousePos(),
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_START_MOUSE_POS:
      return state.mergeIn(['start'], payload.pos);
    case UPDATE_CURRENT_MOUSE_POS:
      return state.mergeIn(['current'], payload.pos);
    case UPDATE_OFFSET_MOUSE_POS:
      return state.mergeIn(['offset'], payload.pos);
    default:
      return state;
  };
};

// SELECTORS

export const getStartMousePos = state => state.get('canvas').get('mouse').get('start');
export const getCurrentMousePos = state => state.get('canvas').get('mouse').get('current');
export const getOffsetMousePos = state => state.get('canvas').get('mouse').get('offset');

export const getMouseDirection = createSelector(
  getStartMousePos,
  getCurrentMousePos,
  (start, current) => new MouseDirection({
    x: current.x - start.x < 0 ? 'left' : 'right',
    y: current.y - start.y < 0 ? 'top' : 'bottom',
  }),
);

export const getCanvasMousePos = (coord, offset, scroll) => coord - offset + scroll;
