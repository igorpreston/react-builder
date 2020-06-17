import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const TypographyRow = ({ children }) => (
  <div
    className={classNames.bind(styles)({
      'design__typography__row': true,
    })}
  >
    {children}
  </div>
);

export default TypographyRow;