import React from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import { getCanResize, getIsResizing, resizeMove, resizeStop } from 'app/ducks/canvas/resize';

const mapStateToProps = state => ({
  canResize: getCanResize(state),
  isResizing: getIsResizing(state),
});

const mapDispatchToProps = dispatch => ({
  onResizeMove: e => dispatch(resizeMove(e.pageX, e.pageY)),
  onResizeStop: () => dispatch(resizeStop()),
});

export const ResizeSurface = ({
  canResize,
  isResizing,
  onResizeMove,
  onResizeStop,
}) => canResize ? (
  <Surface>
    {isResizing ?
      <EventListener
        target="window"
        onMouseMoveCapture={onResizeMove}
      />
    : null}
    {isResizing ?
      <EventListener
        target="window"
        onMouseUpCapture={onResizeStop}
      />
    : null}
  </Surface>
) : null;

const ResizeSurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResizeSurface);

ResizeSurfaceContainer.displayName = 'ResizeSurfaceContainer';

export default ResizeSurfaceContainer;
