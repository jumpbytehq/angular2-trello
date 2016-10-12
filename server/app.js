var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var DBService = require('./service/db-service');

var app = express();
var server = require('http').createServer(app);

var appRoot = path.normalize(__dirname+'/..');
var appPath = path.join(appRoot, 'client');

mongoose.connect('mongodb://localhost');

app.use(express.static(appPath));
app.use('/node_modules', express.static(path.normalize(appRoot+'/node_modules')));

app.set('appRoot', appRoot);
app.set('appPath', appPath);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

require('./routes')(app);

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
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

server.listen(3000, function () {
  console.log('server started');
  setTimeout(function() {
  	DBService.wipeDB();
  }, 3600000);
});


module.exports = app;
