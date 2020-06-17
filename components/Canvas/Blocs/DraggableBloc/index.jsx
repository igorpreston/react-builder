import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { dragStart } from 'app/ducks/canvas/drag';
import DragHandlers from './DragHandlers';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  onDragStart: e => dispatch(dragStart(e.pageX, e.pageY)),
});

export class DraggableBloc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      draggableClassName: classNames.bind(styles)({
        'draggable-bloc': true,
      }),
      dragHandlers: createElement(
        DragHandlers,
        {
          onDragStart: this.props.onDragStart,
        },
        null,
      ),
    };
  }

  render() {
    return this.props.children;
  }
};

DraggableBloc.childContextTypes = {
  draggableClassName: PropTypes.string,
  dragHandlers: PropTypes.object,
};

const DraggableBlocContainer = connect(
  null,
  mapDispatchToProps,
)(DraggableBloc);

DraggableBlocContainer.displayName = 'DraggableBlocContainer';

export default DraggableBlocContainer;
