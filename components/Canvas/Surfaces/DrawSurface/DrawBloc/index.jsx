import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getDrawBloc } from 'app/ducks/canvas/draw';
import styles from './styles';

const mapStateToProps = state => ({
  bloc: getDrawBloc(state),
});

export const DrawBloc = ({ bloc }) => (
  <div
    className={classNames.bind(styles)({
      'draw-bloc': true,
    })}
    style={{
      top: bloc.top,
      left: bloc.left,
      width: bloc.width,
      height: bloc.height,
    }}
  />
);

const DrawBlocContainer = connect(
  mapStateToProps,
)(DrawBloc);

DrawBlocContainer.displayName = 'DrawBlocContainer';

export default DrawBlocContainer;
