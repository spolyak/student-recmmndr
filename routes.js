// Load the route handlers
var routes = require('./handlers');

module.exports = function(app) {

  //routes
  app.get('/', routes.index);
};