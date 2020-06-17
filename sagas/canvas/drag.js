import regeneratorRuntime from 'regenerator-runtime';
import { take, takeEvery, call, put, select } from 'redux-saga/effects';
import * as DragDuck from 'app/ducks/canvas/drag';
import * as CanvasSizeDuck from 'app/ducks/canvas/size';
import * as CanvasSelectedDuck from 'app/ducks/canvas/selected';
import * as ScrollDuck from 'app/ducks/canvas/scroll';
import * as MouseDuck from 'app/ducks/canvas/mouse';
import * as BlocsDuck from 'app/ducks/blocs';
import { updateStartMousePos, updateCurrentMousePos, updateOffsetMousePos } from 'app/sagas/canvas/mouse';
import { checkSnapForOffsetX, checkSnapForOffsetY, hideAllSnapLines, resetSnapped } from 'app/sagas/snap';

export default function* dragSaga () {
  while (true) {
    const dragStartAction = yield take(DragDuck.DRAG_START);

    yield call(
      dragStartSaga,
      dragStartAction,
    );

    yield takeEvery(
      DragDuck.DRAG_MOVE,
      dragMoveSaga,
    );

    const dragStopAction = yield take(DragDuck.DRAG_STOP);

    yield call(
      dragStopSaga,
      dragStopAction,
    );
  }
};

export function* dragStartSaga (action) {
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

  yield call(
    setDragStartBlocs,
  );
};

export function* dragMoveSaga (action) {
  const start = yield select(MouseDuck.getStartMousePos);

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

  yield call(
    updateOffsetMousePos,
    { x: currentX - start.x, y: currentY - start.y },
  );

  yield call(checkSnapForOffsetX);
  yield call(checkSnapForOffsetY);

  yield call(
    updateDraggedBlocs,
  );
};

export function* dragStopSaga () {
  yield call(hideAllSnapLines);

  yield call(resetSnapped);
};

export function* setDragStartBlocs () {
  const dragStartBlocs = yield select(CanvasSelectedDuck.getSelectedBlocsDimensions);

  const set = yield call(
    DragDuck.setDragStartBlocs,
    dragStartBlocs,
  );

  yield put(set);
};

export function* updateDraggedBlocs () {
  const draggedBlocs = yield select(DragDuck.getDraggedBlocsUpdate);

  const updated = yield call(
    BlocsDuck.updateBlocs,
    draggedBlocs,
  );

  yield put(updated);
};
