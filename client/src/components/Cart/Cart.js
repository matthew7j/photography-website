import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, Grid, styled } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';

import Button from '../Button/Button';
import classes from './Cart.module.css';
import * as actionTypes from '../../store/actions';

const StyledGridItem = styled(Grid)({
  fontSize: 'small',
  alignItems: 'center',
  fontWeight: 'lighter'
});

const StyledGridItemPrice = styled(Grid)({
  fontSize: 'smaller',
  verticalAlign: 'middle',
  alignItems: 'center'
});

const StyledGridTotalItemPrice = styled(Grid)({
  fontSize: 'small',
  verticalAlign: 'middle',
  alignItems: 'center',
  padding: '3%',
  border: '1px solid rgba(255, 255, 255, .1)',
  margin: '0 auto'
});

const StyledGridSmallText = styled(Grid)({
  textAlign: 'left',
  '& h2': {
    fontSize: 'small',
    margin: 0,
    padding: 0,
    display: 'inline',
    fontWeight: 'normal'
  },
  '& h3': {
    fontSize: 'small',
    fontWeight: 'lighter',
    margin: 0,
    padding: 0,
    display: 'inline'
  }
});

const StyledGridTotalPriceText = styled(Grid)({
  textAlign: 'right'
});

const Cart = props => {
  const clearCart = () => {
    props.onClearCart();
  };

  const incrementItem = (index) => {
    let currentProducts = props.cart.slice();
    currentProducts[index].count++;
    currentProducts[index].totalPrice = currentProducts[index].totalPrice + currentProducts[index].price;
    props.onClearCart();
    props.onAddToCart(currentProducts);
  };

  const decrementItem = (index) => {
    let currentProducts = props.cart.slice();
    currentProducts[index].count--;
    currentProducts[index].totalPrice = currentProducts[index].totalPrice - currentProducts[index].price;
    if (currentProducts[index].count === 0) {
      currentProducts.splice(index, 1);
    }
    props.onClearCart();
    props.onAddToCart(currentProducts);
  };

  const removeItem = (index) => {
    let currentProducts = props.cart.slice();
    currentProducts.splice(index, 1);
    props.onClearCart();
    props.onAddToCart(currentProducts);
  };

  const continueShopping = () => {
    props.history.push(`/photos`);
  };

  const checkout = () => {
    props.history.push(`/checkout`);
  };

  let subtotalPrice = (props.cart.reduce((sum, next) => sum + (next.price * next.count), 0)).toFixed(2);
  let tax = (subtotalPrice * .07).toFixed(2);
  let totalPrice = (parseFloat(subtotalPrice) + parseFloat(tax)).toFixed(2);
  const subTotalString = `$${ subtotalPrice }`;
  const totalPriceString = `$${ totalPrice }`;
  const taxString = `$${ tax }`;

  const cartJSX = props.cart.map((item, index) => {
    const priceString = `$${ (item.price).toFixed(2) }`;
    
    return (
      <Grid key = { index } container spacing = { 0 } style = {{ marginBottom: '20px' }}>
        <Grid item lg = { 4 } md = { 4 } sm = { 4 } xs = { 3 }>
          <Card style = {{ margin: 'auto', borderRadius: '0' }}>
            <CardMedia image = { item.photo } style = {{ height: 0, paddingTop: '56.25%' }}/>
          </Card>
        </Grid>
        <StyledGridItem item lg = { 4 } md = { 4 } sm = { 4 } xs = { 3 } style = {{ textAlign: 'left', paddingLeft: '2%' }}>
          { item.product }
        </StyledGridItem>
        <StyledGridItemPrice item lg = { 4 } md = { 4 } sm = { 4 } xs = { 6 }>
          <StyledGridItemPrice style = {{ textAlign: 'center' }}>
            { priceString }
          </StyledGridItemPrice>
          <Button btnType = { 'decrementItem' } noButton = { item.count === 1} clicked = { () => decrementItem(index) }>-</Button>
          <Button btnType = { 'number' }> { item.count } </Button>
          <Button btnType = { 'incrementItem' } clicked = { () => incrementItem(index) }>+</Button>
          <Button btnType = { 'removeItem' } clicked = { () => removeItem(index) }>x</Button>
        </StyledGridItemPrice>
      </Grid>
    )
  });

  return (
    (get(props, 'location.state.payment') !== true) ? 
      <div className = { classes.cart }>
        <Fragment>
          <Grid container spacing = { 0 } style = {{ margin: '0 auto', width: '100%' }}>
            <Grid item xs = { 6 }>
              <h3>Shopping Cart</h3>
            </Grid>
            <Grid item xs = { 6 } style = {{ textAlign: 'right', marginBottom: '20px' }}>
              <Button clicked = { clearCart } btnType = { 'clearCart' }> Clear Cart </Button>
            </Grid>
          </Grid>
          <div className = { classes.itemsContainer }>
            <Grid container spacing = { 0 }>
              { cartJSX }
            </Grid>
          </div>
          <div className = { classes.totalContainer }>
            <StyledGridTotalItemPrice>
              <Grid container>
                <StyledGridSmallText item md = { 8 } sm = { 6 } xs = { 6 } style = {{ paddingBottom: '10px' }}>
                  <h2>SUBTOTAL</h2>
                  <h3>  (ESTIMATE)</h3>
                </StyledGridSmallText>
                <StyledGridTotalPriceText item md = { 4 } sm = { 6 } xs = { 6 }>
                  { subTotalString }
                </StyledGridTotalPriceText>
              </Grid>
              <Grid container>
                <StyledGridSmallText item md = { 8 } sm = { 6 } xs = { 6 }style = {{ paddingBottom: '10px' }}>
                  <h2>TAX</h2>
                </StyledGridSmallText>
                <StyledGridTotalPriceText item md = { 4 } sm = { 6 } xs = { 6 }>
                  { taxString }
                </StyledGridTotalPriceText>
              </Grid>
              <hr style = {{ marginTop: '1px' }}>
              </hr>
              <Grid container>
                <StyledGridSmallText item md = { 8 } sm = { 6 } xs = { 6 }>
                  <h2>TOTAL</h2>
                  <h3>  (ESTIMATE)</h3>
                </StyledGridSmallText>
                <StyledGridTotalPriceText item md = { 4 } sm = { 6 } xs = { 6 }>
                  { totalPriceString }
                </StyledGridTotalPriceText>
              </Grid>
              <Button btnType = { 'checkout' } clicked = { checkout }>Begin Checkout</Button>
              <br/>
              <Button btnType = { 'continueShopping' } clicked = { continueShopping }>Continue Shopping</Button>
            </StyledGridTotalItemPrice>
          </div>
        </Fragment>
      </div>
      :
      <div style = {{ marginTop: '30px' }}>
        Payment Successful!
        <p style = {{ fontSize: '20px' }}>Please check your email for your confirmation of your purchase.</p>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearCart: () => {
      return dispatch({
        type: actionTypes.CLEAR_CART
      });
    },
    onAddToCart: items => {
      return dispatch({
        type: actionTypes.ADD_TO_CART,
        items: items
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));