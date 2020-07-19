import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, Grid } from '@material-ui/core';

import PhotoPurchaseContainer from '../../containers/PhotoPurchaseContainer/PhotoPurchaseContainer';
import PhotoInformationContainer from '../../components/PhotoInformationContainer/PhotoInformationContainer';
import classes from './Photo.module.css';

const Photo = props => {
  return (
    <Fragment>
      <div className = { classes.photo } style = {{ width: '100%', margin: 'auto', height: '90vh' }}>     
        <div style = {{ width: '20%', margin: 'auto', marginTop: '2%', float: 'left', height: '85vh', marginLeft: '1%' }}>
          <Grid style = {{ height: '100%' }} container spacing = { 0 }>
            <Grid item xs = { 12 }>
              <PhotoPurchaseContainer/>
            </Grid>
          </Grid>
        </div>
        <div style = {{ marginLeft: '22%', height: '85vh', maxWidth: '1200px' }}>
          <Grid container spacing = { 0 }>
            <Grid style = {{ padding: '10px', paddingTop: '0', marginTop: '2.5%' }} item xs = { 12 }>
              <Card style = {{ width: '100%', maxWidth: '1200px', margin: 'auto', borderRadius: '0' }}>
                <CardMedia image = { props.image.photo.src } style = {{ height: 0, paddingTop: '56.25%' }}/>
              </Card>
            </Grid>
          </Grid>
          <PhotoInformationContainer/>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(Photo);