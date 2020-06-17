import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const SnapLineY = ({ y }) => (
  <div
    className={classNames.bind(styles)({
      'snap-line-y': true,
    })}
    style={{
      top: y,
    }}
  />
);

export default SnapLineY;