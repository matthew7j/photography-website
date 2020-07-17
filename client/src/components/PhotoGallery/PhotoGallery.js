import React, { Component, Fragment } from 'react';

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// import classes from './PhotoGallery.module.css';

let listOfImages = [];
let photos;

class PhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  importAll = r => {
    return r.keys().map(r);
  }

  openModal = (event, { index }) => {
    this.setState({
      isOpen: true,
      photoIndex: index
    })
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    })
  };

  clickedButton = photoIndex => {
    console.log(`Clicked image: ${photos[photoIndex]}`);
  }

  render = () => {
    const { photoIndex, isOpen } = this.state;

    if (!photos) {
      photos = this.importAll(require.context('../../../../images', false, /\.(png|jpe?g|svg)$/));
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
        <div style = {{ padding: '100px' }} >
          <Gallery photos = { listOfImages } enableLightbox = { true } onClick = { this.openModal }/>
          { isOpen && (
            <Lightbox
              mainSrc = { photos[photoIndex] }
              onCloseRequest = { this.closeModal }
              imagePadding = { 100 }
              toolbarButtons = { [<button onClick = {() => this.clickedButton(photoIndex) }>Purchase me</button>] }
              reactModalStyle = {{ zIndex: 2 }}
            />
          )}
        </div>
      </Fragment>
    );
  }
};

export default PhotoGallery;