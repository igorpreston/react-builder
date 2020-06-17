import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import classNames from 'classnames/bind';
import ResizeHandler from './ResizeHandler';
import styles from './styles';

const handlers = fromJS([
  { name: 'topLeft', vert: 'top', hor: 'left' },
  { name: 'top', vert: 'top', hor: null },
  { name: 'topRight', vert: 'top', hor: 'right' },
  { name: 'left', vert: null, hor: 'left' },
  { name: 'right', vert: null, hor: 'right' },
  { name: 'bottomLeft', vert: 'bottom', hor: 'left' },
  { name: 'bottom', vert: 'bottom', hor: null },
  { name: 'bottomRight', vert: 'bottom', hor: 'right' },
]);

const ResizeHandlers = ({ onResizeStart }, { isSelected }) => isSelected ? (
  <div
    className={classNames.bind(styles)({
      'resize-handlers': true,
    })}
  >
    {handlers.map(handler =>
      <ResizeHandler
        key={handler.get('name')}
        name={handler.get('name')}
        vert={handler.get('vert')}
        hor={handler.get('hor')}
        onResizeStart={e => onResizeStart(e, handler.get('hor'), handler.get('vert'))}
      />
    )}
  </div>
) : null;

ResizeHandlers.contextTypes = {
  isSelected: PropTypes.bool,
};

export default ResizeHandlers;
