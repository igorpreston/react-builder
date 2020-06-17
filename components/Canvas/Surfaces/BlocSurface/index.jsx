import React from 'react';
import { connect } from 'react-redux';
import { getSelectedBreakpointOrderedBlocs } from 'app/ducks/canvas/selected';
import Surface from 'app/components/Canvas/Surfaces/Surface';
import CanvasBloc from 'app/components/Canvas/Blocs/CanvasBloc';

const mapStateToProps = state => ({
  blocs: getSelectedBreakpointOrderedBlocs(state),
});

const BlocSurface = ({ blocs }) => (
  <Surface>
    {blocs && blocs.map(bloc =>
      <CanvasBloc
        key={bloc.id}
        bloc={bloc}
      />
    )}
  </Surface>
);

const BlocSurfaceContainer = connect(
  mapStateToProps,
)(BlocSurface);

BlocSurfaceContainer.displayName = 'BlocSurfaceContainer';

export default BlocSurfaceContainer;
