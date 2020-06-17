import React from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import DrawBloc from './DrawBloc';
import { getCanDraw, getIsDrawing, drawStart, drawMove, drawStop } from 'app/ducks/canvas/draw';

const mapStateToProps = state => ({
  canDraw: getCanDraw(state),
  isDrawing: getIsDrawing(state),
});

const mapDispatchToProps = dispatch => ({
  onDrawStart: e => dispatch(drawStart(e.pageX, e.pageY)),
  onDrawMove: e => dispatch(drawMove(e.pageX, e.pageY)),
  onDrawStop: () => dispatch(drawStop()),
});

export const DrawSurface = ({
  canDraw,
  isDrawing,
  onDrawStart,
  onDrawMove,
  onDrawStop,
}) => canDraw ? (
  <Surface>
    {isDrawing ?
      <DrawBloc />
    : null}
    {canDraw ?
      <EventListener
        target="canvas"
        onMouseDown={onDrawStart}
      />
    : null}
    {isDrawing ?
      <EventListener
        target="window"
        onMouseMoveCapture={onDrawMove}
      />
    : null}
    {isDrawing ?
      <EventListener
        target="window"
        onMouseUpCapture={onDrawStop}
      />
    : null}
  </Surface>
) : null;

const DrawSurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawSurface);

DrawSurfaceContainer.displayName = 'DrawSurfaceContainer';

export default DrawSurfaceContainer;
