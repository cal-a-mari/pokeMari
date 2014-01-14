'use strict';
var http = require('http');

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
};