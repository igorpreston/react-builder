import regeneratorRuntime from 'regenerator-runtime';
import { fromJS } from 'immutable';
import { all, take, takeEvery, call, put, select } from 'redux-saga/effects';
import { Dimensions } from 'app/records/dimensions';
import * as BlocsDuck from 'app/ducks/blocs';
import * as ResizeDuck from 'app/ducks/canvas/resize';
import * as CanvasSizeDuck from 'app/ducks/canvas/size';
import * as CanvasSelectedDuck from 'app/ducks/canvas/selected';
import * as MouseDuck from 'app/ducks/canvas/mouse';
import * as ScrollDuck from 'app/ducks/canvas/scroll';
import { updateStartMousePos, updateCurrentMousePos } from 'app/sagas/canvas/mouse';
import { checkSnapForCurrentX, checkSnapForCurrentY, hideAllSnapLines, resetSnapped } from 'app/sagas/snap';

export default function* resizeSaga () {
  while (true) {
    const resizeStartAction = yield take(ResizeDuck.RESIZE_START);

    yield call(
      resizeStartSaga,
      resizeStartAction,
    );

    yield takeEvery(
      ResizeDuck.RESIZE_MOVE,
      resizeMoveSaga,
    );

    const resizeStopAction = yield take(ResizeDuck.RESIZE_STOP);

    yield call(
      resizeStopSaga,
      resizeStopAction,
    );
  }
};

export function* resizeStartSaga (action) {
  const horDirection = yield select(ResizeDuck.getResizeHorDirection);
  const vertDirection = yield select(ResizeDuck.getResizeVertDirection);

  yield call(setResizeStartBloc);

  let startX = null;
  let startY = null;

  if (horDirection) {
    startX = yield call(getHorDirectionStartX);
  }

  if (vertDirection) {
    startY = yield call(getVertDirectionStartY);
  }

  yield call(
    updateStartMousePos,
    { x: startX, y: startY },
  );

  yield call(
    updateCurrentMousePos,
    { x: startX, y: startY },
  );
};

export function* resizeMoveSaga (action) {
  const horDirection = yield select(ResizeDuck.getResizeHorDirection);
  const vertDirection = yield select(ResizeDuck.getResizeVertDirection);

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

  if (horDirection) {
    yield call(checkSnapForCurrentX);
  }

  if (vertDirection) {
    yield call(checkSnapForCurrentY);
  }

  yield call(updateResizedBloc);

};

export function* resizeStopSaga () {
  yield call(hideAllSnapLines);

  yield call(resetSnapped);
};

export function* getHorDirectionStartX () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const horDirection = yield select(ResizeDuck.getResizeHorDirection);

  if (horDirection === 'left') {
    return bloc.dimensions.left;
  } else if (horDirection === 'right') {
    return bloc.dimensions.left + bloc.dimensions.width;
  }

  return 0;
};

export function* getVertDirectionStartY () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const vertDirection = yield select(ResizeDuck.getResizeVertDirection);

  if (vertDirection === 'top') {
    return bloc.dimensions.top;
  } else if (vertDirection === 'bottom') {
    return yield bloc.dimensions.top + bloc.dimensions.height;
  }

  return 0;
};

export function* makeResizeUpdateForHorDirection () {
  const horDirection = yield select(ResizeDuck.getResizeHorDirection);

  if (horDirection === 'right') {
    return yield call(makeResizeUpdateForRight);
  } else if (horDirection === 'left') {
    return yield call(makeResizeUpdateForLeft);
  }

  return {};
};

export function* makeResizeUpdateForLeft () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const start = yield select(MouseDuck.getStartMousePos);
  const current = yield select(MouseDuck.getCurrentMousePos);
  const ratio = yield select(CanvasSizeDuck.getCanvasRatio);

  if (current.x < (start.x + bloc.dimensions.width)) {
    return {
      left: current.x * ratio,
      width: (bloc.dimensions.width + start.x - current.x) * ratio,
    };
  }

  return {};
};

export function* makeResizeUpdateForRight () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const current = yield select(MouseDuck.getCurrentMousePos);
  const ratio = yield select(CanvasSizeDuck.getCanvasRatio);

  return {
    width: (current.x - bloc.dimensions.left) * ratio,
  };
};

export function* makeResizeUpdateForVertDirection () {
  const vertDirection = yield select(ResizeDuck.getResizeVertDirection);

  if (vertDirection === 'top') {
    return yield call(makeResizeUpdateForTop);
  } else if (vertDirection === 'bottom') {
    return yield call(makeResizeUpdateForBottom);
  }

  return {};
};

export function* makeResizeUpdateForTop () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const start = yield select(MouseDuck.getStartMousePos);
  const current = yield select(MouseDuck.getCurrentMousePos);

  if (current.y < (start.y + bloc.dimensions.height)) {
    return {
      top: current.y,
      height: bloc.dimensions.height + start.y - current.y,
    };
  }

  return {};
};

export function* makeResizeUpdateForBottom () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const current = yield select(MouseDuck.getCurrentMousePos);

  return {
    height: current.y - bloc.dimensions.top,
  };
};

export function* setResizeStartBloc () {
  const blocs = yield select(CanvasSelectedDuck.getSelectedBlocsDimensions);

  const bloc = blocs.map((dimensions, id) => ({
    id,
    dimensions,
  })).first();

  const resizedBloc = yield call(
    ResizeDuck.setResizeStartBloc,
    bloc,
  );

  yield put(resizedBloc);
};

export function* updateResizedBloc () {
  const bloc = yield select(ResizeDuck.getResizeStartBloc);
  const horUpdate = yield call(makeResizeUpdateForHorDirection);
  const vertUpdate = yield call(makeResizeUpdateForVertDirection);

  const updatedBloc = yield call(
    BlocsDuck.updateBloc,
    bloc.id,
    {
      styles: {
        ...horUpdate,
        ...vertUpdate,
      },
    },
  );

  yield put(updatedBloc);
};
