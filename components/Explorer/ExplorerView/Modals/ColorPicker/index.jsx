import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.css';
import { CustomPicker } from 'react-color';
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common';

const ColorPicker = ({ onChangeComplete, ...props }) => (
  <div
    className={classNames.bind(styles)({
      'design__color-picker': true,
    })}
  >
    <div
      className={classNames.bind(styles)({
        'design__color-picker__hue': true,
      })}
    >
      <Hue {...props} onChangeComplete={onChangeComplete} />
    </div>
    <div
      className={classNames.bind(styles)({
        'design__color-picker__alpha': true,
      })}
    >
      <Alpha {...props} onChangeComplete={onChangeComplete} />
    </div>
    <div
      className={classNames.bind(styles)({
        'design__color-picker__saturation': true,
      })}
    >
      <Saturation {...props} onChangeComplete={onChangeComplete} />
    </div>
  </div>
);

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {

};

export default CustomPicker(ColorPicker);