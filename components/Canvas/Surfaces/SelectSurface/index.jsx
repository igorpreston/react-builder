import React from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import SelectBloc from './SelectBloc';
import { getCanSelect, getIsSelecting, selectStart, selectMove, selectStop } from 'app/ducks/canvas/select';

const mapStateToProps = state => ({
  canSelect: getCanSelect(state),
  isSelecting: getIsSelecting(state),
});

const mapDispatchToProps = dispatch => ({
  onSelectStart: e => dispatch(selectStart(e.pageX, e.pageY)),
  onSelectMove: e => dispatch(selectMove(e.pageX, e.pageY)),
  onSelectStop: () => dispatch(selectStop()),
});

export const SelectSurface = ({
  canSelect,
  isSelecting,
  onSelectStart,
  onSelectMove,
  onSelectStop,
}) => canSelect ? (
  <Surface>
    {isSelecting ?
      <SelectBloc />
    : null}
    {canSelect ?
      <EventListener
        target="canvas"
        onMouseDown={onSelectStart}
      />
    : null}
    {isSelecting ?
      <EventListener
        target="window"
        onMouseMoveCapture={onSelectMove}
      />
    : null}
    {isSelecting ?
      <EventListener
        target="window"
        onMouseUpCapture={onSelectStop}
      />
    : null}
  </Surface>
) : null;

const SelectSurfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectSurface);

SelectSurfaceContainer.displayName = 'SelectSurfaceContainer';

export default SelectSurfaceContainer;
