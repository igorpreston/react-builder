import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { openModal } from 'app/ducks/explorer/modal';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import styles from './styles';
import { textEditorContentChange } from 'app/ducks/textEditor';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
});

const mapDispatchToProps = dispatch => ({
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
  onOpen: modal => dispatch(openModal(modal)),
});

export class TypographyFont extends Component {
  constructor(props, context) {
    super(props, context);
  }

  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { onOpen, bloc } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['font'] != null);

    return (
      <div
        className={classNames.bind(styles)({
          'design__typography__font': true,
        })}
        onClick={() => onOpen('editor-fonts')}
      >
        <div
          className={classNames.bind(styles)({
            'design__typography__font__family': true,
          })}
          style={{
            fontFamily: selectionHasFormatting && selectionHasFormatting.attributes.font,
          }}
        >
          {selectedContent && selectedContent.ops.length > 1 ? null : selectionHasFormatting ? selectionHasFormatting.attributes.font : 'Select font'}
        </div>
        <i
          className={classNames.bind(styles)({
            'material-icons': true,
            'md-18': true,
            'design__typography__font__button': true,
          })}
        >
          font_download
        </i>
      </div>
    );
  }
};

const TypographyFontContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypographyFont);

TypographyFontContainer.displayName = 'TypographyFontContainer';

export default TypographyFontContainer;