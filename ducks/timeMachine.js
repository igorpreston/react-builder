import { combineReducers } from 'redux-immutable';
import { Stack } from 'immutable';
import { createSelector } from 'reselect';

// TYPES

export const UNDO = 'TIME_MACHINE/UNDO';
export const REDO = 'TIME_MACHINE/REDO';

// ACTIONS

export const undo = () => ({
  type: UNDO,
});

export const redo = () => ({
  type: REDO,
});

// STATE

export const initialState = Stack();

// REDUCERS

export function undoReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};

export function redoReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  };
};

export default combineReducers({
  undo: undoReducer,
  redo: redoReducer,
});

// SELECTORS

export const getUndoStack = state => state.get('timeMachine').get('stacks').get('undo');
export const getRedoStack = state => state.get('timeMachine').get('stacks').get('redo');
export const getLastUndoAction = createSelector(
  getUndoStack,
  undo => undo.peek(),
);