import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getCanSelect, selectEnable } from 'app/ducks/canvas/select';
import styles from './styles';

const mapStateToProps = state => ({
  canSelect: getCanSelect(state),
});

const mapDispatchToProps = dispatch => ({
  onSelectEnable: () => dispatch(selectEnable()),
});

const SelectButton = ({ canSelect, onSelectEnable }) => (
  <div
    className={classNames.bind(styles)({
      'select-button': true,
      'select-button--current': canSelect,
    })}
    onClick={onSelectEnable}
  >
    <i className="material-icons">select_all</i>
  </div>
);

const SelectButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectButton);

SelectButtonContainer.displayName = 'SelectButtonContainer';

export default SelectButtonContainer;
