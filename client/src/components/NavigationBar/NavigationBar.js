import React, { Fragment } from 'react';
import { Link, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import classes from './NavigationBar.module.css';

const NavigationBar = props => {
  let typographyClass = classes.typography;
  let toolbarClass = classes.toolbar;

  if (props.inverted) {
    typographyClass = classes.typographyInverted;
    toolbarClass = classes.toolbarInverted;
  }

  let cartString = 'CART';

  if (props.cart.length > 0) {
    cartString = `CART (${props.cart.length})`;
  }
  let style = {};
  if (props.cart.length > 0) {
    style = {
      color: '#33FF46'
    };
  }

  return (
    <Fragment>
        <Toolbar className = { toolbarClass } disableGutters = { true }>
          <Typography className = { typographyClass }>
            <Link className = { classes.link } href = '/'>
              HOME
            </Link>
            <Link className = { classes.link } href = '/photos'>
              PHOTOS
            </Link>
            <Link className = { classes.link } style = { style } href = '/cart'>
              { cartString }
            </Link>
          </Typography>
        </Toolbar>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, null)(NavigationBar);