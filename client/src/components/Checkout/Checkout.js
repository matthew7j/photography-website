import React from 'react';
import { connect } from 'react-redux';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Grid, styled } from '@material-ui/core';

import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import classes from './Checkout.module.css';

const stripePromise = loadStripe('pk_test_51H7DOTJdeKSXNoJuTtoALAfWgfV9mtCUfO5soHIYEfFd4iCQQ261zi0ogeU1YhLVxNe5S8Wcc8DEg4SjG0ef4I6V00Q42A8ur0');

const StyledGridSmallText = styled(Grid)({
  textAlign: 'left',
  '& h2': {
    fontSize: '14px',
    margin: 0,
    padding: 0,
    display: 'inline',
    fontWeight: 'normal'
  },
  '& h3': {
    fontSize: '8px',
    fontWeight: 'lighter',
    margin: 0,
    padding: 0,
    display: 'inline'
  }
});

const StyledGridContainer = styled(Grid)({
  padding: '15px',
  height: '200px',
  border: '1px solid rgba(255, 255, 255, .1)',
  marginTop: '45px'
});

const StyledGridTotalPriceText = styled(Grid)({
  textAlign: 'right',
  fontSize: '18px',
  paddingTop: '5%'
});

const InjectedCheckoutForm = props => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <CheckoutForm stripe = { stripe } elements = { elements } totalPrice = { props.totalPrice } />
    )}
  </ElementsConsumer>
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const Checkout = props => {
  let subtotalPrice = (props.cart.reduce((sum, next) => sum + (next.price * next.count), 0)).toFixed(2);
  let tax = (subtotalPrice * .07).toFixed(2);
  let totalPrice = (parseFloat(subtotalPrice) + parseFloat(tax)).toFixed(2);

  const subTotalString = `$${ subtotalPrice }`;
  const totalPriceString = `$${ totalPrice }`;
  const taxString = `$${ tax }`;
  
  return (
    <div className = { classes.checkout }>
      <Grid container style = {{ width: '100%', paddingBottom: '25px' }}>
        <Grid item sm = { 8 }>
          <div className = { classes.checkoutInfo }>
            <Elements options = { ELEMENTS_OPTIONS } stripe = { stripePromise }>
              <InjectedCheckoutForm totalPrice = { totalPrice } />
            </Elements>
          </div>
        </Grid>
        <StyledGridContainer item sm = { 4 }>
          <Grid container>
            <StyledGridSmallText item md = { 8 } sm = { 6 } style = {{ paddingBottom: '10px' }}>
              <h2>SUBTOTAL</h2>
              <h3>  (ESTIMATE)</h3>
            </StyledGridSmallText>
            <StyledGridTotalPriceText item md = { 4 } sm = { 6}>
              { subTotalString }
            </StyledGridTotalPriceText>
          </Grid>
          <Grid container>
            <StyledGridSmallText item md = { 8 } sm = { 6 } style = {{ paddingBottom: '10px' }}>
              <h2>TAX</h2>
            </StyledGridSmallText>
            <StyledGridTotalPriceText item md = { 4 } sm = { 6}>
              { taxString }
            </StyledGridTotalPriceText>
          </Grid>
          <hr style = {{ marginTop: '1px' }}>
          </hr>
          <Grid container>
            <StyledGridSmallText item md = { 8 } sm = { 6 }>
              <h2>TOTAL</h2>
              <h3>  (ESTIMATE)</h3>
            </StyledGridSmallText>
            <StyledGridTotalPriceText item md = { 4 } sm = { 6}>
              { totalPriceString }
            </StyledGridTotalPriceText>
          </Grid>
        </StyledGridContainer>
      </Grid>
    </div>
    
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, null)(Checkout);