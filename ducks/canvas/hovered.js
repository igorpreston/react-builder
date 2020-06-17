import { createSelector } from 'reselect';
import { getResponsiveBlocs } from 'app/ducks/blocs';

// TYPES

export const HOVER_BLOC = 'CANVAS/HOVER_BLOC';

// ACTIONS

export const hoverBloc = id => ({
  type: HOVER_BLOC,
  payload: { id },
});

// STATE

export const initialState = null;

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HOVER_BLOC:
      return payload.id;
    default:
      return state;
  };
};

// SELECTORS

export const getHoveredBlocId = state => state.get('canvas').get('hovered');

export const getHoveredBloc = createSelector(
  getHoveredBlocId,
  getResponsiveBlocs,
  (id, blocs) => blocs.get(id),
);