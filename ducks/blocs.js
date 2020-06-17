import { Map, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { Dimensions } from 'app/records/dimensions';
import { getCanvasRatio } from 'app/ducks/canvas/size';
import {
  TEXT_EDITOR_INIT,
  TEXT_EDITOR_SELECTION_CHANGE,
  TEXT_EDITOR_CONTENT_CHANGE,
} from './textEditor';

// TYPES

export const CREATE_BLOC = 'BLOCS/CREATE_BLOC';
export const CREATE_BLOCS = 'BLOCS/CREATE_BLOCS';
export const UPDATE_BLOC = 'BLOCS/UPDATE_BLOC';
export const UPDATE_BLOCS = 'BLOCS/UPDATE_BLOCS';
export const DELETE_BLOC = 'BLOCS/DELETE_BLOC';
export const DELETE_BLOCS = 'BLOCS/DELETE_BLOCS';

// ACTIONS

export const createBloc = (bloc, breakpoint) => ({
  type: CREATE_BLOC,
  payload: { bloc, breakpoint },
});

export const createBlocs = blocs => ({
  type: CREATE_BLOCS,
  payload: { blocs },
});

export const updateBloc = (id, updated) => ({
  type: UPDATE_BLOC,
  payload: { id, updated },
});

export const updateBlocs = blocs => ({
  type: UPDATE_BLOCS,
  payload: { blocs },
});

export const deleteBloc = id => ({
  type: DELETE_BLOC,
  payload: { id },
});

export const deleteBlocs = ids => ({
  type: DELETE_BLOCS,
  payload: { ids },
});

// STATE

export const initialState = Map();

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BLOC:
      return state.set(payload.bloc.id, payload.bloc);
    case CREATE_BLOCS:
      return payload.blocs.reduce((blocs, bloc) => blocs.set(bloc.id, bloc), state);
    case UPDATE_BLOC:
      return state.mergeDeepIn(
        [payload.id],
        fromJS(payload.updated),
      );
    case UPDATE_BLOCS:
      return state.mergeDeep(fromJS(payload.blocs));
    case DELETE_BLOC:
      return state.delete(payload.id);
    case DELETE_BLOCS:
      return payload.ids.reduce((blocs, id) => blocs.delete(id), state);
    case TEXT_EDITOR_INIT:
      return state.setIn(
        [payload.id, 'text', 'editor'],
        payload.editor,
      );
    case TEXT_EDITOR_SELECTION_CHANGE:
      return state.setIn(
        [payload.id, 'text', 'selection'],
        payload.newSelection,
      );
    case TEXT_EDITOR_CONTENT_CHANGE:
      return state.setIn(
        [payload.id, 'text', 'content'],
        payload.newContent,
      );
    default:
      return state;
  };
};

// SELECTORS

export const getBlocs = state => state.get('blocs');

export const getResponsiveBlocs = createSelector(
  getCanvasRatio,
  getBlocs,
  (ratio, blocs) => blocs.map(
    bloc => bloc.set(
      'dimensions',
      new Dimensions({
        top: bloc.styles.top,
        left: bloc.styles.left / ratio,
        width: bloc.styles.width / ratio,
        height: bloc.styles.height,
      }),
    ),
  ),
);

export const innerFullInclusion = (inner, outer) => {
  if (
    inner.top > outer.top &&
    inner.top + inner.height <
    outer.top + outer.height &&
    inner.left > outer.left &&
    inner.left + inner.width <
    outer.left + outer.width
  ) {
    return true;
  }
  return false;
};

export const outerFullInclusion = (outer, inner) => {
  if (
    outer.top < inner.top &&
    outer.top + outer.height >
    inner.top + inner.height &&
    outer.left < inner.left &&
    outer.left + outer.width >
    inner.left + inner.width
  ) {
    return true;
  }
  return false;
};
