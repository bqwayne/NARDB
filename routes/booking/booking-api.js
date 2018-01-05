var router = require('express').Router();
var Booking = require('../../model/booking');
var multer = require('multer');
var csv2json = require('csvtojson');

var storage = multer.memoryStorage()
var upload = multer({storage : storage}).single('booking_details');

router.get('/', (req, res, next) => {
    Booking.find({}, (err, booking) => {
      if (err)
        res.json({status: 300, results: err});
  
      res.json({status: 200, results: booking});
    });
});

router.post('/add', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }

        var booking = new Booking();
    
        booking.booking_date = req.body.booking_date;
        booking.description = req.body.booking_description;
        booking.booking_period = req.body.booking_period;
        booking.Active = req.body.active;
        var trx_processed = 0;

        var booking_detail_array = [];
        csv2json({ noheader: false, flatKeys: true})
        .fromString(req.file.buffer.toString())
        .on('json', (jsonObj, rowIndex) => {
            booking_detail_array.push(jsonObj);
            trx_processed += 1;
        })
        .on('done', (error) => {
            if (error) {
                console.log(error);
            }
            booking.trx = booking_detail_array;
            booking.num_trx = trx_processed;
        });

        booking.save((err) => {
            if (err) {
                res.json({status: 300, results: err});
            }
                
            res.json({status: 200, results: 'Bookings added!!', 'booking date': req.body.booking_date, description: req.body.booking_description, trx_processed: trx_processed});
        });
        
    });
});

router.get('/:id', function(req, res, next) {
    Booking.findById(req.params.id, function(err, booking) {
      if (err) {
        res.json({status: 300, results: err});
      }

      var booking_date = booking.booking_date;
      var description = booking.description;
      var num_of_transactions = booking.trx.length;
      var is_active = booking.Active;
      
      res.json({status: 200, results: {booking_date: booking_date, description: description, num_of_transactions: num_of_transactions, is_active: is_active}});
    });
});

module.exports = router;