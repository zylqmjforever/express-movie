var express = require('express'),
	router = express.Router(),
	Ctrl = require('../controller/user');

/* GET users listing. */
router.get('/', Ctrl.index);

router.post('/signup', Ctrl.signup);

router.post('/signin', Ctrl.signin);

router.get('/list', Ctrl.list);

router.get('/logout', Ctrl.logout);

router.get('/signin', Ctrl.showSignin);

router.get('/signup', Ctrl.showSignup);

module.exports = router;