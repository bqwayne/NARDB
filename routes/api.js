var express = require('express');
var router = express.Router();

router.use('/partner', require('./partner'));
router.use('/pipeline', require('./pipeline'));
router.use('/competency', require('./competency'));
router.use('/booking', require('./booking'));
router.use('/qtr', require('./qtr-api'));
router.use('/update_values', require('./update_values'));
router.get('/', function(req, res, next) {
  //res.send('API entry point. For more info use one of the following endpoints: Partner: /api/partner Booking: /api/booking Pipeline: /api/pipeline or Competency: /api/competency');
  res.render('api',{ title: 'NAR DB API Entry Point'})
})

module.exports = router;