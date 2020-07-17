import React, { Fragment } from 'react';
import { Card, CardMedia } from '@material-ui/core';

import classes from './Photo.module.css';

const Photo = props => {
  return (
    <Card style = {{ width: '345px' }}>
      <CardMedia image = { props.source } style = {{ height: 0, paddingTop: '56.25%' }}/>
    </Card>
  );
};

export default Photo;