'use strict';

angular.module('myPokedexApp')
	.controller('MainCtrl', function ($scope, $routeParams, $http) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		var mainPokemonUrl = 'http://pokeapi.co/api/v1/pokemon/' + $routeParams.pokemonId;
		

		$http.get(mainPokemonUrl)
		    .success(function (data, status, headers, config) {
		        console.log(data);
		        $scope.pokemonData = data;
		        getPokemonDesc(data);
		        getPokemonSprite(data);
		    	getPokemonType(data);
		    })
		    .error(function (data, status, headers, config) {
		        console.log('Main Pokemon Data Fetch Failed');
		});


		var getPokemonDesc = function(data) {
			var pokemonDescUrl = 'http://pokeapi.co' + data.descriptions[0].resource_uri;
			$http.get(pokemonDescUrl)
			    .success(function (data, status, headers, config) {
			        console.log("GOT IT");
			        $scope.pokemonDesc = data;
			    })
			    .error(function (data, status, headers, config) {
			        console.log('Pokemon Desc Data Fetch Failed');
			});
		};

		var getPokemonSprite = function(data) {
			var pokemonSpriteUrl = 'http://pokeapi.co' + data.sprites[0].resource_uri;
			$http.get(pokemonSpriteUrl)
			    .success(function (data, status, headers, config) {
			        console.log("GOT IT");
			        $scope.pokemonSprite = data;
			    })
			    .error(function (data, status, headers, config) {
			        console.log('Pokemon Desc Data Fetch Failed');
			});
		};
		
		var getPokemonType = function(data) {
			var pokemonType = "";
			var pokemonTypeList = data.types;
			
			for(var i = 0, len = pokemonTypeList.length; i < len; i++) {
				pokemonType += pokemonTypeList[i].name + "/";
			}


			$scope.pokemonType = pokemonType.slice(0, pokemonType.length - 1);
		}

	});
