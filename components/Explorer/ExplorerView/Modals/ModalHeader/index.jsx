import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeModal } from 'app/ducks/explorer/modal';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

const ModalHeader = ({ title, onClose }) => (
  <div
    className={classNames.bind(styles)({
      'modal__header': true,
    })}
  >
    <div
      className={classNames.bind(styles)({
        'modal__header__button': true,
      })}
      onClick={onClose}
    >
      <i
        className={classNames.bind(styles)({
          'material-icons': true,
          'md-18': true,
          'modal__header__button__icon': true,
        })}
      >
        arrow_back
      </i>
    </div>
    <div
      className={classNames.bind(styles)({
        'modal__header__title': true,
      })}
    >
      {title}
    </div>
  </div>
);

const ModalHeaderContainer = connect(
  null,
  mapDispatchToProps,
)(ModalHeader);

ModalHeaderContainer.displayName = 'ModalHeaderContainer';

export default ModalHeaderContainer;