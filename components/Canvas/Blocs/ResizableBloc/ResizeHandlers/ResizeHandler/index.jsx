import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './styles';

const ResizeHandler = ({ name, vert, hor, onResizeStart }, { isSelected }) => (
  <div
    className={classNames.bind(styles)({
      'resize-handlers__handler': true,
      'resize-handlers__handler--selected': isSelected,
      'resize-handlers__handler--top-left': name === 'topLeft',
      'resize-handlers__handler--top': name === 'top',
      'resize-handlers__handler--top-right': name === 'topRight',
      'resize-handlers__handler--left': name === 'left',
      'resize-handlers__handler--right': name === 'right',
      'resize-handlers__handler--bottom-left': name === 'bottomLeft',
      'resize-handlers__handler--bottom': name === 'bottom',
      'resize-handlers__handler--bottom-right': name === 'bottomRight',
    })}
    onMouseDown={onResizeStart}
  />
);

ResizeHandler.contextTypes = {
  isSelected: PropTypes.bool,
};

export default ResizeHandler;
