import React from 'react';
import classNames from 'classnames/bind';
import DrawButton from './DrawButton';
import styles from './styles';

const brushes = [
  { name: 'Section', icon: 'crop_16_9' },
  { name: 'Rich Text', icon: 'title' },
  { name: 'Image', icon: 'image' },
  { name: 'Video', icon: 'ondemand_video' },
];

const LeftPanel = () => (
  <div
    className={classNames.bind(styles)({
      'left-panel': true,
    })}
  >
    {brushes.map(brush =>
      <DrawButton
        key={brush.name}
        brush={brush.name}
        icon={brush.icon}
      />
    )}
  </div>
);

export default LeftPanel;
