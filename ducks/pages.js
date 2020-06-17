import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { Page } from 'app/records/page';

// TYPES

export const CREATE_PAGE = 'PAGES/CREATE_PAGE';
export const UPDATE_PAGE = 'PAGES/UPDATE_PAGE';
export const SELECT_PAGE = 'PAGES/SELECT_PAGE';
export const DELETE_PAGE = 'PAGES/DELETE_PAGE';

// ACTIONS

export const createPage = page => ({
  type: CREATE_PAGE,
  payload: { page },
});

export const updatePage = (id, updated) => ({
  type: UPDATE_PAGE,
  payload: { id, updated },
});

export const selectPage = id => ({
  type: SELECT_PAGE,
  payload: { id },
});

export const deletePage = id => ({
  type: DELETE_PAGE,
  payload: { id },
});

// STATE

export const initialState = Map({
  1: new Page({
    id: '1',
    name: 'Home',
    url: '/',
    breakpoints: List.of('1'),
  }),
});

// REDUCERS

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PAGE:
      return state.set(payload.page.id, payload.page);
    case UPDATE_PAGE:
      return state.mergeDeepIn(
        [payload.id],
        fromJS(payload.updated),
      );
    case DELETE_PAGE:
      return state.delete(payload.id);
    default:
      return state;
  };
};

// SELECTORS

export const getPages = state => state.get('pages');

export const getPagesUrls = createSelector(
  getPages,
  pages => pages.reduce((pageList, page) => pageList.push(
   fromJS({
     id: page.id,
     name: page.name,
     url: page.url,
   }),
  ), List()),
);
