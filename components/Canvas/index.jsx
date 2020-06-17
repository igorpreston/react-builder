import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EventListener from 'react-event-listener';
import BlocSurface from './Surfaces/BlocSurface';
import DrawSurface from './Surfaces/DrawSurface';
import SelectSurface from './Surfaces/SelectSurface';
import DragSurface from './Surfaces/DragSurface';
import ResizeSurface from './Surfaces/ResizeSurface';
import SnapSurface from './Surfaces/SnapSurface';
import { updateCanvasSize } from 'app/ducks/canvas/size';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  onUpdateSize: dimensions => dispatch(updateCanvasSize(dimensions)),
});

export class Canvas extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.onResize();
  }

  onResize = () => {
    const canvas = this.node.getBoundingClientRect();

    this.props.onUpdateSize({
      top: canvas.top,
      left: canvas.left,
      width: canvas.width,
      height: canvas.height,
    });
  };

  node = null;

  render() {

    return (
      <div
        ref={c => this.node = c}
        id="canvas"
        className={classNames.bind(styles)({
          'canvas': true,
        })}
      >
        <BlocSurface />
        <SnapSurface />
        <DrawSurface />
        <SelectSurface />
        <DragSurface />
        <ResizeSurface />
        <EventListener
          target="window"
          onResizeCapture={this.onResize}
        />
      </div>
    );
  }
};

const CanvasContainer = connect(
  null,
  mapDispatchToProps,
)(Canvas);

CanvasContainer.displayName = 'CanvasContainer';

export default CanvasContainer;
