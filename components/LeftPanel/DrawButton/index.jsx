import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { drawEnable, getDrawBrush } from 'app/ducks/canvas/draw';
import styles from './styles';

const mapStateToProps = (state, props) => ({
  isCurrent: getDrawBrush(state) === props.brush,
});

const mapDispatchToProps = (dispatch, props) => ({
  onDrawEnable: () => dispatch(drawEnable(props.brush)),
});

export const DrawButton = ({ name, icon, onDrawEnable, isCurrent }) => (
  <div
    className={classNames.bind(styles)({
      'draw-button': true,
      'draw-button--current': isCurrent,
    })}
    onClick={onDrawEnable}
  >
    <i className="material-icons">{icon}</i>
  </div>
);

const DrawButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawButton);

DrawButtonContainer.displayName = 'DrawButtonContainer';

export default DrawButtonContainer;
