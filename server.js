'use strict';

// Module dependencies.
var express = require('express'),  
	path = require('path'),
	fs = require('fs'),
	http = require('http');

var app = express();

// Connect to database

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Express Configuration
require('./lib/config/express')(app);

// Controllers
var api = require('./lib/controllers/api'),
	index = require('./lib/controllers');

// Server Routes
app.get('/api/getPokemonInfo/:id', api.getPokemonInfo);


// Angular Routes
app.get('/partials/*', index.partials);
app.get('/*', index.index);




// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;