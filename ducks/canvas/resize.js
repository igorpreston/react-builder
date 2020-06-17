import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { getStartMousePos, getCurrentMousePos } from './mouse';

// TYPES

export const RESIZE_ENABLE = 'CANVAS/RESIZE_ENABLE';
export const RESIZE_START = 'CANVAS/RESIZE_START';
export const RESIZE_MOVE = 'CANVAS/RESIZE_MOVE';
export const RESIZE_STOP = 'CANVAS/RESIZE_STOP';
export const RESIZE_DISABLE = 'CANVAS/RESIZE_DISABLE';
export const SET_RESIZE_START_BLOC = 'CANVAS/SET_RESIZE_START_BLOC';

// ACTIONS

export const resizeEnable = () => ({
  type: RESIZE_ENABLE,
});

export const resizeStart = (x, y, hor, vert) => ({
  type: RESIZE_START,
  payload: { x, y, hor, vert },
});

export const resizeMove = (x, y) => ({
  type: RESIZE_MOVE,
  payload: { x, y },
});

export const resizeStop = () => ({
  type: RESIZE_STOP,
});

export const resizeDisable = () => ({
  type: RESIZE_DISABLE,
});

export const setResizeStartBloc = bloc => ({
  type: SET_RESIZE_START_BLOC,
  payload: { bloc },
});

// STATE

export const initialState = Map({
  canResize: true,
  isResizing: false,
  hor: null,
  vert: null,
  bloc: null,
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RESIZE_ENABLE:
      return state.set('canResize', true);
    case RESIZE_START:
      return state.withMutations(resize => resize.set('isResizing', true).set('hor', payload.hor).set('vert', payload.vert));
    case SET_RESIZE_START_BLOC:
      return state.set('bloc', payload.bloc);
    case RESIZE_STOP:
      return initialState;
    case RESIZE_DISABLE:
      return initialState;
    default:
      return state;
  };
};

// SELECTORS

export const getCanResize = state => state.get('canvas').get('resize').get('canResize');
export const getIsResizing = state => state.get('canvas').get('resize').get('isResizing');

export const getResizeStartBloc = state => state.get('canvas').get('resize').get('bloc');

export const getResizeHorDirection = state => state.get('canvas').get('resize').get('hor');
export const getResizeVertDirection = state => state.get('canvas').get('resize').get('vert');
