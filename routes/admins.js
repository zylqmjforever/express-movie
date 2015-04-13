var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var _ = require('underscore');

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

router.get('/update/:id', function(req, res) {
	console.log(req.params);
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			});
		})
	}
});

router.post('/movie/new', function(req, res) {
	var id = req.body.movie.id,
		movieObj = req.body.movie,
		_movie;
	if (id !== undefined) {
		Movie.findById({id: id}, function(err, movie) {
			if (err) {
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie.id);
			});
		});
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});
		_movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			}
			res.redirect('/movie/' + movie.id);
		});
	}
});

router.get('/list', function(req, res, next) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		});
	});
});

module.exports = router;