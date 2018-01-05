var router = require('express').Router();
var Booking = require('../../model/booking');

router.get('/:id', function(req, res, next) {
    Booking.findById(req.params.id, function(err, booking) {
      if (err) {
        res.send(err);
      }

      var booking_date = booking.booking_date;
      var description = booking.description;
      var num_of_transactions = booking.trx.lenth;
      
      res.json({booking_date: booking_date, description: description, num_of_transactions: num_of_transactions});
    });
  });
  
module.exports = router;
//5a4c088d0fff1443a048ec48

