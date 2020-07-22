const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;
const { google } = require('googleapis');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51H7DOTJdeKSXNoJu4QP2yL0BXaNqU9X8T9Ch9YlIiI4Tdsp6wUN9IDMkYvN6RAxZQJknnlemQZSogYYRqvfFI6p700mD1E9qXm');
const printPrices = require('./images/prices.json');

require('dotenv').config()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/secret', async (req, res) => {
  const cart = req.query.cart;
  const expectedPrice = parseFloat(req.query.expectedPrice).toFixed(2);

  let subTotal = 0;

  cart.forEach(item => {
    const itemObject = JSON.parse(item);
    subTotal += printPrices[itemObject.product].price;
  });

  let tax = (subTotal * .07).toFixed(2);
  let totalPrice = ((parseFloat(subTotal) + parseFloat(tax))).toFixed(2);
  const totalPriceFinal = (totalPrice * 100).toFixed(0);

  if (totalPrice === expectedPrice) {
    console.log('CHANGE ME TO HAPPEN BEFORE THE USER SUBMITS THE PAYMENT!');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPriceFinal,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' }
  })

  res.json({ client_secret: paymentIntent.client_secret });
});

app.listen(port, () => console.log(`Listening on port ${port}`));