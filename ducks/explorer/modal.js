// TYPES

export const OPEN_MODAL = 'EXPLORER/OPEN_MODAL';
export const CLOSE_MODAL = 'EXPLORER/CLOSE_MODAL';

// ACTIONS

export const openModal = modal => ({
  type: OPEN_MODAL,
  payload: { modal },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

// STATE

export const initialState = null;

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return payload.modal
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  };
};

// SELECTORS

export const getExplorerModal = state => state.get('explorer').get('modal');