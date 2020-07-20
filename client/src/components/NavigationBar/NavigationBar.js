import React, { Fragment } from 'react';
import { Link, Toolbar, Typography } from '@material-ui/core';

import classes from './NavigationBar.module.css';

const NavigationBar = props => {
  let typographyClass = classes.typography;
  if (props.inverted) {
    typographyClass = classes.typographyInverted;
  }
  return (
    <Fragment>
        <Toolbar className = { classes.toolbar } disableGutters = { true }>
          <Typography className = { typographyClass }>
            <Link className = { classes.link } href = '/'>
              HOME
            </Link>
            <Link className = { classes.link } href = '/photos'>
              PHOTOS
            </Link>
            <Link className = { classes.link } href = '#'>
              GEAR
            </Link>
            <Link className = { classes.link } href = '#'>
              ABOUT ME
            </Link>
            <Link className = { classes.link } href = '#'>
              CONTACT
            </Link>
            <Link className = { classes.link } href = '/cart'>
              CART
            </Link>
          </Typography>
        </Toolbar>
    </Fragment>
  );
};

export default NavigationBar;