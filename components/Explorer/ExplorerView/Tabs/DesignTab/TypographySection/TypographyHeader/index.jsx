import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const TypographyHeader = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__header': true,
    })}
  >
    <span
      className={classNames.bind(styles)({
        'design__typography__header__title': true,
      })}
    >
      Typography
    </span>
  </div>
);

export default TypographyHeader;