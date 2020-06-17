import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import { Dimensions } from 'app/records/dimensions';
import { SnapLine, SnapOrigin, SnapDraw } from 'app/records/snap';

// TYPES

export const UPDATE_CANVAS_SIZE = 'CANVAS/UPDATE_CANVAS_SIZE';

// ACTIONS

export const updateCanvasSize = dimensions => ({
  type: UPDATE_CANVAS_SIZE,
  payload: { dimensions },
});

// STATE

export const initialState = new Dimensions();

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CANVAS_SIZE:
      return state.merge(payload.dimensions);
    default:
      return state;
  };
};

// SELECTORS

export const getCanvasSize = state => state.get('canvas').get('size');

export const getCanvasDimensionsForX = createSelector(
  getCanvasSize,
  canvas => Map({
    left: 0,
    right: 0 + canvas.width,
    vCenter: 0 + canvas.width / 2,
  }),
);

export const getCanvasDimensionsForY = createSelector(
  getCanvasSize,
  canvas => Map({
    top: 0,
    bottom: 0 + canvas.height,
    hCenter: 0 + canvas.height / 2,
  }),
);

export const getCanvasTop = createSelector(
  getCanvasSize,
  size => size.top,
);

export const getCanvasLeft = createSelector(
  getCanvasSize,
  size => size.left,
);

export const getCanvasRatio = createSelector(
  getCanvasSize,
  size => 100 / size.width,
);

export const getCanvasSnapLinesForX = createSelector(
  getCanvasDimensionsForX,
  dimensions => dimensions.reduce((lines, x, source) => lines.push(
    new SnapLine({
      x,
      source,
      origin: new SnapOrigin({ id: '0', type: 'Canvas' }),
      draw: List.of(
        new SnapDraw({
          type: 'line',
          x,
        }),
      ),
      sens: 15,
    }),
  ), List()),
);

export const getCanvasSnapLinesForY = createSelector(
  getCanvasDimensionsForY,
  dimensions => dimensions.reduce((lines, y, source) => lines.push(
    new SnapLine({
      y,
      source,
      origin: new SnapOrigin({ id: 0, type: 'Canvas' }),
      draw: List.of(
        new SnapDraw({
          type: 'line',
          y,
        }),
      ),
      sens: 15,
    }),
  ), List()),
)