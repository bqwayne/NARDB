var router = require('express').Router();
var Partner = require('../model/partner');

router.post('/add', function(req,res,next){
    var partner = new Partner();
    partner.name = req.body.name;
    partner.website = req.body.website;
  
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