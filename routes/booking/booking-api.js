var router = require('express').Router();
var Booking = require('../../model/booking');
var multer = require('multer');
var fs = require('fs');
var csv2json = require('csvtojson');

var storage = multer.memoryStorage()
var upload = multer({storage : storage}).single('booking_details');

router.get('/', (req, res, next) => {
    Booking.find({}, (err, booking) => {
      if (err)
        res.send(err);
  
      res.json(booking);
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
            fs.writeFile('./booking-csv2json.out',JSON.stringify(booking_detail_array));
            booking.trx = booking_detail_array;
            booking.num_trx = trx_processed;
        });

        booking.save((err) => {
            if (err) {
                res.send(err);
            }
                
            res.json({message: 'Bookings added!!', 'booking date': req.body.booking_date, description: req.body.booking_description, trx_processed: trx_processed});
        });
        
    });
});
 

module.exports = router;