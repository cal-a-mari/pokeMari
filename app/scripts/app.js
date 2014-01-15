'use strict';

angular.module('pokeMariApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/search',
        controller: 'SearchCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about',
        controller: 'AboutCtrl'
      })
      .when('/:pokemonId', {
        templateUrl: 'partials/pokedexMain',
        controller: 'PokedexMainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });