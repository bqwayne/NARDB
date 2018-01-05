var router = require('express').Router();
var Partner = require('../../model/partner');


router.get('/', function(req, res, next) {
  Partner.find({}, 'partner_id name website assigned_territory', function(err, partners) {
    if (err)
      res.send(err);

    res.json({status: 200, results: partners});
  });
});

router.post('/add', function(req,res,next){
  var partner = new Partner();
  partner.partner_id = req.body.partner_id;
  partner.name = req.body.name;
  partner.website = req.body.website;
  partner.assigned_territory = req.body.assigned_territory;
  
  partner.save(function(err) {
    if (err)
      res.json({status: 300, results: err});
    res.json({status: 200, results: {message: 'Partner added!!', name: req.body.name, website: req.body.website}});
  });
});

router.get('/:id', (req, res, next) => {
  Partner.find({partner_id: req.params.id}, (err, partner) => {
    if (err)
      res.json({status: 300, results: err});
    res.json({status: 200, results: partner});
  });
});

router.put('/:id', (req, res, next) => {
  Partner.findOne({partner_id: req.params.id},  (err, partner) => {
    if (err){
      res.json({status: 300, results: err});
    }

    if (typeof req.body.partner_id !== "undefined") {  
      partner.partner_id = req.body.partner_id;
    }
        
    if (typeof req.body.name !== "undefined"){    
      partner.name = req.body.name;
    }
        
    if (typeof req.body.website !== "undefined"){
      partner.website = req.body.website;
    }

    
    if (typeof req.body.assigned_territory !== "undefined") {
      //let assigned_territory = new Map (req.body.assigned_territory);
      console.log(`Type of: ${typeof req.body.assigned_territory} for ${JSON.stringify(req.body.assigned_territory)} with a length of ${req.body.assigned_territory.length}`);
      req.body.assigned_territory.forEach(element => {
        partner.assigned_territory.push(element);
      });
        
    }
      

    //console.log(JSON.stringify(partner));

      
    partner.save((err) => {
      if(err){
        res.json({status: 300, results: err});
      }
      res.json({status: 200, results: {message: 'Partner Saved.', name: partner.name, website: partner.website, partner_id: partner.partner_id}});
    });
      
  });
});

module.exports = router;