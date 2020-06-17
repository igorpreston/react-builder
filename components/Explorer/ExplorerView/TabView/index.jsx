import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getExplorerTab } from 'app/ducks/explorer/tab';
import { getExplorerModal } from 'app/ducks/explorer/modal';
import DesignTab from '../Tabs/DesignTab';
import styles from './styles';

const mapStateToProps = state => ({
  currentTab: getExplorerTab(state),
  currentModal: getExplorerModal(state),
});

const TabView = ({ currentModal, currentTab }) => !currentModal && currentTab ? (
  <div
    className={classNames.bind(styles)({
      'explorer__view__tab': true,
    })}
  >
    {currentTab === 'design' ? <DesignTab /> : null}
  </div>
) : null;

const TabViewContainer = connect(
  mapStateToProps,
)(TabView);

TabViewContainer.displayName = 'TabViewContainer';

export default TabViewContainer;