import React from 'react';
import classNames from 'classnames/bind';
import TypographyFormatButton from '../TypographyFormatButton';
import styles from './styles';

const formats = [
  { name: 'align', value: 'left', icon: 'format_align_left' },
  { name: 'align', value: 'center', icon: 'format_align_center' },
  { name: 'align', value: 'right', icon: 'format_align_right' },
  { name: 'align', value: 'justify', icon: 'format_align_justify' },
];

const TypographyAlign = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__align': true,
    })}
  >
    {formats.map(format =>
      <TypographyFormatButton
        key={format.value}
        name={format.name}
        value={format.value}
        defaultValue="left"
        icon={format.icon}
      />
    )}
  </div>
);

export default TypographyAlign;