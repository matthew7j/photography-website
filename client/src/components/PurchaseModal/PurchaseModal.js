import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';

import Button from '../Button/Button';
import PurchaseModalTabPanel from '../PurchaseModalTabPanel/PurchaseModalTabPanel';
import classes from './PurchaseModal.module.css';

const PurchaseModal = props => {
  return (
    <Modal
        aria-labelledby = 'simple-modal-title'
        aria-describedby = 'simple-modal-description'
        BackdropProps = {{ style: { backgroundColor: 'rgba(0, 0, 0, .9)'}}}
        open = { props.open }
        onClose = { () => props.close() }
        style = {{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className = { classes.purchaseModalContainer }>
        <h2>Choose Product</h2>
        <div className = { classes.purchaseModal }>
          <PurchaseModalTabPanel/>
          <div style = {{ margin: '0 auto', width: '93px', marginBottom: '10px' }}>
            <Button btnType = { 'addToCart' }>Add to Cart</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PurchaseModal);