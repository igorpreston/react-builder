import regeneratorRuntime from 'regenerator-runtime';
import cuid from 'cuid';
import { take, takeEvery, call, put, select } from 'redux-saga/effects';
import * as CanvasSizeDuck from 'app/ducks/canvas/size';
import * as CanvasSelectedDuck from 'app/ducks/canvas/selected';
import * as DrawDuck from 'app/ducks/canvas/draw';
import * as BlocsDuck from 'app/ducks/blocs';
import * as ScrollDuck from 'app/ducks/canvas/scroll';
import * as MouseDuck from 'app/ducks/canvas/mouse';
import { Styles } from 'app/records/styles';
import { Bloc } from 'app/records/bloc';
import { updateStartMousePos, updateCurrentMousePos } from 'app/sagas/canvas/mouse';
import { checkSnapForCurrentX, checkSnapForCurrentY, hideAllSnapLines, resetSnapped } from 'app/sagas/snap';

export default function* drawSaga () {
  while (true) {
    yield take(DrawDuck.DRAW_ENABLE);

    const drawStartAction = yield take(DrawDuck.DRAW_START);

    yield call(
      drawStartSaga,
      drawStartAction,
    );

    yield takeEvery(
      DrawDuck.DRAW_MOVE,
      drawMoveSaga,
    );

    const drawStopAction = yield take(DrawDuck.DRAW_STOP);

    yield call(
      drawStopSaga,
      drawStopAction,
    );
  }
};

export function* drawStartSaga (action) {
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

export function* drawMoveSaga (action) {
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

  
  yield call(checkSnapForCurrentX);
  yield call(checkSnapForCurrentY);
};

export function* drawStopSaga () {
  const bloc  = yield call(composeBlocFromDraw);
  const breakpoint = yield select(CanvasSelectedDuck.getSelectedBreakpointId);

  const createdBloc = yield call(
    BlocsDuck.createBloc,
    bloc,
    breakpoint,
  );

  yield put(createdBloc);

  yield call(disableDraw);

  yield call(hideAllSnapLines);

  yield call(resetSnapped);
};

export function* composeBlocFromDraw () {
  const id = yield call(cuid);
  const name = yield select(DrawDuck.getDrawBrush);
  const dimensions = yield select(DrawDuck.getDrawBloc);
  const pageId = yield select(CanvasSelectedDuck.getSelectedPageId);
  const ratio = yield select(CanvasSizeDuck.getCanvasRatio);

  const styles = new Styles({
    top: dimensions.top,
    left: dimensions.left * ratio,
    width: dimensions.width * ratio,
    height: dimensions.height,
  });

  return new Bloc({
    id,
    name,
    pageId,
    styles,
  });
};

export function* disableDraw () {
  const disabled = yield call(
    DrawDuck.drawDisable,
  );

  yield put(disabled);
};
