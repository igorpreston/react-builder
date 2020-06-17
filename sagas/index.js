import regeneratorRuntime from 'regenerator-runtime';
import { all, spawn } from 'redux-saga/effects';
import canvasSaga from './canvas';
import webfontSaga from './webfont';

export default function* rootSaga () {
  yield all([
    spawn(canvasSaga),
    spawn(webfontSaga),
  ]);
};
