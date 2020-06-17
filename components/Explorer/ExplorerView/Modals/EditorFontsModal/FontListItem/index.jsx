import React, { Component } from 'react';
import WebFont from 'webfontloader';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import { textEditorContentChange } from 'app/ducks/textEditor';
import { getFontByIndex, getIsFontLoading, getHasFontLoaded, getHasFontFailed } from 'app/ducks/fonts';
import styles from './styles';
import '!style-loader!css-loader!animate.css';

const mapStateToProps = (state, props) => ({
  bloc: getSingleSelectedBloc(state),
  font: getFontByIndex(state, props.index),
  isLoading: getIsFontLoading(state, props.index),
  hasLoaded: getHasFontLoaded(state, props.index),
  hasFailed: getHasFontFailed(state, props.index),
});

const mapDispatchToProps = dispatch => ({
  onContentChange: (id, newContent, oldContent) => dispatch(textEditorContentChange(id, newContent, oldContent)),
});

export class FontListItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  formatContent = e => {
    this.preventClick(e);
    const { bloc } = this.props;
    const { editor } = bloc.text;

    editor.format('font', this.props.font.get('name'));
  };

  render() {
    const { uniqueKey, style, font, isLoading, hasLoaded, isVisible, hasFailed, isScrolling, bloc, onContentChange } = this.props;

    const { editor, selection, content } = bloc.text;
    const selectedContent = selection && editor.getContents(selection.index, selection.length);
    const selectionHasFormatting = selection && selectedContent && selectedContent.ops.find(format => format.attributes && format.attributes['font'] != null);

    return (
      <div
        key={uniqueKey}
        className={classNames.bind(styles)({
          'modal__editor-fonts__font-list__item': true,
        })}
        style={style}
        onClick={this.formatContent}
      >
        <div
          className={classNames.bind(styles)({
            'modal__editor-fonts__font-list__item__title': true,
          })}
          style={{
            fontFamily: font.get('name'),
          }}
        >
          {isScrolling ? 'Loading...' : hasFailed ? 'Failed to fetch font.' : hasLoaded ? font.get('name') : 'Loading...'}
        </div>
      </div>
    );
  }
}
const FontListItemContainer = connect(
  mapStateToProps,
)(FontListItem);

export default FontListItemContainer;