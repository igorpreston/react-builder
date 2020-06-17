import { fromJS, List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import { Snapped } from 'app/records/snap';
import {
  getFlattenedBlocsSnapLinesForX,
  getFlattenedBlocsSnapLinesForY,
} from 'app/ducks/canvas/selected';
import {
  getCanvasSnapLinesForX,
  getCanvasSnapLinesForY,
} from 'app/ducks/canvas/size';

// TYPES

export const SHOW_SNAP_LINE = 'SNAP/SHOW_SNAP_LINE';
export const SHOW_SNAP_LINES = 'SNAP/SHOW_SNAP_LINES';
export const HIDE_SNAP_LINE = 'SNAP/HIDE_SNAP_LINE';
export const HIDE_SNAP_LINES_FOR_X = 'SNAP/HIDE_SNAP_LINES_FOR_X';
export const HIDE_SNAP_LINES_FOR_Y = 'SNAP/HIDE_SNAP_LINES_FOR_Y';
export const HIDE_ALL_SNAP_LINES = 'SNAP/HIDE_ALL_SNAP_LINES';
export const SNAP_TO_X = 'SNAP/SNAP_TO_X';
export const SNAP_TO_Y = 'SNAP/SNAP_TO_Y';
export const UNSNAP_FROM_X = 'SNAP/UNSNAP_FROM_X';
export const UNSNAP_FROM_Y = 'SNAP/UNSNAP_FROM_Y';
export const RESET_SNAPPED = 'SNAP/RESET_SNAPPED';

// ACTIONS

export const showSnapLine = line => ({
  type: SHOW_SNAP_LINE,
  payload: { line },
});

export const showSnapLines = lines => ({
  type: SHOW_SNAP_LINES,
  payload: { lines },
});

export const hideSnapLine = line => ({
  type: HIDE_SNAP_LINE,
  payload: { line },
});

export const hideSnapLinesForX = () => ({
  type: HIDE_SNAP_LINES_FOR_X,
});

export const hideSnapLinesForY = () => ({
  type: HIDE_SNAP_LINES_FOR_Y,
});

export const hideAllSnapLines = () => ({
  type: HIDE_ALL_SNAP_LINES,
});

export const snapToX = (line, target) => ({
  type: SNAP_TO_X,
  payload: { line, target },
});

export const snapToY = (line, target) => ({
  type: SNAP_TO_Y,
  payload: { line, target },
});

export const unsnapFromX = () => ({
  type: UNSNAP_FROM_X,
});

export const unsnapFromY = () => ({
  type: UNSNAP_FROM_Y,
});

export const resetSnapped = () => ({
  type: RESET_SNAPPED,
});

// STATE

export const linesState = fromJS({
  x: {},
  y: {},
});

export const snappedState = fromJS({
  x: new Snapped(),
  y: new Snapped(),
});

// REDUCERS

export function linesReducer (state = linesState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SNAP_LINE:
      return payload.line.x != null ? 
        state.setIn(['x', payload.line.x], payload.line) :
        state.setIn(['y', payload.line.y], payload.line);
    case SHOW_SNAP_LINES:
      return payload.lines.reduce((lines, line) => {
        if (line.x != null) {
          return lines.setIn(['x', line.x], line);
        } else {
          return lines.setIn(['y', line.y], line);
        }
      }, state);
    case HIDE_SNAP_LINE:
      return payload.line.x != null ?
        state.deleteIn(['x', payload.line.x]) :
        state.deleteIn(['y', payload.line.y]);
    case HIDE_SNAP_LINES_FOR_X:
      return state.set('x', fromJS({}));
    case HIDE_SNAP_LINES_FOR_Y:
      return state.set('y', fromJS({}));
    case HIDE_ALL_SNAP_LINES:
      return linesState;
    default:
      return state;
  };
};

export function snappedReducer (state = snappedState, action) {
  const { type, payload } = action;
  switch (type) {
    case SNAP_TO_X:
      return state.set('x', new Snapped({ ...payload }));
    case UNSNAP_FROM_X:
      return state.set('x', new Snapped());
    case SNAP_TO_Y:
      return state.set('y', new Snapped({ ...payload }));
    case UNSNAP_FROM_Y:
      return state.set('y', new Snapped());
    case RESET_SNAPPED:
      return snappedState;
    default:
      return state;
  };
};

export default combineReducers({
  lines: linesReducer,
  snapped: snappedReducer,
});

// SELECTORS

export const getViewSnapLines = state => state.get('snap').get('lines');

export const getViewSnapLinesForX = createSelector(
  getViewSnapLines,
  lines => lines.get('x'),
);

export const getDrawSnapLinesForX = createSelector(
  getViewSnapLinesForX,
  lines => !lines.isEmpty() && lines.reduce((drawLines, line) => drawLines.concat(line.draw), List()),
);

export const getViewSnapLinesForY = createSelector(
  getViewSnapLines,
  lines => lines.get('y'),
);

export const getDrawSnapLinesForY = createSelector(
  getViewSnapLinesForY,
  lines => !lines.isEmpty() && lines.reduce((drawLines, line) => drawLines.concat(line.draw), List()),
);

export const getSnappedX = state => state.get('snap').get('snapped').get('x');
export const getSnappedY = state => state.get('snap').get('snapped').get('y');

export const getIsSnappedX = createSelector(
  getSnappedX,
  snapped => snapped.line && snapped.target,
);

export const getSnappedLineForX = createSelector(
  getSnappedX,
  snapped => snapped.line,
);

export const getSnappedTargetForX = createSelector(
  getSnappedX,
  snapped => snapped.target,
);

export const getIsSnappedY = createSelector(
  getSnappedY,
  snapped => snapped.line && snapped.target,
);

export const getSnappedLineForY = createSelector(
  getSnappedY,
  snapped => snapped.line,
);

export const getSnappedTargetForY = createSelector(
  getSnappedY,
  snapped => snapped.target,
);

export const getSnapLinesForX = createSelector(
  getCanvasSnapLinesForX,
  getFlattenedBlocsSnapLinesForX,
  (canvas, blocs) => canvas.concat(blocs),
);

export const getSnapLinesForY = createSelector(
  getCanvasSnapLinesForY,
  getFlattenedBlocsSnapLinesForY,
  (canvas, blocs) => canvas.concat(blocs),
);