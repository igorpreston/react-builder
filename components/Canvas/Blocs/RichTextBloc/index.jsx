import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from 'app/ducks/textEditor';
import classNames from 'classnames/bind';
import styles from './styles';
import {
  textEditorInit,
  textEditorSelectionChange,
} from 'app/ducks/textEditor';

const mapDispatchToProps = dispatch => ({
  onInit: (id, editor) => dispatch(textEditorInit(id, editor)),
  onSelectionChange: (id, newSelection, oldSelection) => dispatch(textEditorSelectionChange(id, newSelection, oldSelection)),
});

class RichTextBloc extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.editor = new Quill(this.node);
    this.handleInit();
    this.editor.on('selection-change', this.handleSelectionChange);
  }

  handleInit = () => {
    this.props.onInit(
      this.props.id,
      this.editor,
    );
  };

  handleSelectionChange = (newSelection, oldSelection) => {
    this.props.onSelectionChange(
      this.props.id,
      newSelection,
      oldSelection,
    );
  };

  editor = null;
  node = null;

  render() {
    const { id } = this.props;

    return (
      <div
        ref={c => this.node = c}
        className={classNames.bind(styles)({
          'rich-text-bloc': true,
        })}
      >
        Tell your story...
      </div>
    );
  }
};

const RichTextBlocContainer = connect(
  null,
  mapDispatchToProps,
)(RichTextBloc);

RichTextBlocContainer.displayName = 'RichTextBlocContainer';

export default RichTextBlocContainer;