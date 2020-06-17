import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import ModalHeader from '../ModalHeader';
import FontSearch from './FontSearch';
import FontList from './FontList';
import styles from './styles';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const EditorFontsModal = () => (
  <div
    className={classNames.bind(styles)({
      'modal__editor-fonts': true,
    })}
  >
    <ModalHeader title="Fonts" />
    <FontSearch />
    <FontList />
  </div>
);

export default EditorFontsModal;