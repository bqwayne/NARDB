var router = require('express').Router();
var Pipeline = require('../../model/pipeline');
var multer = require('multer');
var fs = require('fs');
var csv2json = require('csvtojson');

var storage = multer.memoryStorage();
var upload = multer({storage : storage}).single('pipeline_details');

router.get('/', (req, res, next) => {
    Pipeline.find({}, (err, pipeline) => {
      if (err)
        res.send(err);
  
      res.json(pipeline);
    });
});

router.post('/add', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }

        var pipeline = new Pipeline();

        pipeline.pipeline_report_name = req.body.pipeline_report_name;
        pipeline.pipeline_report_date = req.body.pipeline_report_date;

        var num_pipeline_processed = 0;

        var pipeline_details_array = [];
        csv2json({ noheader: false, flatKeys: true})
        .fromString(req.file.buffer.toString())
        .on('json', (jsonObj, rowIndex) => {
            //fs.appendFile('./pipeline-csv2json.out',JSON.stringify(jsonObj));
            pipeline_details_array.push(jsonObj);
            num_pipeline_processed += 1;
        })
        .on('done', (error) => {
            if (error) {
                console.log(error);
            }
            fs.writeFileSync('./pipeline-csv2json.out',JSON.stringify(pipeline_details_array));
            pipeline.pipeline_details = pipeline_details_array;
            pipeline.num_pipeline_details = num_pipeline_processed;
                //res.send(`Report Name: ${pipeline.pipeline_report_name}, Report Date: ${pipeline.pipeline_report_date}, Num of Pipeline Details Processed: ${pipeline.num_pipeline_details}`)      
        });

        pipeline.save((err) => {
            if (err) {
                res.json({status: 500, message: err});
            }
            res.json({status: 200, message: 'Pipeline added!!', 'report name': req.body.pipeline_report_name, 'report date': req.body.pipeline_report_date, pipeline_details_processed: num_pipeline_processed});
        });
    });
});

router.post('/drop', (req, res, next) => {
    Pipeline.remove({}, (err) => res.send('Pipeline has been removed'));
});

module.exports = router;
