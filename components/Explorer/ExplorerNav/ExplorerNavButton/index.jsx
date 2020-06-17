import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const ExplorerNavButton = ({ icon, isCurrent, onClick }) => (
  <div
    className={classNames.bind(styles)({
      'explorer__nav__button': true,
      'explorer__nav__button--active': isCurrent,
    })}
    onClick={onClick}
  >
    <i className="material-icons">{icon}</i>
  </div>
);

export default ExplorerNavButton;