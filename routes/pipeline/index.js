var router = require('express').Router();


router.use('/', require('./pipeline-api'));
router.use('/find', require('./pipeline-find-api'));


module.exports = router;