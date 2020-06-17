import React, { Component } from 'react';
import WebFont from 'webfontloader';

class WebFontLoader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    WebFont.load({
      google: {
        classes: false,
        events: false,
        families: ['Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i'],
      },
    });
  }

  render() {
    return null;
  }
};

export default WebFontLoader;