import React from 'react';
import classNames from 'classnames/bind';
import TypographyFormatButton from '../TypographyFormatButton';
import styles from './styles';

const formats = [
  { name: 'indent', value: 40, icon: 'format_indent_increase' },
  { name: 'indent', value: -40, icon: 'format_indent_decrease' },
];

const TypographyIndent = () => (
  <div
    className={classNames.bind(styles)({
      'design__typography__indent': true,
    })}
  >
    {formats.map(format =>
      <TypographyFormatButton
        key={format.value}
        name={format.name}
        value={format.value}
        icon={format.icon}
      />
    )}
  </div>
);

export default TypographyIndent;