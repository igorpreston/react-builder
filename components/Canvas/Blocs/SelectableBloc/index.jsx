import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { makeGetIsBlocSelected, selectBloc, deselectBloc } from 'app/ducks/canvas/selected';
import styles from './styles';

export const makeMapStateToProps = () => (state, props) => ({
  isSelected: makeGetIsBlocSelected(props.id)(state),
});

export const mapDispatchToProps = (dispatch, props) => ({
  onSelect: e => {
    if (e.ctrlKey) {
      dispatch(selectBloc(props.id, false));
    } else {
      dispatch(selectBloc(props.id));
    }
  },
  onDeselect: e => {
    if (e.ctrlKey) {
      dispatch(deselectBloc(props.id));
    } else {
      dispatch(selectBloc(props.id));
    }
  },
});

export class SelectableBloc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      selectableClassName: classNames.bind(styles)({
        'selectable-bloc': true,
      }),
      isSelected: this.props.isSelected,
      onSelect: this.props.onSelect,
      onDeselect: this.props.onDeselect,
    };
  }

  render() {
    return this.props.children;
  }
};

SelectableBloc.childContextTypes = {
  selectableClassName: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
};

const SelectableBlocContainer = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(SelectableBloc);

SelectableBlocContainer.displayName = 'SelectableBlocContainer';

export default SelectableBlocContainer;
