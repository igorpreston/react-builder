import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import { textEditorContentChange } from 'app/ducks/textEditor';
import { connect } from 'react-redux';
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

export class LinkCall extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    href: '',
  };
  
  componentDidMount() {
    const { bloc, onContentChange } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes.link != null);

    if (selectionHasFormatting && selectionHasFormatting.attributes.link.tel) {
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

    if (selectionHasFormatting && selectionHasFormatting.attributes.link.tel) {
      this.setState({
        href: selectionHasFormatting.attributes.link.href,
        target: selectionHasFormatting.attributes.link.target,
      });
    } else if (selectionHasFormatting && !selectionHasFormatting.attributes.link.tel) {
      this.setState({
        href: '',
        target: false,
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
          'modal__editor-link__call': true,
        })}
      >
        <div
          className={classNames.bind(styles)({
            'modal__editor-link__call__wrapper': true,
          })}
        >
          <input
            ref={c => this.input = c}
            type="text"
            className={classNames.bind(styles)({
              'modal__editor-link__call__input': true,
            })}
            value={this.state.href}
            onChange={this.updateInput}
          />
          <i
            className={classNames.bind(styles)({
              'material-icons': true,
              'md-18': true,
              'modal__editor-link__call__icon': true,
            })}
          >
            phone_in_talk
          </i>
        </div>
        <LinkSave
          onSave={e => formatContent(e, bloc.id, { href: this.input.value, tel: true }, editor, content, onContentChange)}
        />
      </div>
    );
  }
};

const LinkCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkCall);

LinkCallContainer.displayName = 'LinkCallContainer';

export default LinkCallContainer;