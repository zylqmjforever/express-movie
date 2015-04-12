var express = require('express');
var router = express.Router();

router.get('/movie', function(req, res, next) {
	res.render('admin', {
		title: 'imooc 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	});
});

router.get('/list', function(req, res, next) {
	var movies = [];
	for(var i = 0; i < 10; i++) {
		movies.push({
			_id: i + 1,
			title: '机械战警',
			doctor: '何塞。帕迪里亚',
			country: '美国',
			year: 2014,
			poster: 'http://img.mukewang.com/5513e23300011eab06000338-300-170.jpg',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '发动机是克拉夫速度较快拉升幅度阿道夫艰苦拉萨大家分厘卡圣诞节分厘卡是啊打发时间啦空手道解放多少克拉夫'
		});
	}
	res.render('list', {
		title: 'imooc 列表页',
		movies: movies
	});
});

module.exports = router;