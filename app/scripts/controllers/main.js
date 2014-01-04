'use strict';

angular.module('myPokedexApp')
	.controller('MainCtrl', function ($scope, $routeParams, $http) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		console.log("yi");

		var pokemonUrl = 'http://pokeapi.co/api/v1/pokemon/' + $routeParams.pokemonId;
		//console.log($routeParams.pokemonId);
		$http.get(pokemonUrl)
		    .success(function (data, status, headers, config) {
		        console.log(data);
		        $scope.pokemonData = data;
		    })
		    .error(function (data, status, headers, config) {
		        console.log("Failed");
		});


	});
