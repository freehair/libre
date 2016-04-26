'use strict';

angular.module('libreApp.grille')
  .config(function($stateProvider) {
    $stateProvider
      .state('grille', {
        url: '/grille',
        templateUrl: 'app/grille/grille.html',
        controller: 'GrilleController',
        controllerAs: 'grille'
      });
  });
