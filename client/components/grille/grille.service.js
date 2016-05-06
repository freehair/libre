'use strict';

(function() {

    function GrilleService($location, $http, $cookies, $q ) {

        var Grille = {

            /*create({name,tailleX,tailleY,plaine,desert,foret,eau,marais,montagne}, callback) {
                return $http.post('/api/grille', {
                    name: name,
                    tailleX:tailleX,
                    tailleY:tailleY,
                    plaine:plaine,
                    desert:desert,
                    foret:foret,
                    eau:eau,
                    marais:marais,
                    montagne:montagne
                })
                .then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },*/

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
