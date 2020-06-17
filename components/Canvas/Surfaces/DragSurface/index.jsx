import React from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import { getCanDrag, getIsDragging, dragMove, dragStop } from 'app/ducks/canvas/drag';

const mapStateToProps = state => ({
  canDrag: getCanDrag(state),
  isDragging: getIsDragging(state),
});

const mapDispatchToProps = dispatch => ({
  onDragMove: e => dispatch(dragMove(e.pageX, e.pageY)),
  onDragStop: () => dispatch(dragStop()),
});

export const DragSurface = ({
  canDrag,
  isDragging,
  onDragMove,
  onDragStop,
}) => canDrag ? (
  <Surface>
    {isDragging ?
      <EventListener
        target="window"
        onMouseMoveCapture={onDragMove}
      />
    : null}
    {isDragging ?
      <EventListener
        target="window"
        onMouseUpCapture={onDragStop}
      />
    : null}
  </Surface>
) : null;

const DragSurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DragSurface);

DragSurfaceContainer.displayName = 'DragSurfaceContainer';

export default DragSurfaceContainer;
