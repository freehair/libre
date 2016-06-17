'use strict';

angular.module('libreApp.filters')
.filter('formatPercent', function() {

    return function(floatNumber) {
        var output= parseInt(floatNumber*100) + " %";
        return output;
    };
});
