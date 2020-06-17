import React from 'react';
import classNames from 'classnames/bind';
import TypographyFormatButton from '../TypographyFormatButton';
import styles from './styles';

const formats = [
  { name: 'bold', value: 'bold', icon: 'format_bold' },
  { name: 'italic', value: 'italic', icon: 'format_italic' },
  { name: 'underline', value: 'underline', icon: 'format_underlined' },
  { name: 'strike', value: 'line-through', icon: 'strikethrough_s' },
];

const TypographyFormat = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__format': true,
    })}
  >
    {formats.map(format =>
      <TypographyFormatButton
        key={format.name}
        name={format.name}
        value={format.value}
        defaultValue={null}
        icon={format.icon}
      />
    )}
  </div>
);

export default TypographyFormat;