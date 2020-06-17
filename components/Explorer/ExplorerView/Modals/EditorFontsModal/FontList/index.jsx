import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { range } from 'range';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';
import styles from './styles';
import { getFontList, getFontListLength, webfontLoad } from 'app/ducks/fonts';
import FontListItem from '../FontListItem';

const mapStateToProps = state => ({
  fonts: getFontList(state),
  numFonts: getFontListLength(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: fonts => {
    dispatch(webfontLoad(fonts));
  },
});

function fontRenderer (props, fonts, onLoad) {
  if (props.isVisible) {
    onLoad([fonts.get(props.index)]);
  }
  return (
    <FontListItem
      uniqueKey={props.key}
      {...props}
    />
  );
};

const FontList = ({ fonts, numFonts, onLoad }) => {
  return (
    <div
      id="font-list"
      className={classNames.bind(styles)({
        'modal__editor-fonts__font-list': true,
      })}
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={numFonts}
            rowHeight={50}
            rowRenderer={(props) => fontRenderer(props, fonts, onLoad)}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </div>
  );
};

/*
onRowsRendered={({ startIndex, stopIndex }) => {
              const indexes = range(startIndex, stopIndex);
              const fontsToLoad = indexes.map(index => fonts.get(index));
              onLoad(fontsToLoad);
            }}
            */

const FontListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FontList);

FontListContainer.displayName = 'FontListContainer';

export default FontListContainer;