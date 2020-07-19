import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';

const PurchaseModal = props => {
  return (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open = { props.open }
        onClose={ () => props.close() }
    >
        <div>
            <h2>Simple React Modal</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non pharetra est ultrices et.
            </p>
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