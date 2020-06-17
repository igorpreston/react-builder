import React from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import styles from './styles';
import { textEditorContentChange } from 'app/ducks/textEditor';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
});

const mapDispatchToProps = dispatch => ({
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
});

function formatContent (id, name, value, editor, oldContent, onContentChange) {
  editor.format(name, value);
  const newContent = editor.getContents();
  onContentChange(id, newContent, oldContent);
};

const TypographyFormatButton = ({ isActive, name, value, defaultValue, icon, bloc, onContentChange }) => {
  const { editor, content, selection } = bloc.text;
  const selectedContent = selection && editor.getContents(selection.index, selection.length);
  const selectionHasFormatting = selection && selectedContent && selectedContent.ops.some(format => format.attributes && format.attributes[name] === value);
  
  return (
    <button
      className={classNames.bind(styles)({
        'design__typography__format-button': true,
        'design__typography__format-button--active': selectionHasFormatting,
      })}
      onClick={() => selectionHasFormatting ? formatContent(bloc.id, name, defaultValue, editor, content, onContentChange) : formatContent(bloc.id, name, value, editor, content, onContentChange)}
    >
      <i
        className={classNames.bind(styles)({
          'design__typography__format-button__icon': true,
          'material-icons': true,
          'md-18': true,
        })}
      >
        {icon}
      </i>
    </button>
  );
};

const TypographyFormatButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypographyFormatButton);

TypographyFormatButtonContainer.displayName = 'TypographyFormatButtonContainer';

export default TypographyFormatButtonContainer;