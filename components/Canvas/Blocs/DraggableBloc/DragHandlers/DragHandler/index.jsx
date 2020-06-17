import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const DragHandler = ({ position, onDragStart }) => (
  <div
    className={classNames.bind(styles)({
      'drag-handlers__handler': true,
      'drag-handlers__handler--top': position === 'top',
      'drag-handlers__handler--left': position === 'left',
      'drag-handlers__handler--right': position === 'right',
      'drag-handlers__handler--bottom': position === 'bottom',
    })}
    onMouseDown={onDragStart}
  />
);

export default DragHandler;
