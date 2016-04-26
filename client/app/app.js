'use strict';

angular.module('libreApp', [
  'libreApp.auth',
  'libreApp.admin',
  'libreApp.create',
  'libreApp.grille',
  'libreApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
