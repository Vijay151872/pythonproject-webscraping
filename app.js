const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const schema = require('./schema');

app.use(bodyParser.json());

// Ensure MongoDB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// 1. Get rows from a given collection with a limit
app.get('/api/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find().limit(limit);
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 2. Get rows from a given collection by column name and value
app.get('/api/:collectionName/column', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { name, value } = req.query;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ [name]: value });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. Get rows from a given collection by a specific vendor
app.get('/api/:collectionName/vendor/:vendorId', async (req, res) => {
  try {
    const { collectionName, vendorId } = req.params;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ VendorID: vendorId });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 4. Get rows from a given collection within a specific date range
app.get('/api/:collectionName/date-range', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { startDate, endDate } = req.query;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({
      lpep_pickup_datetime: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 5. Get rows from a given collection by pickup location
app.get('/api/:collectionName/pickup/:pickupLocationId', async (req, res) => {
  try {
    const { collectionName, pickupLocationId } = req.params;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ PULocationID: pickupLocationId });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 6. Get rows from a given collection by dropoff location
app.get('/api/:collectionName/dropoff/:dropoffLocationId', async (req, res) => {
  try {
    const { collectionName, dropoffLocationId } = req.params;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ DOLocationID: dropoffLocationId });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 7. Get rows from a given collection by passenger count
app.get('/api/:collectionName/passenger-count/:passengerCount', async (req, res) => {
  try {
    const { collectionName, passengerCount } = req.params;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ passenger_count: passengerCount });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 8. Get rows from a given collection by fare amount range
app.get('/api/:collectionName/fare-range', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { minFare, maxFare } = req.query;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({
      fare_amount: { $gte: parseFloat(minFare), $lte: parseFloat(maxFare) }
    });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 9. Get rows from a given collection by trip distance range
app.get('/api/:collectionName/distance-range', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const { minDistance, maxDistance } = req.query;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({
      trip_distance: { $gte: parseFloat(minDistance), $lte: parseFloat(maxDistance) }
    });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 10. Get rows from a given collection by payment type
app.get('/api/:collectionName/payment-type/:paymentType', async (req, res) => {
  try {
    const { collectionName, paymentType } = req.params;
    const Model = mongoose.model(collectionName, schema, collectionName);
    const documents = await Model.find({ payment_type: paymentType });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
