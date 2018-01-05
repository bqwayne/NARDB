var router = require('express').Router();

router.get('/', require('./partners-api'));
router.post('/add', require('./partners-api'));
router.get('/:id', require('./partner-by-id-api'));
router.put('/:id', require('./partner-by-id-api'));

module.exports = router;