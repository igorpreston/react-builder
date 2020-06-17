import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getExplorerModal } from 'app/ducks/explorer/modal';
import EditorBackgroundColorModal from '../Modals/EditorBackgroundColorModal';
import EditorTextColorModal from '../Modals/EditorTextColorModal';
import EditorFontsModal from '../Modals/EditorFontsModal';
import EditorLinkModal from '../Modals/EditorLinkModal';
import EditorImageModal from '../Modals/EditorImageModal';
import styles from './styles';

const mapStateToProps = state => ({
  currentModal: getExplorerModal(state),
});

const ModalView = ({ currentModal }) => currentModal ? (
  <div
    className={classNames.bind(styles)({
      'explorer__view__modal': true,
    })}
  >
    {currentModal === 'editor-background-color' ? <EditorBackgroundColorModal /> : null}
    {currentModal === 'editor-text-color' ? <EditorTextColorModal /> : null}
    {currentModal === 'editor-fonts' ? <EditorFontsModal /> : null}
    {currentModal === 'editor-link' ? <EditorLinkModal /> : null}
    {currentModal === 'editor-image' ? <EditorImageModal /> : null}
  </div>
) : null;

const ModalViewContainer = connect(
  mapStateToProps,
)(ModalView);

ModalViewContainer.displayName = 'ModalViewContainer';

export default ModalViewContainer;