import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import ColorPicker from '../ColorPicker';
import ModalHeader from '../ModalHeader';
import { CirclePicker } from 'react-color';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import styles from './styles';
import { textEditorContentChange } from 'app/ducks/textEditor';
import { getRecentlyUsedColors, addColorToLog } from 'app/ducks/logs/colors';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
  recentColors: getRecentlyUsedColors(state),
});

const mapDispatchToProps = dispatch => ({
  onLogColor: color => dispatch(addColorToLog(color)),
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
});

function formatContent (id, color, editor, oldContent, onContentChange, onLogColor) {
  const { rgb } = color;
  const { r, g, b, a } = rgb;
  const formattedColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  onLogColor(formattedColor);
  editor.format('background', formattedColor);
  const newContent = editor.getContents();
  onContentChange(id, newContent, oldContent);
};

class EditorBackgroundColorModal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    color: {
      r: 181,
      g: 59,
      b: 59,
      a: 1,
    },
  };

  componentDidMount() {
    const { bloc } = this.props;
    const { editor, content, selection } = bloc.text;

    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['color'] != null);

    if (selectionHasFormatting) {
      console.log(selectionHasFormatting.attributes.color);
      this.setState({ color: selectionHasFormatting.attributes.color });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { bloc } = nextProps;
    const { editor, content, selection } = bloc.text;

    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['background'] != null);

    if (selectionHasFormatting) {
      this.setState({ color: selectionHasFormatting.attributes.background });
    }
  }

  render() {
    const { bloc, onContentChange, recentColors, onLogColor } = this.props;
    const { editor, content, selection } = bloc.text;

    return (
      <div
        className={classNames.bind(styles)({
          'modal__editor-background-color': true,
        })}
      >
        <ModalHeader title="Marker Color" />
        <div
          className={classNames.bind(styles)({
            'modal__editor-background-color__dialog': true,
          })}
        >
          <ColorPicker
            color={this.state.color}
            onChangeComplete={color => formatContent(bloc.id, color, editor, content, onContentChange, onLogColor)}
          />
        </div>
        <div
          className={classNames.bind(styles)({
            'modal__editor-background-color__dialog__header': true,
          })}
        >
          <div
            className={classNames.bind(styles)({
              'modal__editor-background-color__dialog__header__title': true,
            })}
          >
            Recently used colors
          </div>
        </div>
        <div 
          className={classNames.bind(styles)({
            'modal__editor-background-color__block': true,
          })}
        >
          <CirclePicker 
            colors={recentColors.reverse().toJS()}
            onChange={color => formatContent(bloc.id, color, editor, content, onContentChange, onLogColor)}
          />
        </div>
      </div>
    );
  }
};

const EditorBackgroundColorModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorBackgroundColorModal);

EditorBackgroundColorModalContainer.displayName = 'EditorBackgroundColorModalContainer';

export default EditorBackgroundColorModalContainer;