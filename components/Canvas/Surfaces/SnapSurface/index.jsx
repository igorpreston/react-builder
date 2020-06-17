import React from 'react';
import { connect } from 'react-redux';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import { getDrawSnapLinesForX, getDrawSnapLinesForY } from 'app/ducks/snap';
import SnapLineX from './SnapLineX';
import SnapLineY from './SnapLineY';

const mapStateToProps = state => ({
  snapLinesX: getDrawSnapLinesForX(state),
  snapLinesY: getDrawSnapLinesForY(state),
});

export const SnapSurface = ({ snapLinesX, snapLinesY }) => (
  <Surface>
    {snapLinesX && snapLinesX.filter(line => line.type === 'line').map(line =>
      <SnapLineX
        key={`x${line.x}`}
        x={line.x}
      />
    )}
    {snapLinesY && snapLinesY.filter(line => line.type === 'line').map(line =>
      <SnapLineY
        key={`y${line.y}`}
        y={line.y}
      />
    )}
  </Surface>
);

const SnapSurfaceContainer = connect(
  mapStateToProps,
)(SnapSurface);

SnapSurfaceContainer.displayName = 'SnapSurfaceContainer';

export default SnapSurfaceContainer;