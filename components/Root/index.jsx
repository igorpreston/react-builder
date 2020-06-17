import React from 'react';
import classNames from 'classnames/bind';
import { Provider } from 'react-redux';
import TopPanel from 'app/components/TopPanel';
import LeftPanel from 'app/components/LeftPanel';
import CanvasEditor from 'app/components/CanvasEditor';
import Explorer from 'app/components/Explorer';
import styles from './styles';

const Root = ({ store }) => (
  <Provider store={store}>
    <div
      className={classNames.bind(styles)({
        'root': true,
      })}
    >
      <TopPanel />
      <LeftPanel />
      <CanvasEditor />
      <Explorer />
    </div>
  </Provider>
);

export default Root;
