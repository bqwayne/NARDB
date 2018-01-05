var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QtrSchema = new Schema({
    Qtr: String,
    FY: String,
    Active: Boolean
});

module.exports = mongoose.model('Qtr', QtrSchema);