var express = require('express'),
	router = express.Router(),
	Ctrl = require('../controller/admin');

router.get('/movie', Ctrl.add);

router.get('/update/:id', Ctrl.update);

router.post('/movie/new', Ctrl.new);

router.get('/list', Ctrl.list);

router.delete('/list', Ctrl.del);

module.exports = router;