import React from 'react';
import classNames from 'classnames/bind';
import ExplorerNav from './ExplorerNav';
import ExplorerView from './ExplorerView';
import styles from './styles';

const Explorer = () => (
  <div
    className={classNames.bind(styles)({
      'explorer': true,
    })}
  >
    <ExplorerNav />
    <ExplorerView />
  </div>
);

export default Explorer;