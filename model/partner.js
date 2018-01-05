var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({
    partner_id: String,
    name:       String,
    website:    String,
    assigned_territory: [{
        name: String
    }] 
});

module.exports = mongoose.model('Partner', PartnerSchema);