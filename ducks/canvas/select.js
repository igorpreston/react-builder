import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { Dimensions } from 'app/records/dimensions';
import { DRAW_ENABLE } from './draw';
import * as MouseDuck from './mouse';

// TYPES

export const SELECT_ENABLE = 'CANVAS/SELECT_ENABLE';
export const SELECT_START = 'CANVAS/SELECT_START';
export const SELECT_MOVE = 'CANVAS/SELECT_MOVE';
export const SELECT_STOP = 'CANVAS/SELECT_STOP';
export const SELECT_DISABLE = 'CANVAS/SELECT_DISABLE';

// ACTIONS

export const selectEnable = brush => ({
  type: SELECT_ENABLE,
  payload: { brush },
});

export const selectStart = (x, y) => ({
  type: SELECT_START,
  payload: { x, y },
});

export const selectMove = (x, y) => ({
  type: SELECT_MOVE,
  payload: { x, y },
});

export const selectStop = () => ({
  type: SELECT_STOP,
});

export const selectDisable = () => ({
  type: SELECT_DISABLE,
});

// STATE

export const initialState = Map({
  canSelect: false,
  isSelecting: false,
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_ENABLE:
      return state.set('canSelect', true);
    case SELECT_START:
      return state.set('isSelecting', true);
    case SELECT_STOP:
      return state.set('isSelecting', false);
    case SELECT_DISABLE:
      return initialState;
    case DRAW_ENABLE:
      return initialState;
    default:
      return state;
  };
};

// SELECTORS

export const getCanSelect = state => state.get('canvas').get('select').get('canSelect');
export const getIsSelecting = state => state.get('canvas').get('select').get('isSelecting');

export const getSelectBloc = createSelector(
  MouseDuck.getStartMousePos,
  MouseDuck.getCurrentMousePos,
  MouseDuck.getMouseDirection,
  (start, current, direction) => {
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;

    if (direction.x === 'right') {
      left = start.x;
      right = current.x;
    } else if (direction.x === 'left') {
      left = current.x;
      right = start.x;
    }

    if (direction.y === 'bottom') {
      top = start.y;
      bottom = current.y;
    } else if (direction.y === 'top') {
      top = current.y;
      bottom = start.y;
    }

    const width = right - left;
    const height = bottom - top;

    return new Dimensions({
      top,
      left,
      width,
      height,
    });
  },
);
