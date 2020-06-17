// TYPES

export const CHANGE_TAB = 'EXPLORER/CHANGE_TAB';

// ACTIONS

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: { tab },
});

// STATE

export const initialState = 'design';

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_TAB:
      return payload.tab;
    default:
      return state;
  };
};

// SELECTORS

export const getExplorerTab = state => state.get('explorer').get('tab');