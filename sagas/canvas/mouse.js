import regeneratorRuntime from 'regenerator-runtime';
import { call, put } from 'redux-saga/effects';
import * as MouseDuck from 'app/ducks/canvas/mouse';

export function* updateStartMousePos (pos) {
  const updated = yield call(
    MouseDuck.updateStartMousePos,
    pos,
  );

  yield put(updated);
};

export function* updateCurrentMousePos (pos) {
  const updated = yield call(
    MouseDuck.updateCurrentMousePos,
    pos,
  );

  yield put(updated);
};

export function* updateOffsetMousePos (pos) {
  const updated = yield call(
    MouseDuck.updateOffsetMousePos,
    pos,
  );

  yield put(updated);
};
