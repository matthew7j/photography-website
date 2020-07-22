import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Photo from '../../components/Photo/Photo';
import Cart from '../../components/Cart/Cart';
import Checkout from '../../components/Checkout/Checkout';
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
                  <NavigationBar inverted = { true } ></NavigationBar>
                  <PhotoGallery />
                </Fragment>
              )}
            />

            <Route exact path = '/photos/:id'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { true } ></NavigationBar>
                  <Photo/>
                </Fragment>
              )}
            />

            <Route exact path = '/cart'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { true } ></NavigationBar>
                  <div style = {{ width: '90%', paddingRight: '35px' }}>
                    <Cart></Cart>
                  </div>
                </Fragment>
              )}
            />

            <Route exact path = '/checkout'
              render = { () => (
                <Fragment>
                  <NavigationBar inverted = { true } ></NavigationBar>
                  <div style = {{ width: '100%' }}>
                    <Checkout></Checkout>
                  </div>
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
