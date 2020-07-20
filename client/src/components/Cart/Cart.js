import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ListItem, ListItemText, styled } from '@material-ui/core';

import Button from '../Button/Button';
import classes from './Cart.module.css';
import * as actionTypes from '../../store/actions';

const StyledListItemText = styled(ListItemText)({
  fontSize: 'small'
});

const StyledListItem = styled(ListItem)({
  margin: '0',
  padding: '0',
  paddingLeft: '15px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .1)'
  }
});

const Cart = props => {
  const clearCart = () => {
    props.onClearCart();
  };

  const cartJSX = props.cart.map((item, index) => {
    return (
      <StyledListItem div key = { index } className = { classes.nested }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { item.photo } />
        <StyledListItemText disableTypography className = { classes.nested } primary = { item.product } />
        <StyledListItemText disableTypography className = { classes.nested } primary = { item.count } />
      </StyledListItem>
    )
  });

  return (
    <div className = { classes.cart }>
      <Fragment>
        { cartJSX }
        <Button clicked = { clearCart } btnType = { 'clearCart' }> Clear Cart </Button>
      </Fragment>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);