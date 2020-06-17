import React from 'react';
import classNames from 'classnames/bind';
import ModalView from './ModalView';
import TabView from './TabView';
import styles from './styles';

const ExplorerView = () => (
  <div
    className={classNames.bind(styles)({
      'explorer__view': true,
    })}
  >
    <ModalView />
    <TabView />
  </div>
);

export default ExplorerView;