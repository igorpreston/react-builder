import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SelectableBloc from 'app/components/Canvas/Blocs/SelectableBloc';
import DraggableBloc from 'app/components/Canvas/Blocs/DraggableBloc';
import ResizableBloc from 'app/components/Canvas/Blocs/ResizableBloc';
import BaseBloc from 'app/components/Canvas/Blocs/BaseBloc';
import styles from './styles';

class CanvasBloc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      canvasClassName: classNames.bind(styles)({
        'canvas-bloc': true,
      }),
    };
  }

  render () {
    const { bloc } = this.props;

    return (
      <DraggableBloc>
        <ResizableBloc>
          <SelectableBloc id={bloc.id}>
            <BaseBloc bloc={bloc} />
          </SelectableBloc>
        </ResizableBloc>
      </DraggableBloc>
    );
  }
};

CanvasBloc.childContextTypes = {
  canvasClassName: PropTypes.string,
};

export default CanvasBloc;
