var express = require('express');
var router = express.Router();
var Qtr = require('../model/qtr');

router.get('/', (req, res, next) => {
    Qtr.find((err, qtrs) => {
        res.json({status: 200, results: qtrs});
    })
});

router.get('/active', (req, res, next) => {
    Qtr.find({Active: true}, (err, qtrs) => {
        res.json({status: 200, results: qtrs});
    });
});

router.get('/fy/:year', (req, res, next) => {
    Qtr.find({ FY: req.params.year}, (err, qtrs) => {
        if (err) res.json({status: 300, results: err});
        if (qtrs.length === 0)  {
            res.json({status: 201, results: `Your search for ${req.params.year} did not return any results`});
        } else {
            res.json({status: 200, results: qtrs});
        }
    });
});

module.exports = router;