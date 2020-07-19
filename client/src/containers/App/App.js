import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Photo from '../../components/Photo/Photo';
import classes from './App.module.css';

class App extends Component {
  render = () => {
    return (
      <Fragment>
        <div className = { classes.App }>
          <header className = { classes.AppHeader }>
            <Route exact path = '/'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { false }></NavigationBar>
                  <BackgroundImageContainer></BackgroundImageContainer>
                </Fragment>
              )}
            />

            <Route exact path = '/photos'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { false } ></NavigationBar>
                  <PhotoGallery />
                </Fragment>
              )}
            />

            <Route exact path = '/photos/:id'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { false } ></NavigationBar>
                  <Photo/>
                </Fragment>
              )}
            />
          </header>
        </div>
      </Fragment>
    );
  };
}

export default withRouter(App);
