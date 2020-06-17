import regeneratorRuntime from 'regenerator-runtime';
import { take, takeEvery, call, put, select } from 'redux-saga/effects';
import * as SelectDuck from 'app/ducks/canvas/select';
import * as CanvasSizeDuck from 'app/ducks/canvas/size';
import * as CanvasSelectedDuck from 'app/ducks/canvas/selected';
import * as ScrollDuck from 'app/ducks/canvas/scroll';
import * as BlocsDuck from 'app/ducks/blocs';
import * as MouseDuck from 'app/ducks/canvas/mouse';
import { updateStartMousePos, updateCurrentMousePos } from 'app/sagas/canvas/mouse';

export default function* selectSaga () {
  while (true) {
    yield take(SelectDuck.SELECT_ENABLE);

    const selectStartAction = yield take(SelectDuck.SELECT_START);

    yield call(
      selectStartSaga,
      selectStartAction,
    );

    yield takeEvery(
      SelectDuck.SELECT_MOVE,
      selectMoveSaga,
    );

    const selectStopAction = yield take(SelectDuck.SELECT_STOP);

    yield call(
      selectStopSaga,
      selectStopAction,
    );
  }
};

export function* selectStartSaga (action) {
  const startX = yield call(
    MouseDuck.getCanvasMousePos,
    action.payload.x,
    yield select(CanvasSizeDuck.getCanvasLeft),
    yield select(ScrollDuck.getScrollX),
  );

  const startY = yield call(
    MouseDuck.getCanvasMousePos,
    action.payload.y,
    yield select(CanvasSizeDuck.getCanvasTop),
    yield select(ScrollDuck.getScrollY),
  );

  yield call(
    updateStartMousePos,
    { x: startX, y: startY },
  );

  yield call(
    updateCurrentMousePos,
    { x: startX, y: startY },
  );
};

export function* selectMoveSaga (action) {
  const currentX = yield call(
    MouseDuck.getCanvasMousePos,
    action.payload.x,
    yield select(CanvasSizeDuck.getCanvasLeft),
    yield select(ScrollDuck.getScrollX),
  );

  const currentY = yield call(
    MouseDuck.getCanvasMousePos,
    action.payload.y,
    yield select(CanvasSizeDuck.getCanvasTop),
    yield select(ScrollDuck.getScrollY),
  );

  yield call(
    updateCurrentMousePos,
    { x: currentX, y: currentY },
  );

  const selectedBlocIds = yield call(getBlocsInsideSelectArea);

  yield call(
    selectBlocs,
    selectedBlocIds,
  );
};

export function* selectStopSaga () {
  yield call(disableSelect);
};

export function* disableSelect () {
  const disabled = yield call(SelectDuck.selectDisable);

  yield put(disabled);
};

export function* getBlocsInsideSelectArea () {
  const selectBloc = yield select(SelectDuck.getSelectBloc);
  const blocs = yield select(CanvasSelectedDuck.getSelectedBreakpointBlocs);

  return blocs.filter(
    bloc => BlocsDuck.outerFullInclusion(
      selectBloc,
      bloc.dimensions,
    )
  ).map(bloc => bloc.id);
};

export function* selectBlocs (ids) {
  const selected = yield call(
    CanvasSelectedDuck.selectBlocs,
    ids,
  );

  yield put(selected);
};
