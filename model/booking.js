var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    booking_date: Date,
    description: String,
    booking_period: String,
    num_trx: Number,
    trx: [{
        'Trx Number': String,
        'Processed Date': String,
        'Period Name': String,
        'Quarter': String,
        'Assigned Territory': String,
        'District': String,
        'Area': String,
        'Region': String,
        'Geography': String,
        'Organization': String,
        'Segment': String,
        'Type': String,
        'Product Family': String,
        'Super Family': String,
        'Maint Yr': String,
        'Comp Eligible': String,
        'Reseller Name': String,
        'Reseller Rollup': String,
        'Licensee State': String,
        'Distributor Name': String,
        'Distributor Rollup': String,
        'Bill To Name': String,
        'Licensee Customer Name': String,
        'Licensee Postal Code': String,
        'Licensee Country Name': String,
        'Territory': String,
        'Renewal Flag': String,
        'Veritas Agreement Number': String,
        'PO Number': String,
        'Plan Amount': Number,
        'Channel Type': String,
        'Channel Category': String
    }],
    Active: Boolean
});

module.exports = mongoose.model('Booking', BookingSchema);