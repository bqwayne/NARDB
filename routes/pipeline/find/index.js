var router = require('express').Router();

router.get('/', require('./pipeline-find-api'));
router.get('/pipeline_detail', require('./pipeline-find-api'));
router.get('/pipeline_detail/:field/:search', require('./pipeline-find-api'));


module.exports = router;