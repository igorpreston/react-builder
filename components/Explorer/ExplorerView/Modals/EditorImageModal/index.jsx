import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Quill from 'app/ducks/textEditor/quill';
import { connect } from 'react-redux';
import ModalHeader from '../ModalHeader';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import styles from './styles';
import { textEditorContentChange } from 'app/ducks/textEditor';
import UnsplashImageGrid from './UnsplashImageGrid';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
});

const mapDispatchToProps = dispatch => ({
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
});

function insertEmbed (quill, name) {
  let range = quill.getSelection(true);
  quill.insertText(range.index, '\n', Quill.sources.USER);
  if (name === 'image') {
    let alt = 'Quill Cloud';
    let url = 'http://quilljs.com/0.20/assets/images/cloud.png';
    quill.insertEmbed(range.index + 1, 'image', { alt, url }, Quill.sources.USER);
  } else if (name === 'video') {
    let url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0';
    quill.insertEmbed(range.index + 1, 'video', url, Quill.sources.USER);
    quill.formatText(range.index + 1, 1, { height: '170', width: '400' });
  }
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
};

class EditorImageModal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    image: '',
  };

  componentDidMount() {
    const { bloc } = this.props;
    const { editor, content, selection } = bloc.text;

    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['image'] != null);

    if (selectionHasFormatting) {
      this.setState({ image: selectionHasFormatting.attributes.image });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { bloc } = nextProps;
    const { editor, content, selection } = bloc.text;

    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['image'] != null);

    if (selectionHasFormatting) {
      this.setState({ image: selectionHasFormatting.attributes.image });
    }
  }

  render() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;

    return (
      <div
        className={classNames.bind(styles)({
          'modal__editor-image': true,
        })}
      >
        <ModalHeader title="Image" />
        <div
          className={classNames.bind(styles)({
            'modal__editor-image__dialog': true,
          })}
        >
          
        </div>
        <div
          className={classNames.bind(styles)({
            'modal__editor-image__dialog__header': true,
          })}
        >
          <div
            className={classNames.bind(styles)({
              'modal__editor-image__dialog__header__title': true,
            })}
          >
            Recently used images
          </div>
        </div>
        <div 
          className={classNames.bind(styles)({
            'modal__editor-image__block': true,
          })}
        >
          <UnsplashImageGrid />
        </div>
      </div>
    );
  }
};

const EditorImageModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorImageModal);

EditorImageModalContainer.displayName = 'EditorImageModalContainer';

export default EditorImageModalContainer;