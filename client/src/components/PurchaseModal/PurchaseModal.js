import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';

import Button from '../Button/Button';
import PurchaseModalTabPanel from '../PurchaseModalTabPanel/PurchaseModalTabPanel';
import PurchaseModalCurrentItems from '../PurchaseModalCurrentItems/PurchaseModalCurrentItems';
import classes from './PurchaseModal.module.css';
import * as actionTypes from '../../store/actions';

const PurchaseModal = props => {
  const [products, addToProducts] = useState([]);

  const handleProductSelection = (product, price) => {
    let currentProducts = products.slice();
    const existingProductIndex = currentProducts.findIndex(element => element.product === product);

    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex].count++;
      currentProducts[existingProductIndex].totalPrice = currentProducts[existingProductIndex].totalPrice + price;
    } else {
      const item = {
        photo: props.image.photo.src,
        product,
        price,
        totalPrice: price,
        count: 1
      };
      currentProducts = [...currentProducts, item];
    }
    addToProducts(currentProducts);
  };

  const addToCart = items => {
    props.onAddToCart(items);
    props.close();
  };

  const incrementItem = product => {
    let currentProducts = products.slice();
    const existingProductIndex = currentProducts.findIndex(element => element.product === product);
    currentProducts[existingProductIndex].count++;
    currentProducts[existingProductIndex].totalPrice = currentProducts[existingProductIndex].totalPrice + currentProducts[existingProductIndex].price;
    addToProducts(currentProducts);
  };

  const decrementItem = product => {
    let currentProducts = products.slice();
    const existingProductIndex = currentProducts.findIndex(element => element.product === product);
    currentProducts[existingProductIndex].count--;
    currentProducts[existingProductIndex].totalPrice = currentProducts[existingProductIndex].totalPrice - currentProducts[existingProductIndex].price;
    if (currentProducts[existingProductIndex].count === 0) {
      currentProducts.splice(existingProductIndex, 1);
    }
    addToProducts(currentProducts);
  };

  const removeItem = product => {
    let currentProducts = products.slice();
    const existingProductIndex = currentProducts.findIndex(element => element.product === product);
    currentProducts.splice(existingProductIndex, 1);
    addToProducts(currentProducts);
  };

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
          <PurchaseModalTabPanel clicked = { handleProductSelection }/>
          <PurchaseModalCurrentItems products = { products } incrementItem = { incrementItem } decrementItem = { decrementItem } removeItem = { removeItem }/>
          <div style = {{ margin: '0 auto', width: '93px', marginBottom: '10px' }}>
            <Button btnType = { 'addToCart' } clicked = { () => addToCart(products) }>Add to Cart</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    image: state.image,
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: items => {
      return dispatch({
        type: actionTypes.ADD_TO_CART,
        items: items
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseModal);