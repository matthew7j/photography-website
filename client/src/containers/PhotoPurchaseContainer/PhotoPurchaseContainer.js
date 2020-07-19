import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button/Button';
import PurchaseModal from '../../components/PurchaseModal/PurchaseModal';

import classes from './PhotoPurchaseContainer.module.css';

const PhotoPurchaseContainer = props => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <div className = { classes.photoPurchaseContainer }>
        <Button clicked = { () => setOpen(true) }>Purchase Photo</Button>
        <PurchaseModal open = { open } close = { () => setOpen(false) }></PurchaseModal>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PhotoPurchaseContainer);