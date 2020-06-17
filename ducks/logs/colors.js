import { List } from 'immutable';

// TYPES

export const ADD_COLOR_TO_LOG = 'LOGS/ADD_COLOR_TO_LOG';

// ACTIONS

export const addColorToLog = color => ({
  type: ADD_COLOR_TO_LOG,
  payload: { color },
});

// STATE

export const initialState = List();

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COLOR_TO_LOG: {
      if (state.includes(payload.color)) {
        return state.delete(state.indexOf(payload.color)).push(payload.color);
      } else if (state.size >= 12) {
        return state.shift().push(payload.color);
      } else {
        return state.push(payload.color);
      }
    }
    default:
      return state;
  };
};

// SELECTORS

export const getRecentlyUsedColors = state => state.get('logs').get('colors');