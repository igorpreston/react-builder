import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { resizeStart } from 'app/ducks/canvas/resize';
import ResizeHandlers from './ResizeHandlers';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  onResizeStart: (e, hor, vert) => dispatch(resizeStart(e.pageX, e.pageY, hor, vert)),
});

export class ResizableBloc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      resizableClassName: classNames.bind(styles)({
        'resizable-bloc': true,
      }),
      resizeHandlers: createElement(
        ResizeHandlers,
        {
          onResizeStart: this.props.onResizeStart,
        },
        null,
      ),
    };
  }

  render() {
    return this.props.children;
  }
};

ResizableBloc.childContextTypes = {
  resizableClassName: PropTypes.string,
  resizeHandlers: PropTypes.object,
};

const ResizableBlocContainer = connect(
  null,
  mapDispatchToProps,
)(ResizableBloc);

ResizableBlocContainer.displayName = 'ResizableBlocContainer';

export default ResizableBlocContainer;
