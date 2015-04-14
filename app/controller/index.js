var Movie = require('../models/movie');

exports.index = function(req, res) {
	/*var movies = [];
	for(var i = 0; i < 10; i++) {
		movies.push({
			title: '机械战警',
			_id: i + 1,
			poster: 'http://img.mukewang.com/5513e23300011eab06000338-300-170.jpg'
			});
		}*/
	
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}

		res.render('index', {
			title: '首页',
			movies: movies
		});
	});
};
exports.get = function(req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc 详情页',
			movie: movie
		});
	});
};

exports.madd = function(req, res) {
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
};