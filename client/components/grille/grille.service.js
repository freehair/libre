'use strict';

(function() {

    function GrilleService($location, $http, $cookies, $q ) {

        var Grille = {

            create(grille) {
                return $http.post('/api/grille', {
                    name: grille.name,
                    tailleX:grille.tailleX,
                    tailleY:grille.tailleY
                }).then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            list(){
                return $http.get('/api/grille').then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            setMap(map){
                this.map=map;
            },

            getMap(){
                return this.map;
            },

            getCells(){
                return $http.get('/api/cellule').then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            }

        };



        return Grille;
    }

    angular.module('libreApp.grille')
    .factory('Grille', GrilleService);

})();
