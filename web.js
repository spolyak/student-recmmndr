// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.bodyParser());

// Set the view engine
app.set('view engine', 'jade');
// Where to find the view files
app.set('views', './views');
// CSS, JS, images
app.use(express.static('./public'));
// Explicitly add the router middleware
app.use(app.router);
// Add the errorHander middleware
app.use(express.errorHandler());
// add dev level logging
app.use(express.logger('dev'));

var routes = require('./routes')(app);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
