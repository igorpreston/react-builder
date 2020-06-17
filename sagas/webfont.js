import regeneratorRuntime from 'regenerator-runtime';
import { take, put, call, select } from 'redux-saga/effects';
import WebFont from 'webfontloader';
import { store } from 'client/client.dev';
import * as WebfontDuck from 'app/ducks/fonts';

export default function* webfontSaga () {
  while (true) {
    const action = yield take(WebfontDuck.WEBFONT_LOAD);
    const loadedFonts = yield select(WebfontDuck.getLoadedFonts);
    const filteredFonts = action.payload.fonts.filter(font => !loadedFonts.has(font));
    if (filteredFonts.length >= 1) {
      yield call(loadFonts, filteredFonts);
    }
  }
};

export function* loadFonts (fonts) {
  WebFont.load({
    google: {
      families: fonts,
    },
    fontinactive: fontNotLoaded,
    fontactive: fontHasLoaded,
    fontloading: fontIsLoading,   
  });
};

export function fontIsLoading (name, fvd) {
  const action = WebfontDuck.webfontIsLoading(name);
  store.dispatch(action);
};

export function fontHasLoaded (name, fvd) {
  const action = WebfontDuck.webfontHasLoaded(name);
  store.dispatch(action);
};

export function fontNotLoaded (name, fvd) {
  const action = WebfontDuck.webfontNotLoaded(name);
  store.dispatch(action);
};