import regeneratorRuntime from 'regenerator-runtime';
import { List } from 'immutable';
import { call, put, select } from 'redux-saga/effects';
import * as CanvasSizeDuck from 'app/ducks/canvas/size';
import * as CanvasSelectedDuck from 'app/ducks/canvas/selected';
import * as MouseDuck from 'app/ducks/canvas/mouse';
import * as SnapDuck from 'app/ducks/snap';
import * as DragDuck from 'app/ducks/canvas/drag';
import { SnapLine, SnapTarget, SnapOrigin } from 'app/records/snap';
import { updateCurrentMousePos, updateOffsetMousePos } from 'app/sagas/canvas/mouse';

export function* checkSnapForCurrentX () {
  const current = yield select(MouseDuck.getCurrentMousePos);
  const direction = yield select(MouseDuck.getMouseDirection);
  const isSnapped = yield select(SnapDuck.getIsSnappedX);

  if (isSnapped) {
    const snappedLine = yield select(SnapDuck.getSnappedLineForX);

    const canUnsnapFrom = yield call(
      canUnsnap,
      current.x,
      snappedLine.x,
      snappedLine.sens,
    );

    if (canUnsnapFrom) {
      yield call(unsnapFromX);

      yield call(
        hideSnapLine,
        snappedLine,
      );
    } else {
      yield call(
        updateCurrentMousePos,
        { x: snappedLine.x },
      );
    }
  } else {
    const snapLine = yield call(findSnapLineForCurrentX);

    if (snapLine) {
      yield call(
        snapToX,
        snapLine,
        new SnapTarget({ x: current.x, name: direction.x }),
      );

      yield call(
        showSnapLine,
        snapLine
      );

      yield call(
        updateCurrentMousePos,
        { x: snapLine.x },
      );
    }
  }
};

export function* checkSnapForCurrentY () {
  const current = yield select(MouseDuck.getCurrentMousePos);
  const direction = yield select(MouseDuck.getMouseDirection);
  const isSnapped = yield select(SnapDuck.getIsSnappedY);

  if (isSnapped) {
    const snappedLine = yield select(SnapDuck.getSnappedLineForY);

    const canUnsnapFrom = yield call(
      canUnsnap,
      current.y,
      snappedLine.y,
      snappedLine.sens,
    );

    if (canUnsnapFrom) {
      yield call(unsnapFromY);

      yield call(
        hideSnapLine,
        snappedLine,
      );
    } else {
      yield call(
        updateCurrentMousePos,
        { y: snappedLine.y },
      );
    }
  } else {
    const snapLine = yield call(findSnapLineForCurrentY);

    if (snapLine) {
      yield call(
        snapToY,
        snapLine,
        new SnapTarget({ y: current.y, name: direction.y }),
      );

      yield call(
        showSnapLine,
        snapLine
      );

      yield call(
        updateCurrentMousePos,
        { y: snapLine.y },
      );
    }
  }
};

export function* checkSnapForOffsetX () {
  const offset = yield select(MouseDuck.getOffsetMousePos);
  const isSnapped = yield select(SnapDuck.getIsSnappedX);
  const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);

  if (isSnapped) {
    const snappedLine = yield select(SnapDuck.getSnappedLineForX);
    const snappedTarget = yield select(SnapDuck.getSnappedTargetForX);

    const canUnsnapFrom = yield call(
      canUnsnap,
      dragWrapper.get(snappedTarget.name),
      snappedLine.x,
      snappedLine.sens,
    );

    if (canUnsnapFrom) {
      yield call(unsnapFromX);

      yield call(
        hideSnapLine,
        snappedLine,
      );

      yield call(
        hideSnapLinesForX,
      );
    } else {
      const newOffset = yield call(
        getNewOffset,
        offset.x,
        snappedLine.x,
        dragWrapper.get(snappedTarget.name),
      );

      yield call(
        updateOffsetMousePos,
        { x: newOffset },
      );
    }
  } else {
    let isAlreadySnapped = yield select(SnapDuck.getIsSnappedX);

    const lines = yield select(SnapDuck.getSnapLinesForX);

    const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
    const snapLineForCenter = lines.find(line => canSnap(dragWrapper.get('vCenter'), line.x, line.sens));

    if (snapLineForCenter) {
      yield call(
        snapToX,
        snapLineForCenter,
        new SnapTarget({ x: dragWrapper.get('vCenter'), name: 'vCenter' }),
      );

      yield call(
        showSnapLine,
        snapLineForCenter
      );

      const newOffset = yield call(
        getNewOffset,
        offset.x,
        snapLineForCenter.x,
        dragWrapper.get('vCenter'),
      );

      yield call(
        updateOffsetMousePos,
        { x: newOffset },
      );
    }

    isAlreadySnapped = yield select(SnapDuck.getIsSnappedX);

    if (!isAlreadySnapped) {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const snapLineForLeft = lines.find(line => canSnap(dragWrapper.get('left'), line.x, line.sens));

      if (snapLineForLeft) {
        yield call(
          snapToX,
          snapLineForLeft,
          new SnapTarget({ x: dragWrapper.get('left'), name: 'left' }),
        );

        yield call(
          showSnapLine,
          snapLineForLeft
        );

        const newOffset = yield call(
          getNewOffset,
          offset.x,
          snapLineForLeft.x,
          dragWrapper.get('left'),
        );

        yield call(
          updateOffsetMousePos,
          { x: newOffset },
        );
      }
    } else {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const pseudoSnapLines = yield call(findPseudoSnapLinesForOffsetX, dragWrapper.get('left'), 'left');

      if (!pseudoSnapLines.isEmpty()) {
        yield call(showSnapLines, pseudoSnapLines);
      }
    }

    isAlreadySnapped = yield select(SnapDuck.getIsSnappedX);

    if (!isAlreadySnapped) {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const snapLineForRight = lines.find(line => canSnap(dragWrapper.get('right'), line.x, line.sens));

      if (snapLineForRight) {
        yield call(
          snapToX,
          snapLineForRight,
          new SnapTarget({ x: dragWrapper.get('right'), name: 'right' }),
        );

        yield call(
          showSnapLine,
          snapLineForRight
        );

        const newOffset = yield call(
          getNewOffset,
          offset.x,
          snapLineForRight.x,
          dragWrapper.get('right'),
        );

        yield call(
          updateOffsetMousePos,
          { x: newOffset },
        );
      }
    } else {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const pseudoSnapLines = yield call(findPseudoSnapLinesForOffsetX, dragWrapper.get('right'), 'right');

      if (!pseudoSnapLines.isEmpty()) {
        yield call(showSnapLines, pseudoSnapLines);
      }
    }
  }
};

export function* checkSnapForOffsetY () {
  const offset = yield select(MouseDuck.getOffsetMousePos);
  const isSnapped = yield select(SnapDuck.getIsSnappedY);
  const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);

  if (isSnapped) {
    const snappedLine = yield select(SnapDuck.getSnappedLineForY);
    const snappedTarget = yield select(SnapDuck.getSnappedTargetForY);

    const canUnsnapFrom = yield call(
      canUnsnap,
      dragWrapper.get(snappedTarget.name),
      snappedLine.y,
      snappedLine.sens,
    );

    if (canUnsnapFrom) {
      yield call(unsnapFromY);

      yield call(
        hideSnapLine,
        snappedLine,
      );

      yield call(
        hideSnapLinesForY,
      );
    } else {
      const newOffset = yield call(
        getNewOffset,
        offset.y,
        snappedLine.y,
        dragWrapper.get(snappedTarget.name),
      );

      yield call(
        updateOffsetMousePos,
        { y: newOffset },
      );
    }
  } else {
    let isAlreadySnapped = yield select(SnapDuck.getIsSnappedY);

    const lines = yield select(SnapDuck.getSnapLinesForY);

    const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
    const snapLineForCenter = lines.find(line => canSnap(dragWrapper.get('hCenter'), line.y, line.sens));

    if (snapLineForCenter) {
      yield call(
        snapToY,
        snapLineForCenter,
        new SnapTarget({ x: dragWrapper.get('hCenter'), name: 'hCenter' }),
      );

      yield call(
        showSnapLine,
        snapLineForCenter
      );

      const newOffset = yield call(
        getNewOffset,
        offset.y,
        snapLineForCenter.y,
        dragWrapper.get('hCenter'),
      );

      yield call(
        updateOffsetMousePos,
        { y: newOffset },
      );
    }

    isAlreadySnapped = yield select(SnapDuck.getIsSnappedY);

    if (!isAlreadySnapped) {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const snapLineForTop = lines.find(line => canSnap(dragWrapper.get('top'), line.y, line.sens));

      if (snapLineForTop) {
        yield call(
          snapToY,
          snapLineForTop,
          new SnapTarget({ y: dragWrapper.get('top'), name: 'top' }),
        );

        yield call(
          showSnapLine,
          snapLineForTop
        );

        const newOffset = yield call(
          getNewOffset,
          offset.y,
          snapLineForTop.y,
          dragWrapper.get('top'),
        );

        yield call(
          updateOffsetMousePos,
          { y: newOffset },
        );
      }
    } else {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const pseudoSnapLines = yield call(findPseudoSnapLinesForOffsetY, dragWrapper.get('top'), 'top');

      if (!pseudoSnapLines.isEmpty()) {
        yield call(showSnapLines, pseudoSnapLines);
      }
    }

    isAlreadySnapped = yield select(SnapDuck.getIsSnappedX);

    if (!isAlreadySnapped) {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const snapLineForBottom = lines.find(line => canSnap(dragWrapper.get('bottom'), line.y, line.sens));

      if (snapLineForBottom) {
        yield call(
          snapToY,
          snapLineForBottom,
          new SnapTarget({ y: dragWrapper.get('bottom'), name: 'bottom' }),
        );

        yield call(
          showSnapLine,
          snapLineForBottom
        );

        const newOffset = yield call(
          getNewOffset,
          offset.y,
          snapLineForBottom.y,
          dragWrapper.get('bottom'),
        );

        yield call(
          updateOffsetMousePos,
          { y: newOffset },
        );
      }
    } else {
      const dragWrapper = yield select(DragDuck.getOffsetDragWrapper);
      const pseudoSnapLines = yield call(findPseudoSnapLinesForOffsetY, dragWrapper.get('bottom'), 'bottom');

      if (!pseudoSnapLines.isEmpty()) {
        yield call(showSnapLines, pseudoSnapLines);
      }
    }
  }
};

export function canSnap (coord, line, sens) {
  return Math.abs(coord - line) < sens;
};

export function canUnsnap (coord, line, sens) {
  return Math.abs(coord - line) > sens;
};

export function getNewOffset (coord, line, start) {
  return coord + line - start;
};

export function* snapToX (line, target) {
  const snapped = yield call(
    SnapDuck.snapToX,
    line,
    target,
  );

  yield put(snapped);
};

export function* snapToY (line, target) {
  const snapped = yield call(
    SnapDuck.snapToY,
    line,
    target,
  );

  yield put(snapped);
};

export function* unsnapFromX () {
  const unsnapped = yield call(SnapDuck.unsnapFromX);

  yield put(unsnapped);
};

export function* unsnapFromY () {
  const unsnapped = yield call(SnapDuck.unsnapFromY);

  yield put(unsnapped);
};

export function* showSnapLine (line) {
  const showed = yield call(
    SnapDuck.showSnapLine,
    line,
  );

  yield put(showed);
};

export function* showSnapLines (lines) {
  const showed = yield call(
    SnapDuck.showSnapLines,
    lines,
  );

  yield put(showed);
};

export function* hideSnapLine (line) {
  const hidden = yield call(
    SnapDuck.hideSnapLine,
    line,
  );

  yield put(hidden);
};

export function* hideSnapLinesForX () {
  const hidden = yield call(
    SnapDuck.hideSnapLinesForX,
  );

  yield put(hidden);
};

export function* hideSnapLinesForY () {
  const hidden =  yield call(
    SnapDuck.hideSnapLinesForY,
  );

  yield put(hidden);
};

export function* hideAllSnapLines () {
  const hidden = yield call(
    SnapDuck.hideAllSnapLines,
  );

  yield put(hidden);
};

export function* resetSnapped () {
  const reset = yield call(
    SnapDuck.resetSnapped,
  );

  yield put(reset);
};

export function* findSnapLineForCurrentX () {
  const current = yield select(MouseDuck.getCurrentMousePos);
  const lines = yield select(SnapDuck.getSnapLinesForX);

  return lines.find(line => canSnap(current.x, line.x, line.sens));
};

export function* findSnapLineForCurrentY () {
  const current = yield select(MouseDuck.getCurrentMousePos);
  const lines = yield select(SnapDuck.getSnapLinesForY);

  return lines.find(line => canSnap(current.y, line.y, line.sens));
};

export function* findSnapLineForOffsetX () {
  const targets = yield select(DragDuck.getDragWrapperSnapTargetsForX);
  const lines = yield select(SnapDuck.getSnapLinesForX);

  return lines.find(line => targets.find(target => canSnap(target.x, line.x, line.sens)));
};

export function* findSnapLineForOffsetY () {
  const targets = yield select(DragDuck.getDragWrapperSnapTargetsForY);
  const lines = yield select(SnapDuck.getSnapLinesForY);

  return lines.find(line => targets.find(target => canSnap(target.y, line.y, line.sens)));
};

export function* findPseudoSnapLinesForOffsetX (target, name) {
  const lines = yield select(SnapDuck.getSnapLinesForX);
  return lines.filter(line => canSnap(target, line.x, 1));
};

export function* findPseudoSnapLinesForOffsetY (target, name) {
  const lines = yield select(SnapDuck.getSnapLinesForY);
  return lines.filter(line => canSnap(target, line.y, 1));
};

export function* findSnapTargetForOffsetX () {
  const targets = yield select(DragDuck.getDragWrapperSnapTargetsForX);
  const lines = yield select(SnapDuck.getSnapLinesForX);

  return targets.find(target => lines.find(line => canSnap(target.x, line.x, line.sens)));
};

export function* findSnapTargetForOffsetY () {
  const targets = yield select(DragDuck.getDragWrapperSnapTargetsForY);
  const lines = yield select(SnapDuck.getSnapLinesForY);

  return targets.find(target => lines.find(line => canSnap(target.y, line.y, line.sens)));
};