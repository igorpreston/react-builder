import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { Breakpoint } from 'app/records/breakpoint';
import { CREATE_BLOC } from 'app/ducks/blocs';

// TYPES

export const CREATE_BREAKPOINT = 'BREAKPOINTS/CREATE_BREAKPOINT';
export const UPDATE_BREAKPOINT = 'BREAKPOINTS/UPDATE_BREAKPOINT';
export const DELETE_BREAKPOINT = 'BREAKPOINTS/DELETE_BREAKPOINT';

// ACTIONS

export const createBreakpoint = breakpoint => ({
  type: CREATE_BREAKPOINT,
  payload: { breakpoint },
});

export const updateBreakpoint = (id, updated) => ({
  type: UPDATE_BREAKPOINT,
  payload: { id, updated },
});

export const deleteBreakpoint = id => ({
  type: DELETE_BREAKPOINT,
  payload: { id },
});

// STATE

export const initialState = Map({
  '1': new Breakpoint({
    id: '1',
    pageId: '1',
  }),
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BLOC:
      return state.setIn(
        [payload.breakpoint, 'blocs'],
        state.getIn([payload.breakpoint, 'blocs']).push(payload.bloc.id),
      );
    default:
      return state;
  };
};

// SELECTORS

export const getBreakpoints = state => state.get('breakpoints');
