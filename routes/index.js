var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
	/*var movies = [];
	for(var i = 0; i < 10; i++) {
		movies.push({
			title: '机械战警',
			_id: i + 1,
			poster: 'http://img.mukewang.com/5513e23300011eab06000338-300-170.jpg'
			});
		}*/
	Movie.fetch(function(err, movies) {
		console.log('------------');
		if (err) {
			console.log(err);
		}

		res.render('index', {
			title: '首页',
			movies: movies
		});
	});
});

router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc 详情页',
			movie: movie
		});
	});
});
router.get('/madd', function(req, res, next) {
	for (var i = 0; i < 10; i++) {
		var movie = new Movie({
			id: i + 1,
			title: '机械战警',
			doctor: '何塞。帕迪里亚',
			country: '美国',
			year: 2014,
			poster: 'http://img.mukewang.com/5513e23300011eab06000338-300-170.jpg',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '发动机是克拉夫速度较快拉升幅度阿道夫艰苦拉萨大家分厘卡圣诞节分厘卡是啊打发时间啦空手道解放多少克拉夫'
		});
		movie.save();
	}
	res.send('hello world!');
	/*var movie = {
		title: '机械战警',
		doctor: '何塞。帕迪里亚',
		country: '美国',
		year: 2014,
		poster: 'http://img.mukewang.com/5513e23300011eab06000338-300-170.jpg',
		language: '英语',
		flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
		summary: '发动机是克拉夫速度较快拉升幅度阿道夫艰苦拉萨大家分厘卡圣诞节分厘卡是啊打发时间啦空手道解放多少克拉夫'
	};
	res.render('detail', {
		title: 'imooc 详情页',
		movie: movie
	});*/
});

module.exports = router;
