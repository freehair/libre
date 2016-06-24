'use strict';

angular.module('libreApp.world')
  .config(function($stateProvider) {
    $stateProvider
      .state('world', {
        url: '/world/',
        template: '<world></world>'
      })
  });
