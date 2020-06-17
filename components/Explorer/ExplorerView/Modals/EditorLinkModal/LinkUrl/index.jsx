import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import { textEditorContentChange } from 'app/ducks/textEditor';
import LinkSave from '../LinkSave';
import styles from './styles';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
});

const mapDispatchToProps = dispatch => ({
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
});

function preventClick (e) {
  e.preventDefault();
  e.stopPropagation();
};

function formatContent (e, id, value, editor, oldContent, onContentChange) {
  preventClick(e);
  editor.format('link', value);
  const newContent = editor.getContents();
  onContentChange(id, newContent, oldContent);
  e.target.blur();
  editor.focus();
};

export class LinkUrl extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    href: '',
    target: false,
  };

  componentDidMount() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes.link != null);

    if (selectionHasFormatting) {
      this.setState({
        href: selectionHasFormatting.attributes.link.href,
        target: selectionHasFormatting.attributes.link.target,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { bloc, onContentChange } = nextProps;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes.link != null);

    if (selectionHasFormatting) {
      this.setState({
        href: selectionHasFormatting.attributes.link.href,
        target: selectionHasFormatting.attributes.link.target,
      });
    } else if (selectionHasFormatting == null) {
      this.setState({
        href: '',
        target: false,
      });
    }
  }

  updateInput = e => this.setState({
    href: e.target.value,
  });

  updateCheckbox = e => this.setState({
    target: e.target.checked,
  });

  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.bloc.text.editor.focus();
  };

  render() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes.link != null);

    return (
      <div
        className={classNames.bind(styles)({
          'modal__editor-link__url': true,
        })}
      >
        <div
          className={classNames.bind(styles)({
            'modal__editor-link__url__wrapper': true,
          })}
        >
          <input
            ref={c => this.input = c}
            type="text"
            className={classNames.bind(styles)({
              'modal__editor-link__url__input': true,
            })}
            value={this.state.href}
            onChange={this.updateInput}
          />
          <i
            className={classNames.bind(styles)({
              'material-icons': true,
              'md-18': true,
              'modal__editor-link__url__icon': true,
            })}
          >
            http
          </i>
        </div>
        <label
          className={classNames.bind(styles)({
            'modal__editor-link__url__option': true,
          })}
        >
          <span
            className={classNames.bind(styles)({
              'modal__editor-link__url__option__label': true,
            })}
          >
            Open in new tab
          </span>
          <input
            type="checkbox"
            ref={c => this.checkbox = c}
            checked={this.state.target}
            onChange={this.updateCheckbox}
            onMouseDown={this.preventClick}
          />
        </label>
        <LinkSave
          onSave={e => formatContent(e, bloc.id, { href: this.input.value, target: this.checkbox.checked }, editor, content, onContentChange)}
        />
      </div>
    );
  }
};

const LinkUrlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkUrl);

LinkUrlContainer.displayName = 'LinkUrlContainer';

export default LinkUrlContainer;