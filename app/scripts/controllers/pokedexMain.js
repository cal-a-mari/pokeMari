'use strict';

angular.module('pokeMariApp')
	.controller('PokedexMainCtrl', function ($scope, $routeParams, $http) {
		// FUNCTIONS
		var getPokemonDesc, getPokemonSprite, getPokemonType, getPokemonEvolution;

		var mainPokemonUrl = 'api/pokemon/' + $routeParams.pokemonId;
		
		$http.get(mainPokemonUrl)
			.success(function (data, status, headers, config) {
				console.log(data);
				$scope.pokemonData = data;
				getPokemonDesc(data);
				getPokemonSprite(data);
				getPokemonEvolution(data);
				getPokemonType(data);
			})
			.error(function (data, status, headers, config) {
				console.log('Main Pokemon Data Fetch Failed');
			});


		getPokemonDesc = function(data) {
			var resourceUri, pokemonId, pokemonDescUrl;
			resourceUri = data.descriptions[0].resource_uri;
			resourceUri = resourceUri.substr(resourceUri.length - 10);
			//console.log("resourceUri: " + resourceUri);
			pokemonId = resourceUri.replace(/\D/g,'');
			//console.log("pokemonId: " + pokemonId);
			pokemonDescUrl = 'api/description/' + pokemonId;
			$http.get(pokemonDescUrl)
				.success(function (data, status, headers, config) {
					// console.log(data);
					$scope.pokemonDesc = data;
				})
				.error(function (data, status, headers, config) {
					console.log('Pokemon Desc Data Fetch Failed');
			});
		};

		getPokemonSprite = function(data) {
			var resourceUri, pokemonId, pokemonSpriteUrl;
			resourceUri = data.sprites[0].resource_uri;
			resourceUri = resourceUri.substr(resourceUri.length - 10);
			pokemonId = resourceUri.replace(/\D/g,'');
			//console.log("pokemonId: " + pokemonId);
			var pokemonSpriteUrl = 'api/sprite/' + pokemonId;
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

		getPokemonEvolution = function(data) {
			if(data.evolutions.length !== 0) {
				$scope.levelUp = data.evolutions[0].level;
				var resourceUri, pokemonId, nextPokemonUrl;
				resourceUri = data.evolutions[0].resource_uri;
				resourceUri = resourceUri.substr(resourceUri.length - 10);
				pokemonId = resourceUri.replace(/\D/g,'');
				
				nextPokemonUrl = 'api/pokemon/' + pokemonId;
				// console.log("nextPokemonUrl: " + pokemonId);

				$http.get(nextPokemonUrl)
					.success(function (data, status, headers, config) {
						// console.log("data from nextPokemonUrl:");
						// console.log(data);
						var evoResourceUri, evoPokemonSpriteUrl, evoPokemonId;
						evoResourceUri = data.sprites[0].resource_uri;
						evoResourceUri = evoResourceUri.substr(evoResourceUri.length - 10);
						evoPokemonId = evoResourceUri.replace(/\D/g,'');
						evoPokemonSpriteUrl = 'api/sprite/' + evoPokemonId;
						// console.log("pokemonSpriteUrl: " + evoPokemonSpriteUrl);
						$http.get(evoPokemonSpriteUrl)
							.success(function (data, status, headers, config) {
								$scope.pokemonEvoSprite = data;
								// console.log(data);
							})
							.error(function (data, status, headers, config) {
								console.log('PokemonEVO Desc Data Fetch Failed');
						});
					})
					.error(function (data, status, headers, config) {
						console.log('Pokemon Desc Data Fetch Failed');
				});
			}
			
		}

	});


