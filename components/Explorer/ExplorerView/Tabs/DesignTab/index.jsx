import React from 'react';
import classNames from 'classnames/bind';
import TypographySection from './TypographySection';
import styles from './styles';

const DesignTab = () => (
  <div
    className={classNames.bind(styles)({
      'explorer__view__tab__design': true,
    })}
  >
    <TypographySection />
  </div>
);

export default DesignTab;