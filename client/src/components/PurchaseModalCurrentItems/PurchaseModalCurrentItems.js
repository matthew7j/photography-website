import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, List, ListItem, ListItemText, styled } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import Button from '../Button/Button';
import classes from './PurchaseModalCurrentItems.module.css';

const StyledListItemText = styled(ListItemText)({
  fontSize: 'small'
});

const StyledListItemTextTotal = styled(ListItemText)({
  fontSize: 'large',
  textAlign: 'center !important',
  margin: '0 auto !important',
  padding: '0 !important'
});

const StyledListItem = styled(ListItem)({
  margin: '0',
  padding: '0',
  paddingLeft: '15px',
  paddingRight: '15px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .1)'
  }
});

const PurchaseModalCurrentItems = props => {
  const [openCurrentItems, setOpenCurrentItems] = useState(true);
  let totalPrice = 0;
  let totalPriceString;

  const list = props.products.map(product => {
    const priceString = `${product.count}  x  $${product.price}  =  $${product.totalPrice}`;
    totalPrice += product.totalPrice;
    totalPriceString = `Total Price: $${totalPrice}`;

    return (
      <StyledListItem key = { product.product } className = { classes.nested }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { product.product } />
        <StyledListItemText disableTypography className = { classes.nested } primary = { priceString } style = {{ float: 'right', textAlign: 'right', paddingRight: '10px'}} />
        <Button btnType = { 'decrementItem' } clicked = { () => props.decrementItem(product.product) }>-</Button>
        <Button btnType = { 'incrementItem' } clicked = { () => props.incrementItem(product.product) }>+</Button>
        <Button btnType = { 'removeItem' } clicked = { () => props.removeItem(product.product) }>x</Button>
      </StyledListItem>
    );
  });

  if (list.length === 0) {
    return null;
  }

  return (
    <div className = { classes.purchaseModalCurrentItems }>
      <List
        component = 'nav'
        aria-labelledby = 'nested-list-subheader'
        className = { classes.root }
        >
        <ListItem button onClick = { () => setOpenCurrentItems(!openCurrentItems) }>
          <ListItemText primary = 'Current Items' />
          { openCurrentItems ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in = { openCurrentItems } timeout = 'auto' unmountOnExit>
          <List component = 'div' disablePadding>
            { list }
          </List>
          <hr></hr>
          <StyledListItemTextTotal disableTypography className = { classes.nested } style = {{ paddingRight: '40px', textAlign: 'right' }} primary = { totalPriceString } />
        </Collapse>
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PurchaseModalCurrentItems);