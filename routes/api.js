var express = require('express');
var router = express.Router();

router.use('/partner', require('./partner'));
router.use('/pipeline', require('./pipeline'));
router.use('/competency', require('./competency'));
router.use('/booking', require('./booking'));
router.use('/qtr', require('./qtr-api'));
router.use('/update_values', require('./update_values'));
router.get('/', function(req, res, next) {
  res.send('API entry point. For more info use one of the following endpoints: Partner: /api/partner Booking: /api/booking Pipeline: /api/pipeline or Competency: /api/competency');
})

/*
router.post('/add', function(req,res,next){
  var partner = new Partner();
  partner.name = req.body.name;
  partner.website = req.body.website;
  
  partner.save(function(err) {
    if (err)
      res.send(err);
    res.json({message: 'Partner added!!', name: req.body.name, website: req.body.website});
  });
  
});

router.get('/partners', function(req, res, next) {
  Partner.find({}, 'partner_id name website', function(err, partners) {
    if (err)
      res.send(err);

    res.json(partners);
  });
});

router.get('/partner/:id', function(req, res, next) {
  Partner.find({partner_id: req.params.id}, function(err, partner) {
    if (err)
      res.send(err);
    res.json(partner);
  });
});

router.put('/partner/:id', function(req, res, next) {
  Partner.find({partner_id: req.params.id},  function(err, partner) {
    if (err)
      res.send(err);

  
    if (typeof req.body.partner_id !== "undefined") {  
      partner.partner_id = req.body.partner_id;
    }
      
    if (typeof req.body.name !== "undefined"){
      
      partner.name = req.body.name;
    }
      
    
    if (typeof req.body.website !== "undefined"){
      partner.website = req.body.website;
    }
    partner.save(function(err) {
      if(err)
        res.send(err);
      
        res.json({message: 'Partner Saved.', name: partner.name, website: partner.website, partner_id: partner.partner_id});
    });
  });
})

router.get('/', function(req, res, next) {
  //res.json({message: 'NAR API.'});
  res.render('api',{title: 'API'})
});
*/


module.exports = router;