import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Gallery from 'react-photo-gallery';

import * as actionTypes from '../../store/actions';

let listOfImages = [];
let photos;

const PhotoGallery = props => {
  const importAll = r => {
    return r.keys().map(r);
  }

  const clickedButton = (e, data) => {
    props.onImageClick(data);
    props.history.push(`/photos/${data.index}`);
  }

  if (!photos) { 
    photos = importAll(require.context('../../../../images', false, /\.(png|jpe?g|svg)$/));
    photos.forEach(photo => {
      const obj = {};
      obj.src = photo;
      obj.width = 320;
      obj.height = 174;
      listOfImages.push(obj);
    });
  }

  return (
    <Fragment>
      <Gallery photos = { listOfImages } onClick = { (e, data) => clickedButton(e, data) } margin = { 5 } />
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    image: state.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onImageClick: (image) => {
      return dispatch({
        type: actionTypes.SET_IMAGE,
        image
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotoGallery));