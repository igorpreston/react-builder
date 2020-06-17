import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import { SnapLine, SnapTarget, SnapOrigin, SnapDraw } from 'app/records/snap';
import { getPages } from 'app/ducks/pages';
import { getResponsiveBlocs } from 'app/ducks/blocs';
import { getBreakpoints } from 'app/ducks/breakpoints';
import { CREATE_BLOC, CREATE_BLOCS } from 'app/ducks/blocs';

// TYPES

export const SELECT_PAGE = 'CANVAS/SELECT_PAGE';
export const SELECT_BLOC = 'CANVAS/SELECT_BLOC';
export const SELECT_BLOCS = 'CANVAS/SELECT_BLOCS';
export const DESELECT_BLOC = 'CANVAS/DESELECT_BLOC';
export const DESELECT_ALL_BLOCS = 'CANVAS/DESELECT_ALL_BLOCS';
export const SELECT_BREAKPOINT = 'CANVAS/SELECT_BREAKPOINT';

// ACTIONS

export const selectPage = id => ({
  type: SELECT_PAGE,
  payload: { id },
});

export const selectBloc = (id, replace = true) => ({
  type: SELECT_BLOC,
  payload: { id, replace },
});

export const selectBlocs = ids => ({
  type: SELECT_BLOCS,
  payload: { ids },
});

export const deselectBloc = id => ({
  type: DESELECT_BLOC,
  payload: { id },
});

export const deselectAllBlocs = () => ({
  type: DESELECT_ALL_BLOCS,
});

export const selectBreakpoint = id => ({
  type: SELECT_BREAKPOINT,
});

// STATE

export const blocsState = Map();
export const pageState = '1';
export const breakpointState = '1';

// REDUCERS

export function blocsReducer (state = blocsState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BLOC:
      return Map({ [payload.bloc.id]: payload.bloc.id });
    case CREATE_BLOCS:
      return payload.blocs.reduce((blocs, bloc) => blocs.set(bloc.id, bloc.id), Map());
    case SELECT_BLOC:
      return payload.replace ? Map({ [payload.id]: payload.id }) : state.set(payload.id, payload.id);
    case SELECT_BLOCS:
      return payload.ids;
    case DESELECT_BLOC:
      return state.delete(payload.id);
    case DESELECT_ALL_BLOCS:
      return blocsState;
    default:
      return state;
  };
};

export function pageReducer (state = pageState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};

export function breakpointReducer (state = breakpointState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};

export default combineReducers({
  blocs: blocsReducer,
  page: pageReducer,
  breakpoint: breakpointReducer,
});

// SELECTORS

export const getSelectedBlocIds = state => state.get('canvas').get('selected').get('blocs');

export const makeGetIsBlocSelected = id => createSelector(
  getSelectedBlocIds,
  ids => ids.has(id),
);

export const getSelectedPageId = state => state.get('canvas').get('selected').get('page');

export const getSelectedPage = createSelector(
  getSelectedPageId,
  getPages,
  (id, pages) => pages.get(id),
);

export const getSelectedPageBreakpointIds = createSelector(
  getSelectedPage,
  page => page.breakpoints,
);

export const getSelectedPageBreakpoints = createSelector(
  getSelectedPageBreakpointIds,
  getBreakpoints,
  (ids, breakpoints) => ids.map(id => breakpoints.get(id)),
);

export const getSelectedBreakpointId = state => state.get('canvas').get('selected').get('breakpoint');

export const getSelectedBreakpoint = createSelector(
  getSelectedBreakpointId,
  getBreakpoints,
  (id, breakpoints) => breakpoints.get(id),
);

export const getSelectedBreakpointBlocIds = createSelector(
  getSelectedBreakpoint,
  breakpoint => breakpoint.blocs,
);

export const getSelectedBreakpointBlocs = createSelector(
  getSelectedBreakpointBlocIds,
  getResponsiveBlocs,
  (ids, blocs) => ids.reduce((breakpointBlocs, id) => breakpointBlocs.set(id, blocs.get(id)), Map()),
);

export const getSelectedBreakpointOrderedBlocs = createSelector(
  getSelectedBreakpointBlocIds,
  getSelectedBreakpointBlocs,
  (ids, blocs) => ids.map(id => blocs.get(id)),
);

export const getSelectedBlocs = createSelector(
  getSelectedBlocIds,
  getSelectedBreakpointBlocs,
  (ids, blocs) => ids.map(id => blocs.get(id)),
);

export const getIsSingleBlocSelected = createSelector(
  getSelectedBlocIds,
  ids => ids.size === 1,
);

export const getSingleSelectedBloc = createSelector(
  getSelectedBlocs,
  blocs => blocs.first(),
);

export const getAreAllBlocsOfTypeRichText = createSelector(
  getSelectedBlocs,
  blocs => !blocs.isEmpty() && blocs.every(bloc => bloc.name === 'Rich Text'),
);

export const getSelectedBlocsDimensions = createSelector(
  getSelectedBlocs,
  blocs => blocs.map(bloc => bloc.dimensions),
);

export const getBlocsExceptSelected = createSelector(
  getSelectedBlocIds,
  getSelectedBreakpointBlocs,
  (ids, blocs) => blocs.filter(bloc => !ids.has(bloc.id)),
);

export const getSelectedBlocsDimensionsForX = createSelector(
  getSelectedBlocs,
  blocs => blocs.map(bloc => Map({
    left: bloc.dimensions.left,
    right: bloc.dimensions.left + bloc.dimensions.width,
    vCenter: bloc.dimensions.left + bloc.dimensions.width / 2,
  })),
);

export const getSelectedBlocsDimensionsForY = createSelector(
  getSelectedBlocs,
  blocs => blocs.map(bloc => Map({
    top: bloc.dimensions.top,
    bottom: bloc.dimensions.top + bloc.dimensions.height,
    hCenter: bloc.dimensions.top + bloc.dimensions.height / 2,
  })),
);

export const getBlocsDimensionsForX = createSelector(
  getBlocsExceptSelected,
  blocs => blocs.map(bloc => Map({
    left: bloc.dimensions.left,
    right: bloc.dimensions.left + bloc.dimensions.width,
    vCenter: bloc.dimensions.left + bloc.dimensions.width / 2,
  })),
)

export const getBlocsDimensionsForY = createSelector(
  getBlocsExceptSelected,
  blocs => blocs.map(bloc => Map({
    top: bloc.dimensions.top,
    bottom: bloc.dimensions.top + bloc.dimensions.height,
    hCenter: bloc.dimensions.top + bloc.dimensions.height / 2,
  })),
);

export const getBlocsSnapLinesForX = createSelector(
  getBlocsDimensionsForX,
  blocs => blocs.map((dimensions, id) => dimensions.reduce((lines, x, source) => lines.push(
    new SnapLine({
      x,
      source,
      origin: new SnapOrigin({ id, type: 'Bloc' }),
      draw: List.of(
        new SnapDraw({
          type: 'line',
          x,
        }),
      ),
      sens: 5,
    }),
  ), List())),
);

export const getFlattenedBlocsSnapLinesForX = createSelector(
  getBlocsSnapLinesForX,
  blocs => blocs.reduce((lines, bloc) => lines.concat(bloc), List()),
);

export const getBlocsSnapLinesForY = createSelector(
  getBlocsDimensionsForY,
  blocs => blocs.map((dimensions, id) => dimensions.reduce((lines, y, source) => lines.push(
    new SnapLine({
      y,
      source,
      origin: new SnapOrigin({ id, type: 'Bloc' }),
      draw: List.of(
        new SnapDraw({
          type: 'line',
          y,
        }),
      ),
      sens: 5,
    }),
  ), List())),
);

export const getFlattenedBlocsSnapLinesForY = createSelector(
  getBlocsSnapLinesForY,
  blocs => blocs.reduce((lines, bloc) => lines.concat(bloc), List()),
);