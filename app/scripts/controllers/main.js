'use strict';

angular.module('myPokedexApp')
	.controller('MainCtrl', function ($scope, $routeParams, $http) {
		// FUNCTIONS
		var getPokemonDesc, getPokemonSprite, getPokemonType;

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


		getPokemonDesc = function(data) {
			var pokemonDescUrl = 'http://pokeapi.co' + data.descriptions[0].resource_uri;
			$http.get(pokemonDescUrl)
			    .success(function (data, status, headers, config) {
			        $scope.pokemonDesc = data;
			    })
			    .error(function (data, status, headers, config) {
			        console.log('Pokemon Desc Data Fetch Failed');
			});
		};

		getPokemonSprite = function(data) {
			var pokemonSpriteUrl = 'http://pokeapi.co' + data.sprites[0].resource_uri;
			$http.get(pokemonSpriteUrl)
			    .success(function (data, status, headers, config) {
			        $scope.pokemonSprite = data;
			    })
			    .error(function (data, status, headers, config) {
			        console.log('Pokemon Desc Data Fetch Failed');
			});
		};
		
		getPokemonType = function(data) {
			var pokemonType, pokemonTypeList, currType, capFirstLetter;
			pokemonType = "";
			pokemonTypeList = data.types;

			for(var i = 0, len = pokemonTypeList.length; i < len; i++) {
				currType = pokemonTypeList[i].name + "/";
				capFirstLetter = pokemonTypeList[i].name[0].toUpperCase();
				currType = capFirstLetter + currType.slice(1, currType.length);
				pokemonType += currType;
			}

			$scope.pokemonType = pokemonType.slice(0, pokemonType.length - 1);
		}

	});
