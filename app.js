var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var mongoStore = require('connect-mongo')(session);


var routes = require('./app/routes/index');
var admins = require('./app/routes/admins');
var users = require('./app/routes/users');

var app = express();

var dbUrl = 'mongodb://10.0.0.113/imooc';


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

mongoose.connect(dbUrl);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev')); // ':method :url :status'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'imooc',
  // session 持久化
  store: new mongoStore({
    url: dbUrl,
    collections: 'sessions'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = moment;

app.use(function(req, res, next) {
  if (req.session.user) {
    app.locals.user || (app.locals.user = req.session.user);
  } else {
    app.locals.user && delete app.locals.user
  }
  next();
});

app.use('/', routes);
app.use('/user', users);
app.use('/admin', admins);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.set('showStackError', true);
  app.locals.pretty = true;
  mongoose.set('debug', true);
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
