import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles';

const LinkSave = ({ onSave }) => (
  <button
    className={classNames.bind(styles)({
      'modal__editor-link__save__button': true,
    })}
    onMouseDown={onSave}
  >
    Save
  </button>
);

export default LinkSave;