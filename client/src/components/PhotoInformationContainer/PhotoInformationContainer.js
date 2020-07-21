import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import get from 'lodash/get';

import Button from '../../components/Button/Button';
import classes from './PhotoInformationContainer.module.css';

const PhotoInformationContainer = props => {
  const importAll = r => {
    return r.keys().map(r);
  }
  const imageName = props.image.photo.src.match('^.*/([^.]*).*$')[1];
  const imageJson = importAll(require.context('../../../../images', false, /\.(json)$/))[0][imageName];

  return (
    <Fragment>
      <div className = { classes.photoInformationContainer }>
        <Grid container style = {{ padding: '10px' }}>
          <Grid item xs = { 4 } style = {{ border: '1px solid rgba(0, 0, 0, .6)', backgroundColor: '#d7d3cb' }}>
            <h3>Location</h3>
            <p>{ get(imageJson, 'location') }</p>
          </Grid>
          <Grid item xs = { 4 }>
            <Button btnType = { 'purchase' } clicked = { () => props.openModal(true) }>Purchase Photo</Button>
          </Grid>
          <Grid item xs = { 4 } style = {{ border: '1px solid rgba(0, 0, 0, .6)', backgroundColor: '#d7d3cb' }}>
            <h3>Camera Settings</h3>
            <p>ISO: { get(imageJson, 'cameraSettings.iso') }</p>
          </Grid>
          <hr style = {{ margin: '10px', border: 'none' }}></hr>
          <Grid item xs = { 12 } style = {{ border: '1px solid rgba(0, 0, 0, .6)', backgroundColor: '#d7d3cb' }}>
            <h3>Photo Summary</h3>
            <p>{ get(imageJson, 'summary') }</p>
          </Grid>
        </Grid>
      </div>  
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PhotoInformationContainer);