var express = require('express'),
	router = express.Router(),
	Ctrl = require('../controller/index');

/* GET home page. */
router.get('/', Ctrl.index);
router.get('/movie/:id', Ctrl.get);
router.get('/madd', Ctrl.madd);

module.exports = router;