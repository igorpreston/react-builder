import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { openModal } from 'app/ducks/explorer/modal';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  onOpen: modal => dispatch(openModal(modal)),
});

const TypographyModalButton = ({ modal, name, icon, onOpen }) => (
  <button
    className={classNames.bind(styles)({
      'design__typography__modal-button': true,
    })}
    onClick={() => onOpen(modal)}
  >
    <i
      className={classNames.bind(styles)({
        'design__typography__modal-button__icon': true,
        'material-icons': true,
        'md-18': true,
      })}
    >
      {icon}
    </i>
  </button>
);

const TypographyModalButtonContainer = connect(
  null,
  mapDispatchToProps,
)(TypographyModalButton);

TypographyModalButtonContainer.displayName = 'TypographyModalButtonContainer';

export default TypographyModalButtonContainer;