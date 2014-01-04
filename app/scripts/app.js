'use strict';

angular.module('myPokedexApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pokedexAnimations'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/:pokemonId', {
        templateUrl: 'views/pokedexMain.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
