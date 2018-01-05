var router = require('express').Router();
var Pipeline = require('../model/pipeline');
var Qtr = require('../model/qtr');

router.put('/', (req, res, next) => {
    /* 
    QTR:  
        1.) Get all distinct quarters from Pipeline Details.
        2.) Upsert the Qtr model with distinct quarters from Pipeline Details.
        3.) Deactivate quarters in the DB that are not in the latest pipeline.
    */
    var qtrNames = [];
    var updatedQtr = [];
    // 1.) Get all distinct quarters from Pipeline Details.
    Pipeline.distinct('pipeline_details.Qtr', (err, names) => {
        if (err) res.json({status: 300, message: err});
        qtrNames = names;
        // 2.) Upsert the Qtr model with distinct quarters from Pipeline Details.
        qtrNames.forEach((el) => {
            Qtr.findOneAndUpdate({Qtr: el}, { $set: {Qtr: el, FY: el.substr(0,4), Active: true}} , {upsert: true, returnNewDocument: true}, (err, upQtr) => {
                if(err) res.json({status: 300, message: err});
            });
        });
        // 3.) Deactivate quarters in the DB that are not in the latest pipeline.
        Qtr.distinct('Qtr', { Active: true }, (err, qtrExistingNames) => {
            let qtrNamesNotActive = qtrExistingNames.filter((item) => {
                return !qtrNames.includes(item);
            });
            qtrNamesNotActive.forEach((el) => {
                Qtr.findOneAndUpdate({Qtr: el}, { $set: {Active: false} }, {returnNewDocument: true}, (err,upQtr) => console.log(upQtr));
            });
        });
        Qtr.find({Active: true}, (err, ret) => {
            updatedQtr = ret;
            res.json({status: 200, results: updatedQtr});
        });
    });
})

module.exports = router;