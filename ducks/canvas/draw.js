import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { Dimensions } from 'app/records/dimensions';
import { SELECT_ENABLE } from './select';
import * as MouseDuck from './mouse';

// TYPES

export const DRAW_ENABLE = 'CANVAS/DRAW_ENABLE';
export const DRAW_START = 'CANVAS/DRAW_START';
export const DRAW_MOVE = 'CANVAS/DRAW_MOVE';
export const DRAW_STOP = 'CANVAS/DRAW_STOP';
export const DRAW_DISABLE = 'CANVAS/DRAW_DISABLE';

// ACTIONS

export const drawEnable = brush => ({
  type: DRAW_ENABLE,
  payload: { brush },
});

export const drawStart = (x, y) => ({
  type: DRAW_START,
  payload: { x, y },
});

export const drawMove = (x, y) => ({
  type: DRAW_MOVE,
  payload: { x, y },
});

export const drawStop = () => ({
  type: DRAW_STOP,
});

export const drawDisable = () => ({
  type: DRAW_DISABLE,
});

// STATE

export const initialState = Map({
  canDraw: false,
  isDrawing: false,
  brush: null,
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DRAW_ENABLE:
      return state.withMutations(draw => draw.set('canDraw', true).set('brush', payload.brush));
    case DRAW_START:
      return state.set('isDrawing', true);
    case DRAW_STOP:
      return state.set('isDrawing', false);
    case DRAW_DISABLE:
      return initialState;
    case SELECT_ENABLE:
      return initialState;
    default:
      return state;
  };
};

// SELECTORS

export const getCanDraw = state => state.get('canvas').get('draw').get('canDraw');
export const getIsDrawing = state => state.get('canvas').get('draw').get('isDrawing');
export const getDrawBrush = state => state.get('canvas').get('draw').get('brush');

export const getDrawBloc = createSelector(
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
