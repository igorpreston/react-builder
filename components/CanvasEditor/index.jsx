import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Canvas from 'app/components/Canvas';

const CanvasEditor = () => (
  <Scrollbars
    style={{ position: 'fixed', top: 50, left: 50, right: 400, width: 'calc(100% - 400px)', height: 'calc(100% - 50px)' }}
    renderThumbVertical={({ style, ...props }) => {
      return (
        <div style={{ ...style, backgroundColor: '#1b2430', right: 0, top: 0, bottom: 0 }} {...props} />
      );
    }}
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
  >
    <Canvas />
  </Scrollbars>
);

export default CanvasEditor;
