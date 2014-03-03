// Load the route handlers
var routes = require('./handlers');
var recommend = require('./handlers/recommend');

module.exports = function(app) {

  //routes
  app.get('/', routes.index);
  app.get('/recommend', recommend.index);
};