import { List } from 'immutable';

// TYPES

export const ADD_FONT_TO_LOG = 'LOGS/ADD_FONT_TO_LOG';

// ACTIONS

export const addFontToLog = font => ({
  type: ADD_FONT_TO_LOG,
  payload: { font },
});

// STATE

export const initialState = List();

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_FONT_TO_LOG: {
      if (state.includes(payload.font)) {
        return state.delete(state.indexOf(payload.font)).push(payload.font);
      } else if (state.size >= 12) {
        return state.shift().push(payload.font);
      } else {
        return state.push(payload.font);
      }
    }
    default:
      return state;
  };
};

// SELECTORS

export const getRecentlyUsedFonts = state => state.get('logs').get('fonts');