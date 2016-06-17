'use strict';

angular.module('libreApp.grille')
  .config(function($stateProvider) {
    $stateProvider
      .state('grille', {
        url: '/grille',
        template: '<grille></grille>'
      })

      .state('test', {
        url: '/test',
        template: '<test></test>'
    })
  });
