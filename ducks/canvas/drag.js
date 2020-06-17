import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { SnapTarget, SnapOrigin } from 'app/records/snap';
import { getOffsetMousePos } from './mouse';
import { getCanvasRatio } from './size';

// TYPES

export const DRAG_ENABLE = 'CANVAS/DRAG_ENABLE';
export const DRAG_START = 'CANVAS/DRAG_START';
export const DRAG_MOVE = 'CANVAS/DRAG_MOVE';
export const DRAG_STOP = 'CANVAS/DRAG_STOP';
export const DRAG_DISABLE = 'CANVAS/DRAG_DISABLE';
export const SET_DRAG_START_BLOCS = 'CANVAS/SET_DRAG_START_BLOCS';

// ACTIONS

export const dragEnable = () => ({
  type: DRAG_ENABLE,
});

export const dragStart = (x, y) => ({
  type: DRAG_START,
  payload: { x, y },
});

export const dragMove = (x, y) => ({
  type: DRAG_MOVE,
  payload: { x, y },
});

export const dragStop = () => ({
  type: DRAG_STOP,
});

export const dragDisable = () => ({
  type: DRAG_DISABLE,
});

export const setDragStartBlocs = blocs => ({
  type: SET_DRAG_START_BLOCS,
  payload: { blocs },
});

// STATE

export const initialState = Map({
  canDrag: true,
  isDragging: false,
  blocs: Map(),
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DRAG_ENABLE:
      return state.set('canDrag', true);
    case DRAG_START:
      return state.set('isDragging', true);
    case SET_DRAG_START_BLOCS:
      return state.set('blocs', payload.blocs);
    case DRAG_STOP:
      return state.set('isDragging', false);
    case DRAG_DISABLE:
      return initialState;
    default:
      return state;
  };
};

// SELECTORS

export const getCanDrag = state => state.get('canvas').get('drag').get('canDrag');
export const getIsDragging = state => state.get('canvas').get('drag').get('isDragging');

export const getDragStartBlocs = state => state.get('canvas').get('drag').get('blocs');

export const getDragWrapperForX = createSelector(
  getDragStartBlocs,
  blocs => {
    const left = blocs.reduce((lefts, bloc) => lefts.push(bloc.left),List()).min();
    const right = blocs.reduce((rights, bloc) => rights.push(bloc.left + bloc.width), List()).max();
    const vCenter = left + (right - left) / 2;

    return Map({
      left,
      right,
      vCenter,
    });
  },
);

export const getDragWrapperForY = createSelector(
  getDragStartBlocs,
  blocs => {
    const top = blocs.reduce((tops, bloc) => tops.push(bloc.top), List()).min();
    const bottom = blocs.reduce((bottoms, bloc) => bottoms.push(bloc.top + bloc.height), List()).max();
    const hCenter = top + (bottom - top) / 2;

    return Map({
      top,
      bottom,
      hCenter,
    });
  },
);

export const getDragWrapper = createSelector(
  getDragWrapperForX,
  getDragWrapperForY,
  (x, y) => x.mergeDeep(y),
);

export const getOffsetDragWrapperForX = createSelector(
  getOffsetMousePos,
  getDragWrapperForX,
  (offset, wrapper) => wrapper.map(side => side + offset.x),
);

export const getOffsetDragWrapperForY = createSelector(
  getOffsetMousePos,
  getDragWrapperForY,
  (offset, wrapper) => wrapper.map(side => side + offset.y),
);

export const getOffsetDragWrapper = createSelector(
  getOffsetDragWrapperForX,
  getOffsetDragWrapperForY,
  (x, y) => x.mergeDeep(y),
);

export const getDraggedBlocsUpdate = createSelector(
  getOffsetMousePos,
  getCanvasRatio,
  getDragStartBlocs,
  (offset, ratio, blocs) => blocs.map(
    bloc => fromJS({
      styles: {
        top: bloc.top + offset.y,
        left: (bloc.left + offset.x) * ratio,
      },
    }),
  ),
);

export const getDragWrapperSnapTargetsForX = createSelector(
  getOffsetDragWrapperForX,
  wrapper => wrapper.reduce((targets, x, name) => targets.push(
    new SnapTarget({
      name,
      x,
      origin: new SnapOrigin({ type: 'Bloc' }),
    }),
  ), List()),
);

export const getDragWrapperSnapTargetsForY = createSelector(
  getOffsetDragWrapperForY,
  wrapper => wrapper.reduce((targets, y, name) => targets.push(
    new SnapTarget({
      name,
      y,
      origin: new SnapOrigin({ type: 'Bloc' }),
    }),
  ), List()),
);

