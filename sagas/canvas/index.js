import regeneratorRuntime from 'regenerator-runtime';
import { all, spawn } from 'redux-saga/effects';
import drawSaga from './draw';
import selectSaga from './select';
import dragSaga from './drag';
import resizeSaga from './resize';

export default function* canvasSaga () {
  yield all([
    spawn(drawSaga),
    spawn(selectSaga),
    spawn(dragSaga),
    spawn(resizeSaga),
  ]);
};
