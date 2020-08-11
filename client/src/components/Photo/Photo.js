import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, Grid } from '@material-ui/core';

import PurchaseModal from '../../components/PurchaseModal/PurchaseModal';
import PhotoInformationContainer from '../../components/PhotoInformationContainer/PhotoInformationContainer';
import classes from './Photo.module.css';

const Photo = props => {
  const [open, setOpen] = useState(false);
  
  return (
    <Fragment>
      <div className = { classes.photo } style = {{ width: '100%', height: '90vh' }}>     
        <div style = {{ maxWidth: '1200px', margin: '0 auto', }}>
          <Grid container spacing = { 0 }>
            <Grid style = {{ padding: '10px', paddingTop: '0' }} item xs = { 12 }>
              <Card style = {{ width: '100%', maxWidth: '1200px', margin: 'auto', borderRadius: '0' }}>
                <CardMedia image = { props.image.photo.src } style = {{ height: 0, paddingTop: '66.25%' }}/>
              </Card>
            </Grid>
          </Grid>
          <PurchaseModal open = { open } close = { () => setOpen(false) }></PurchaseModal>
          <PhotoInformationContainer openModal = { () => setOpen(true) }/>
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