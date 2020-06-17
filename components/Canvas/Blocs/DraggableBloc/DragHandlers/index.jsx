import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DragHandler from './DragHandler';
import styles from './styles';

const DragHandlers = ({ onDragStart }, { isSelected }) => isSelected ? (
  <div
    className={classNames.bind(styles)({
      'drag-handlers': true,
    })}
  >
    <DragHandler position="top" onDragStart={onDragStart} />
    <DragHandler position="left" onDragStart={onDragStart} />
    <DragHandler position="right" onDragStart={onDragStart} />
    <DragHandler position="bottom" onDragStart={onDragStart} />
  </div>
) : null;

DragHandlers.contextTypes = {
  isSelected: PropTypes.bool,
};

export default DragHandlers;
