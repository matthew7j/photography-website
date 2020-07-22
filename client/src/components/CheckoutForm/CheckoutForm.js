import React from 'react';
import { connect } from 'react-redux';
import { CardElement } from '@stripe/react-stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Collapse, List, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import classes from './CheckoutForm.module.css';
import * as actionTypes from '../../store/actions';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#d7d3cb',
      color: '#d7d3cb',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#red',
      },
      '::placeholder': {
        color: 'rgba(255, 255, 255, .5)',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
};

const CardField = ({onChange}) => (
  <div className = { classes.FormRow }>
    <CardElement options = { CARD_OPTIONS } onChange = { onChange } />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor = { id } className = { classes.FormRowLabel }>
      { label }
    </label>
    <input
      className = { classes.FormRowInput }
      id = { id }
      type = { type }
      placeholder = { placeholder }
      required = { required }
      autoComplete = { autoComplete }
      value = { value }
      onChange = { onChange }
    />
  </div>
);

const SubField = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div style = {{ fontSize: '0', paddingTop: '15px' }}>
    <label htmlFor = { id } className = { classes.FormRowLabelSub }>
      { label }
    </label>
    <input
      className = { classes.FormRowInput }
      id = { id }
      type = { type }
      placeholder = { placeholder }
      required = { required }
      autoComplete = { autoComplete }
      value = { value }
      onChange = { onChange }
    />
  </div>
);

const CountryDrop = ({
  label,
  id,
  value,
  onChange,
}) => (
  <div style = {{ fontSize: '0', paddingTop: '15px' }}>
    <label htmlFor = { id } className = { classes.FormRowLabelSub }>
      { label }
    </label>
    <br></br>
    <CountryDropdown
      style = {{ marginTop: '5px', backgroundColor: '#d7d3cb', height: '40px', width: '100%', fontFamily: 'Titillium Web', fontSize: '16px', color: '#383737', paddingLeft: '5px' }}
      value = { value }
      onChange = { onChange }
    />
  </div>
);

const RegionDrop = ({
  label,
  id,
  value,
  country,
  onChange,
}) => (
  <div style = {{ fontSize: '0', paddingTop: '15px' }}>
    <label htmlFor = { id } className = { classes.FormRowLabelSub }>
      { label }
    </label>
    <br></br>
    <RegionDropdown
      style = {{ marginTop: '5px', backgroundColor: '#d7d3cb', height: '40px', width: '100%', fontFamily: 'Titillium Web', fontSize: '16px', color: '#383737', paddingLeft: '5px' }}
      value = { value }
      country = { country }
      onChange = { onChange }
    />
  </div>
);

const Label = ({
  label,
  id,
  type
}) => (
  <div style = {{ fontSize: '0', width: '90%' }}>
    <label htmlFor = { id } className = { classes.FormRowLabel }>
      { label }
    </label>
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => {
  return (
    <button
      className = { classes.SubmitButton }
      type = 'submit'
      disabled = { processing || disabled }
    >
      { processing ? 'Processing...' : children }
    </button>
  );
};

const ErrorMessage = ({ children }) => (
  <div className = { classes.ErrorMessage } role = 'alert'>
    <svg width = '16' height = '16' viewBox = '0 0 17 17'>
      <path
        fill = '#fff'
        d = 'M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill = '#6772e5'
        d = 'M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    { children }
  </div>
);

const DEFAULT_STATE = {
  error: null,
  cardComplete: false,
  processing: false,
  paymentMethod: null,
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  region: '',
  zipCode: '',
  country: '',
  openEmailForm: true,
  openShippingForm: false,
  openPaymentForm: false,
  paid: false
};

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    const { email, country, firstName, lastName, addressLine1, addressLine2, city, region, zipCode, error, cardComplete, openEmailForm, openShippingForm, openPaymentForm, paid } = this.state;

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      this.setState({processing: true});
    }

    console.log(`totalPrice: ${this.props.totalPrice}`);

    // Get token from server
    let result;
    axios.get('http://localhost:5000/secret', {
      params: {
        cart: this.props.cart,
        expectedPrice: this.props.totalPrice
      }
    })
    .then(async res => {
      result = await stripe.confirmCardPayment(res.data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email
          }
        }
      });

      this.setState({ paid: true });
      // payment was successful, clearing cart
      this.props.onClearCart();
      this.setState({ processing: false });
      console.log(`RESULT: ${JSON.stringify(result)}`);
    
      this.props.history.push({
        pathname: '/cart',
        state: { payment: true }
      });  
    })
    .catch(error => {
      this.setState({ error });
    })
  };

  selectCountry = country => {
    this.setState({ country });
  };

  selectRegion = region => {
    this.setState({ region });
  };

  reset = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    const { error, processing, paymentMethod, country, email, firstName, lastName, city, region, zipCode, addressLine1, addressLine2, openEmailForm, openShippingForm, openPaymentForm, paid } = this.state;
    const { stripe } = this.props;

    return (
      <form className = { classes.Form } onSubmit = { this.handleSubmit }>
        <fieldset className = { classes.FormGroup }>
          <ListItem button style = {{ padding: '0' }} onClick = { () => this.setState({ openEmailForm: !openEmailForm }) }>
            <Label
              label = 'Contact Information'
            />
            { openEmailForm ? <ExpandLess/> : <ExpandMore /> }
          </ListItem>
          <Collapse in = { openEmailForm } timeout = 'auto' unmountOnExit>
            <List component = 'div' disablePadding>
              <Field
                label = 'Your Email'
                id = 'email'
                type = 'email'
                placeholder = 'Email Address'
                required
                autoComplete = 'email'
                value = { email }
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
              />
              <p>You will recieve receipts only at this email.</p>
            </List>
          </Collapse>
        </fieldset>
        <fieldset className = { classes.FormGroup }>
          <ListItem button style = {{ padding: '0' }} onClick = { () => this.setState({ openShippingForm: !openShippingForm }) }>
            <Label
              label = 'Shipping Information'
            />
            { openShippingForm ? <ExpandLess/> : <ExpandMore /> }
          </ListItem>
          <Collapse in = { openShippingForm } timeout = 'auto' unmountOnExit>
            <List component = 'div' disablePadding>
              <SubField
                label = 'First Name'
                id = 'firstName'
                type = 'text'
                placeholder = 'First Name'
                required
                autoComplete = 'firstName'
                value = { firstName }
                onChange={(event) => {
                  this.setState({ firstName: event.target.value });
                }}
              />
              <SubField
                label = 'Last Name'
                id = 'lastName'
                type = 'text'
                placeholder = 'Last Name'
                required
                autoComplete = 'lastName'
                value = { lastName }
                onChange={(event) => {
                  this.setState({ lastName: event.target.value });
                }}
              />
              <SubField
                label = 'Address Line 1'
                id = 'addressLine1'
                type = 'text'
                placeholder = 'Street Address, P.O. box, company name, c/o'
                required
                autoComplete = 'addressLine1'
                value = { addressLine1 }
                onChange={(event) => {
                  this.setState({ addressLine1: event.target.value });
                }}
              />
              <SubField
                label = 'Address Line 2'
                id = 'addressLine2'
                type = 'text'
                placeholder = 'Apartment, suite, unit, building, floor, etc.'
                autoComplete = 'addressLine2'
                value = { addressLine2 }
                onChange={(event) => {
                  this.setState({ addressLine2: event.target.value });
                }}
              />
              <CountryDrop
                required
                label = { 'Country' }
                value = { country }
                onChange = { val => this.selectCountry(val) }
              />
              <SubField
                label = 'City'
                id = 'city'
                type = 'text'
                placeholder = 'City'
                required
                autoComplete = 'city'
                value = { city }
                onChange={(event) => {
                  this.setState({ city: event.target.value });
                }}
              />
              <RegionDrop
                label = 'State / Region'
                id = 'state'
                country = { country }
                value = { region }
                onChange = { val => this.selectRegion(val) }
              />
              <SubField
                label = 'Zip Code'
                id = 'zipCode'
                type = 'text'
                placeholder = 'Zip Code'
                required
                autoComplete = 'zipCode'
                value = { zipCode }
                onChange={(event) => {
                  this.setState({ zipCode: event.target.value });
                }}
              />
            </List>
          </Collapse>
        </fieldset>
        <fieldset className = { classes.FormGroup }>
          <ListItem button style = {{ padding: '0' }} onClick = { () => this.setState({ openPaymentForm: !openPaymentForm }) }>
            <Label
              label = 'Payment Information'
            />
            { openPaymentForm ? <ExpandLess/> : <ExpandMore /> }
          </ListItem>
          <Collapse in = { openPaymentForm } timeout = 'auto' unmountOnExit>
            <List component = 'div'>
              <CardField
                onChange = {(event) => {
                  this.setState({
                    error: event.error,
                    cardComplete: event.complete,
                  });
                }}
              />
            </List>
          </Collapse>
        </fieldset>
        { error && <ErrorMessage>{ error.message }</ErrorMessage> }
        <SubmitButton processing = { processing } error = { error } disabled = { !stripe }>
          Submit Payment
        </SubmitButton>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearCart: () => {
      return dispatch({
        type: actionTypes.CLEAR_CART
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutForm));
