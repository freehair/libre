'use strict';

angular.module('libreApp.create')
  .config(function($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateController',
        controllerAs: 'create'
      });
  });
