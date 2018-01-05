var router = require('express').Router();

router.get('/', require('./pipeline-api'));
router.post('/add', require('./pipeline-api'));
router.post('/drop', require('./pipeline-api'));
router.get('/:id', require('./pipeline-by-id-api'));
router.use('/find', require('./find'));


module.exports = router;