'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    async = require('async'),
    http = require('http');

// exports.getPokemonInfo = function(req, res, next) {
// 	console.log("Hitting getPokemonInfo");
// 	var client = res;
// 	//console.log("http://pokeapi.co/api/v1/pokemon/" + req.params.id);
// 	http.get("http://pokeapi.co/api/v1/pokemon/" + req.params.id + "/", function(res) {
// 		res.setEncoding('utf8');
// 		//console.log(res);
// 		res.on('data', function(chunk){
// 			//console.log(chunk);
// 			client.write(chunk);
// 		});
// 		res.on('end', function() {
// 			console.log("Response Done");
// 			client.end();
// 		});
// 	}).on('error', function(e) {
// 	  console.log("Got error: " + e.message);
// 	});
// };

exports.pokeApi = function(req, res, next) {
	var client, pokeApi, pokeId, url;
	client = res;
	pokeApi = req.params.pokeApi;
	pokeId = req.params.id;
	url = "http://pokeapi.co/api/v1/" + pokeApi + "/" + pokeId + "/"
	console.log("Hitting url: " + url);

	http.get(url, function(res) {
		res.setEncoding('utf8');
		//console.log(res);
		res.on('data', function(chunk){
			//console.log(chunk);
			client.write(chunk);
		});
		res.on('end', function() {
			console.log("Response Done");
			client.end();
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}