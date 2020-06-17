import React, { Component } from 'react';
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

export class TypographySize extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    size: 16,
  };

  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  componentDidMount() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['size'] != null);
    if (selectedContent && selectedContent.ops.length > 1) {
      this.setState({
        size: '',
      });
    } else if (selectionHasFormatting) {
      this.setState({
        size: selectionHasFormatting.attributes.size,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { bloc, onContentChange } = nextProps;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['size'] != null);
    if (selectedContent && selectedContent.ops.length > 1) {
      this.setState({
        size: '',
      });
    } else if (selectionHasFormatting) {
      this.setState({
        size: selectionHasFormatting.attributes.size,
      });
    } else {
      const selectionHasFormatting = selection && selectedContent && selectedContent.ops.some(format => format.attributes && format.attributes['size'] != null);
      if (selectionHasFormatting === false) {
        this.setState({
          size: 16,
        });
      }
    }
  }

  formatContent = (e, id, value, type, editor, oldContent, onContentChange) => {
    let parsedValue = null;
    if (typeof value === 'string' && value.length === 0) {
      parsedValue = 0;
    } else if (typeof value === 'string' && value.length >= 1) {
      parsedValue = parseInt(value);
    } else {
      parsedValue = value;
    }
    e.persist();
    if (type === 'inc' || type === 'dec') {
      this.setState(prevState => ({ size: (parseInt(prevState.size) + value) <= 0 ? 1 : parseInt(prevState.size) + value }), () => {
        editor.format('size', { type, value });
        const newContent = editor.getContents();
        onContentChange(id, newContent, oldContent);
      });
    } else if (type === 'set') {
      this.preventClick(e);
      editor.blur();
      e.target.focus();
      this.setState(prevState => ({ size: parsedValue <= 0 ? 1 : parsedValue }), () => {
        editor.format('size', { type, value: this.state.size });
        const newContent = editor.getContents();
        onContentChange(id, newContent, oldContent);
        editor.blur();
        e.target.focus();
      });
    }
  };

  input = null;

  render() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.some(format => format.attributes && format.attributes['size'] != null);

    return (
      <div
        className={classNames.bind(styles)({
          'design__typography__size': true,
        })}
      >
        <input
          ref={c => this.input = c}
          className={classNames.bind(styles)({
            'design__typography__size__input': true,
          })}
          value={this.state.size}
          onChange={e => this.formatContent(e, bloc.id, e.target.value, 'set', editor, content, onContentChange)}
        />
        <i
          className={classNames.bind(styles)({
            'material-icons': true,
            'md-18': true,
            'design__typography__size__button': true,
          })}
          onClick={e => this.formatContent(e, bloc.id, -2, 'dec', editor, content, onContentChange)}
        >
          remove
        </i>
        <i
          className={classNames.bind(styles)({
            'material-icons': true,
            'md-18': true,
            'design__typography__size__button': true,
          })}
          onClick={e => this.formatContent(e, bloc.id, 2, 'inc', editor, content, onContentChange)}
        >
          add
        </i>
      </div>
    );
  }
};

const TypographySizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypographySize);

TypographySizeContainer.displayName = 'TypographySizeContainer';

export default TypographySizeContainer;