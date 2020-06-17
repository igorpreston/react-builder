import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import fonts from 'google-fonts-complete';

// TYPES

export const WEBFONT_LOAD = 'WEBFONT/LOAD';
export const WEBFONT_IS_LOADING = 'WEBFONT/IS_LOADING';
export const WEBFONT_HAS_LOADED = 'WEBFONT/HAS_LOADED';
export const WEBFONT_NOT_LOADED = 'WEBFONT/NOT_LOADED';
export const WEBFONT_UPDATE_SEARCH_FILTER = 'WEBFONT/UPDATE_SEARCH_FILTER';

// ACTIONS

export const webfontLoad = (fonts) => ({
  type: WEBFONT_LOAD,
  payload: { fonts },
});

export const webfontIsLoading = (font) => ({
  type: WEBFONT_IS_LOADING,
  payload: { font },
});

export const webfontHasLoaded = (font) => ({
  type: WEBFONT_HAS_LOADED,
  payload: { font },
});

export const webfontNotLoaded = (font) => ({
  type: WEBFONT_NOT_LOADED,
  payload: { font },
});

export const webfontUpdateSearchFilter = filter => ({
  type: WEBFONT_UPDATE_SEARCH_FILTER,
  payload: { filter },
});

// STATE

export const googleState = fromJS(fonts);

export const loadedState = fromJS({});

export const loadingState = fromJS({});

export const failedState = fromJS({});

export const searchFilterState = '';

// REDUCERS

export function loadingReducer (state = loadingState, action) {
  const { type, payload } = action;
  switch (type) {
    case WEBFONT_IS_LOADING:
      return state.set(payload.font, payload.font);
    case WEBFONT_HAS_LOADED:
      return state.delete(payload.font);
    case WEBFONT_NOT_LOADED:
      return state.delete(payload.font);
    default:
      return state;
  };
};

export function loadedReducer (state = loadedState, action) {
  const { type, payload } = action;
  switch (type) {
    case WEBFONT_HAS_LOADED:
      return state.set(payload.font, payload.font);
    default:
      return state;
  };
};

export function googleReducer (state = googleState, action) {
  const { type, payload } = action;
  switch (type) {
    case WEBFONT_NOT_LOADED:
      return state.delete(payload.font);
    default:
      return state;
  };
};

export function failedReducer (state = failedState, action) {
  const { type, payload } = action;
  switch (type) {
    case WEBFONT_NOT_LOADED:
      return state.set(payload.font, payload.font);
    default:
      return state;
  };
};

export function searchFilterReducer (state = searchFilterState, action) {
  const { type, payload } = action;
  switch (type) {
    case WEBFONT_UPDATE_SEARCH_FILTER:
      return payload.filter;
    default:
      return state;
  };
};

export default combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  failed: failedReducer,
  searchFilter: searchFilterReducer,
  google: googleReducer,
});

// SELECTORS

export const getLoadingFonts = state => state.get('fonts').get('loading');
export const getLoadedFonts = state => state.get('fonts').get('loaded');
export const getFailedFonts = state => state.get('fonts').get('failed');

export const getGoogleFonts = state => state.get('fonts').get('google');

export const getFontSearchFilter = state => state.get('fonts').get('searchFilter');

export const getFontList = createSelector(
  getGoogleFonts,
  getFontSearchFilter,
  (fonts, searchFilter) => {
    const fontNames = fonts.keySeq().toList();
    if (searchFilter && searchFilter.length >= 1) {
      const filteredFonts = fontNames.filter(font => font.search(new RegExp(searchFilter, 'i')) !== -1);

      console.log(filteredFonts);
      console.log(filteredFonts.size);
      return filteredFonts;
    } else {
      console.log(fontNames);
      console.log(fontNames.size);
      return fontNames;
    }
  },
);

export const getFontIndex = (state, index) => index;

export const getFontNameByIndex = createSelector(
  getFontList,
  getFontIndex,
  (fonts, index) => fonts.get(index),
);

export const getFontByIndex = createSelector(
  getGoogleFonts,
  getFontNameByIndex,
  (fonts, name) => fonts.get(name).set('name', name),
);

export const getFontListLength = createSelector(
  getFontList,
  fonts => fonts.size,
);

export const getIsFontLoading = createSelector(
  getLoadingFonts,
  getFontByIndex,
  (fonts, font) => fonts.has(font.get('name')),
);

export const getHasFontLoaded = createSelector(
  getLoadedFonts,
  getFontByIndex,
  (fonts, font) => fonts.has(font.get('name')),
);

export const getHasFontFailed = createSelector(
  getFailedFonts,
  getFontByIndex,
  (fonts, font) => fonts.has(font.get('name')),
);