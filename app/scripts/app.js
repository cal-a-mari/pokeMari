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
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/:pokemonId', {
        templateUrl: 'views/pokedexMain.html',
        controller: 'PokedexMainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });