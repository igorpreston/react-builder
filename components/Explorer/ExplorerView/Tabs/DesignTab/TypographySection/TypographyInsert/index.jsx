import React from 'react';
import classNames from 'classnames/bind';
import TypographyModalButton from '../TypographyModalButton';
import styles from './styles';

const formats = [
  { modal: 'editor-link', name: 'link', icon: 'insert_link' },
  { modal: 'editor-image', name: 'image', icon: 'image' },
  { modal: 'editor-video', name: 'video', icon: 'ondemand_video' },
  { modal: 'editor-emoji', name: 'emoji', icon: 'insert_emoticon' },
];

const TypographyInsert = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__insert': true,
    })}
  >
    {formats.map(format =>
      <TypographyModalButton
        key={format.name}
        modal={format.modal}
        name={format.name}
        icon={format.icon}
      />
    )}
  </div>
);

export default TypographyInsert;