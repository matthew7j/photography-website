const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;
const { google } = require('googleapis');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51H7DOTJdeKSXNoJu4QP2yL0BXaNqU9X8T9Ch9YlIiI4Tdsp6wUN9IDMkYvN6RAxZQJknnlemQZSogYYRqvfFI6p700mD1E9qXm');

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

app.get('/getConnectionToken', async (req, res) => {
  let connectionToken = await stripe.terminal.connectionTokens.create();
  res.json({ connectionToken });
});

app.listen(port, () => console.log(`Listening on port ${port}`));