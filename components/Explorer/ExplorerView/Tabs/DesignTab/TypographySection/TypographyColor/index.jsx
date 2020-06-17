import React from 'react';
import classNames from 'classnames/bind';
import TypographyModalButton from '../TypographyModalButton';
import styles from './styles';

const formats = [
  { modal: 'editor-text-color', name: 'text-color', icon: 'format_color_text' },
  { modal: 'editor-background-color', name: 'background-color', icon: 'format_paint' },
];

const TypographyColor = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__color': true,
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

export default TypographyColor;