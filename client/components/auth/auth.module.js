'use strict';

angular.module('libreApp.auth', [
  'libreApp.constants',
  'libreApp.util',
  'ngCookies',
  'ui.router',
  'libreApp.filters'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
