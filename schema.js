const mongoose = require('mongoose');

// Define common schema
const tripSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    VendorID: Number,
    lpep_pickup_datetime: Date,
    lpep_dropoff_datetime: Date,
    store_and_fwd_flag: String,
    RatecodeID: Number,
    PULocationID: Number,
    DOLocationID: Number,
    passenger_count: Number,
    trip_distance: Number,
    fare_amount: Number,
    extra: Number,
    mta_tax: Number,
    tip_amount: Number,
    tolls_amount: Number,
    ehail_fee: Number,
    improvement_surcharge: Number,
    total_amount: Number,
    payment_type: Number,
    trip_type: Number,
    congestion_surcharge: Number
});

module.exports = mongoose.model('Trip', tripSchema); // Export model named 'Trip'
