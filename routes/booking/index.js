var router = require('express').Router();

router.get('/', require('./booking-api'));
router.post('/add', require('./booking-api'));
router.get('/:id', require('./booking-by-id-api'));

module.exports = router;