import React, { Fragment, useEffect  } from 'react';
import { connect } from 'react-redux';
import request from 'request';

import { loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const Checkout = props => {
  let token;

  useEffect(() => {
    const getConnectionToken = async () => {
      request('http://localhost:5000/getConnectionToken', (err, res) => {
        const token = JSON.parse(res.body).connectionToken;
        console.log(`token: ${JSON.stringify(token)}`);
      });
    };

    getConnectionToken();
  });

  return (
    <Fragment>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, null)(Checkout);