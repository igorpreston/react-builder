import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { webfontUpdateSearchFilter, getFontSearchFilter } from 'app/ducks/fonts';
import styles from './styles';

const mapStateToProps = state => ({
  searchFilter: getFontSearchFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onUpdate: filter => dispatch(webfontUpdateSearchFilter(filter)),
});

const FontSearch = ({ searchFilter, onUpdate }) => (
  <div
    className={classNames.bind(styles)({
      'modal__editor-fonts__search': true,
    })}
  >
    <div
      className={classNames.bind(styles)({
        'modal__editor-fonts__search__input-wrapper': true,
      })}
    >
      <input
        type="text"
        className={classNames.bind(styles)({
          'modal__editor-fonts__search__input': true,
        })}
        value={searchFilter}
        onChange={e => onUpdate(e.target.value)}
      />
      <i
        className={classNames.bind(styles)({
          'material-icons': true,
          'md-18': true,
          'modal__editor-fonts__search__icon': true,
        })}
      >
        search
      </i>
    </div>
  </div>
);

const FontSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FontSearch);

FontSearchContainer.displayName = 'FontSearchContainer';

export default FontSearchContainer;