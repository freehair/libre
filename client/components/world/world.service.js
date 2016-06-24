'use strict';

(function() {

    function WorldService($location, $http, $cookies, $q ) {

        var World = {

            create(world) {
                return $http.post('/api/world', {
                    name: world.name,
                    tailleX:world.tailleX,
                    tailleY:world.tailleY
                }).then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            list(){
                return $http.get('/api/world').then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            delete(item){
                return $http.delete('/api/world/'+item._id).then(res => {
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            setWorld(world){
                this.currentWorld=world;
            },

            getWorld(){
                return this.currentWorld;
            },

            getWorldById(id){
                return $http.get('/api/world/'+id).then(res =>{
                    return $q.resolve(res);
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },

            saveWorld(world){
                //console.log("test saveWorld ok", world);
                // PUT     /api/Worlds/:id          ->  update
                return $http.put('/api/world/'+world._id, {world: world}).then(res =>{
                    return $q.resolve(res);
                })
                .catch(err => {
                    return $q.reject(err.data);
                });
            }

        };



        return World;
    }

    angular.module('libreApp.world')
    .factory('World',WorldService);

})();
