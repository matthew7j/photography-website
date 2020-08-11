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
  const imageSummary = get(imageJson, 'summary');

  return (
    <Fragment>
      <div className = { classes.photoInformationContainer }>
        <Grid container style = {{ padding: '10px' }}>
          <Grid item md = { 4 } sm = { 4 } xs = { 3 }>

          </Grid>
          <Grid item md = { 4 } sm = { 4 } xs = { 6 }>
            <Button btnType = { 'purchase' } clicked = { () => props.openModal(true) }>Purchase Photo</Button>
          </Grid>
          <Grid item md = { 4 } sm = { 4 } xs = { 3 }>
          </Grid>
          <Grid item md = { 3 } sm = { 3 } xs = { 3 }>
          </Grid>
          { (imageSummary) ? 
          <Grid item xs = { 6 } style = {{ border: '1px solid rgba(0, 0, 0, .6)', backgroundColor: '#fff', fontSize: 'normal', fontWeight: 'lighter', marginTop: '20px', padding: '10px' }}>
            <p>{ get(imageJson, 'summary') }</p>
          </Grid>
          : <Grid item xs = { 6 }></Grid> }
          <Grid item xs = { 3 }>
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