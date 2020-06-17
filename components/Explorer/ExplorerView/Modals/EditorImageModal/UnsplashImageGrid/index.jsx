import React from 'react';
import { connect } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import ImageGrid from '../ImageGrid';

const mapStateToProps = state => ({

});

const unsplash = new Unsplash({
  applicationId: 'a425bdb449dc6254a4e8ef988b36148a511ced8014be9d9277441ceee174b87e',
  secret: '858902539565f3c9152116fc7eca0cb38d344d939de7709a11251e9b50039969',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
});

unsplash.photos.listPhotos(2, 15, "latest")
  .then(toJson)
  .then(json => {
    console.log(json);
  });

const UnsplashImageGrid = connect(
  mapStateToProps,
)(ImageGrid);

export default UnsplashImageGrid;