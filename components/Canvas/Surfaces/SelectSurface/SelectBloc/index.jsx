import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getSelectBloc } from 'app/ducks/canvas/select';
import styles from './styles';

const mapStateToProps = state => ({
  bloc: getSelectBloc(state),
});

export const SelectBloc = ({ bloc }) => (
  <div
    className={classNames.bind(styles)({
      'select-bloc': true,
    })}
    style={{
      top: bloc.top,
      left: bloc.left,
      width: bloc.width,
      height: bloc.height,
    }}
  />
);

const SelectBlocContainer = connect(
  mapStateToProps,
)(SelectBloc);

SelectBlocContainer.displayName = 'SelectBlocContainer';

export default SelectBlocContainer;
