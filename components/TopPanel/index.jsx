import React from 'react';
import classNames from 'classnames/bind';
import SelectButton from './SelectButton';
import InlineBlotButton from './InlineBlotButton';
import EmbedBlotButton from './EmbedBlotButton';
import ColorBlotButton from './ColorBlotButton';
import styles from './styles';

const TopPanel = () => (
  <div
    className={classNames.bind(styles)({
      'top-panel': true,
    })}
  >
    <SelectButton />
    <InlineBlotButton key={1} name="bold" icon="format_bold" />
    <InlineBlotButton key={2} name="italic" icon="format_italic" />
    <InlineBlotButton key={3} name="link" icon="link" />
    <EmbedBlotButton key={4} name="image" icon="image" />
    <EmbedBlotButton key={5} name="video" icon="ondemand_video" />
    <ColorBlotButton key={6} name="color" icon="format_color_text" />
    <InlineBlotButton key={9} name="background-color" icon="format_color_fill" value="orange" />
    <InlineBlotButton key={7} name="size" icon="text_fields" value="40px" />
    <InlineBlotButton key={8} name="align" icon="format_align_right" value="right" />
    <InlineBlotButton key={10} name="font" icon="font_download" value="Roboto" />
    <InlineBlotButton key={11} name="indent" icon="format_indent_increase" value="+1" />
  </div>
);

export default TopPanel;
