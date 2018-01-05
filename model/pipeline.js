var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PipelineSchema = new Schema({
    pipeline_report_name: String,
    pipeline_report_date: Date,
    num_pipeline_details: Number,
    pipeline_details: [{
        DealID: String,
        'Opportunity Name': String,
        AccountName: String,
        'Partner Name': String,
        'Partner Tier Name': String,
        'Sales Method': String,
        Qtr: String,
        CloseFiscalYear: String,
        CloseDate: Date,
        ForecastCategoryName: String,
        SalesStage: String,
        StageName: String,
        OwnerName: String,
        'Opportunity ID': String,
        CreatedDate: Date,
        LastModifiedDate: Date,
        ReasonWonLost: String,
        PrimaryCompetitor: String,
        ERDOStatus: String,
        'Super Family': String,
        ProductFamily: String,
        ProductName: String,
        'Product Type': String,
        'Item Number': String,
        Currency: String,
        Product_Amount: Number,
        CleansedGEO: String,
        Geography: String,
        Region: String,
        District: String,
        Country: String,
        TerritoryName: String,
        Channel: String,
        CloseFiscalWeek: String,
        CloseFiscalMonth: String,
        'Status Name': String,
        Segment: String,
        Age: Number,
        NextStepToWin: String
    }],
    Active: Boolean
});

module.exports = mongoose.model('Pipeline', PipelineSchema);