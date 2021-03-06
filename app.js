var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var subscribers = require('./routes/subscribers');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 9001);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.use('/', routes);
app.use('/', users);
app.use('/', subscribers);


//matching for sitemap.xml file
app.use('/sitemap', function(req, res) {
    res.sendfile(__dirname + '/app/sitemap.xml');
});
//matching for sitemap.xml file
app.use('/rss', function(req, res) {
    res.sendfile(__dirname + '/app/rss.xml');
});
//matching for google verification file
app.use('/googlef7034084d45fac75.html', function(req, res) {
    res.sendfile(__dirname + '/googlef7034084d45fac75.html');
});
//only need in html5mode = true 
//to redirect pages through index.html
//http://stackoverflow.com/questions/16569841/angularjs-html5-mode-reloading-the-page-gives-wrong-get-request/16570533#16570533
app.use(function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

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
