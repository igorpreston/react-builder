import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const Surface = ({ children }) => (
  <div
    className={classNames.bind(styles)({
      'surface': true,
    })}
  >
    {children}
  </div>
);

export default Surface;
