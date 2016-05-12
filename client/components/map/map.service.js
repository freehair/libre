'use strict';

(function() {

    function MapService($location, $http, $cookies, $q ) {

        var Map = {
            createPlante(x,y){
                return $http.post('/api/plante', {posX:x, posY:y }).then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            }
        };



        return Map;
    }

    angular.module('libreApp.map')
    .factory('Map', MapService);

})();
