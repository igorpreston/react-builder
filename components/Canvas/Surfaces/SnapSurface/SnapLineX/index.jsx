import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const SnapLineX = ({ x }) => (
  <div
    className={classNames.bind(styles)({
      'snap-line-x': true,
    })}
    style={{
      left: x,
    }}
  />
);

export default SnapLineX;