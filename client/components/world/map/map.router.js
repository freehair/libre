'use strict';

angular.module('libreApp.map')
  .config(function($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        template: '<map></map>'
      })
  });
