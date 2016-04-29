'use strict';

(function() {

    function GrilleService($location, $http, $cookies, $q ) {

        var Grille = {

            create({name,tailleX,tailleY,plaine,desert,foret,eau,marais,montagne}, callback) {
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
                    /*$cookies.put('token', res.data.token);
                    currentUser = User.get();
                    return currentUser.$promise;*/
                    return $q.resolve(res);
                })
                /*.then(user => {
                    safeCb(callback)(null, user);
                    return user;
                })*/
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            list(){
                console.log("list get grille");
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
            }

        };



        return Grille;
    }

    angular.module('libreApp.grille')
    .factory('Grille', GrilleService);

})();
