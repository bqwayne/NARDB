var router = require('express').Router();
var Partner = require('../../model/partner');


router.get('/', function(req, res, next) {
  Partner.find({}, 'partner_id name website', function(err, partners) {
    if (err)
      res.send(err);

    res.json(partners);
  });
});

router.post('/add', function(req,res,next){
  var partner = new Partner();
  partner.partner_id = req.body.partner_id;
  partner.name = req.body.name;
  partner.website = req.body.website;
  partner.assigned_territory = req.body.assigned_territory;

  /*
  console.log(req.body.name);
  console.log(req.body.website);
  res.json({message: 'message received!'});
  */

  
partner.save(function(err) {
  if (err)
    res.send(err);
  res.json({message: 'Partner added!!', name: req.body.name, website: req.body.website});
});

});

module.exports = router;