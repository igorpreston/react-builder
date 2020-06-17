import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ExplorerNavButton from './ExplorerNavButton';
import { getExplorerTab, changeTab } from 'app/ducks/explorer/tab';
import styles from './styles';

const tabs = [
  { name: 'design', icon: 'brush' },
  { name: 'pages', icon: 'pages' },
];

const mapStateToProps = state => ({
  currentTab: getExplorerTab(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: tab => dispatch(changeTab(tab)),
});

const ExplorerNav = ({ currentTab, tab, onChange }) => (
  <div
    className={classNames.bind(styles)({
      'explorer__nav': true,
    })}
  >
    {tabs.map(tab =>
      <ExplorerNavButton
        key={tab.name}
        icon={tab.icon}
        isCurrent={currentTab === tab.name}
        onClick={() => onChange(tab.name)}
      />
    )}
  </div>
);

const ExplorerNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExplorerNav);

ExplorerNavContainer.displayName = 'ExplorerNavContainer';

export default ExplorerNavContainer;
