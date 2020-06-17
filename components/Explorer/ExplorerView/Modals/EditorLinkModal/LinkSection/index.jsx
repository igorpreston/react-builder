import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import { textEditorContentChange } from 'app/ducks/textEditor';
import { getSelectedBreakpointBlocs } from 'app/ducks/canvas/selected';
import LinkSave from '../LinkSave';
import styles from './styles';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
  blocs: getSelectedBreakpointBlocs(state),
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

export class LinkSection extends Component {
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
    const { bloc, onContentChange, blocs } = this.props;
    const { editor, content, selection } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes.link != null);

    return (
      <div
        className={classNames.bind(styles)({
          'modal__editor-link__section': true,
        })}
      >
        <select
          ref={c => this.input = c}
          className={classNames.bind(styles)({
            'modal__editor-link__section__select': true,
          })}
          value={this.state.href}
          onChange={this.updateInput}
        >
          <option disabled value="Select section">
            Select section
          </option>
          {blocs && blocs.valueSeq().map(bloc =>
            <option
              key={bloc.id}
              value={bloc.id}
            >
              {bloc.name} Bloc
            </option>
          )}
        </select>
        <LinkSave
          onSave={e => formatContent(e, bloc.id, { href: this.input.value, scrollTo: true }, editor, content, onContentChange)}
        />
      </div>
    );
  }
};

const LinkSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkSection);

LinkSectionContainer.displayName = 'LinkSectionContainer';

export default LinkSectionContainer;