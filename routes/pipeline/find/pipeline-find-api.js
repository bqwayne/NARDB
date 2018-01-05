var router = require('express').Router();
var Pipeline = require('../../../model/pipeline');

router.get('/', (req, res, next) => {
    res.send('You have entered the pipeline find api.');
})

router.get('/pipeline_detail', (req, res, next) => {
    res.send('You have entered the pipeline find pipeline_detail api.');
}) 
router.get('/pipeline_detail/:field/:search', (req, res, next) => {
    let search = req.params.search;
    switch (req.params.field) {
        case 'partner name':
            var partnerNames = [];
            Pipeline.distinct("pipeline_details.Partner Name",(err,names) => {
                if (err) res.send(err);
                names.forEach((item, index) => {
                    let re = new RegExp(search,"gi")
                    if (re.test(item))
                       partnerNames.push(item);
                });
                if (partnerNames.length === 0) {
                    res.json({status: 201, results: `Your search of ${search} did not result in any records.`});
                } else {
                    Pipeline.aggregate([
                        {
                            $project: {
                                pipeline_details: {
                                    $filter: { 
                                        input: "$pipeline_details",
                                        as: "pipeline_details",
                                        cond: { $in: ["$$pipeline_details.Partner Name", partnerNames]}
                                    }
                                }
                            }
                        }                
                    ], (err, pipeline) => {
                        if (err) res.json({status: 300, message: err});
                        res.json({status: 200, results: pipeline});
                    })
                }
            });
            break;
        case 'qtr':
            var qtrNames = [];
            Pipeline.distinct('pipeline_details.Qtr', (err, names) => {
                if (err) res.json({status: 300, message: err});
                console.log(names);
                names.forEach((item, index) => {
                    let re = new RegExp(search,"gi");
                    if (re.test(item))
                        qtrNames.push(item);
                });
                console.log(qtrNames.length);
                if (qtrNames.length === 0) {
                    res.json({status: 201, results: `Your search of ${search} did not result in any records.`});
                } else {
                    Pipeline.aggregate([
                        {
                            $project: {
                                pipeline_details: {
                                    $filter: { 
                                        input: "$pipeline_details",
                                        as: "pipeline_details",
                                        cond: { $in: ["$$pipeline_details.Qtr", qtrNames]}
                                    }
                                }
                            }
                        }                
                    ], (err, pipeline) => {
                        if (err) res.json({status: 300, message: err});
                        res.json({status: 200, results: pipeline});
                    })                   
                }
            })
            break;
        default:
            res.json({status: 200, result: 'You did not provide a valide search field.  Currently implemented search fields are partner name and qtr.'});
            break;
    }
});

module.exports = router;