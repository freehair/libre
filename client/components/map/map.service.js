'use strict';


(function() {

    function MapService($location, $http, $cookies, $q ) {

        var Map = {
            createPlante(grille,cellule,celluleIndex,x,y){
                return $http.post('/api/plante', {posX:x, posY:y }).then(res => {
                    //console.log("res pour create Plante", res);
                    //return $q.resolve(res);
                    grille.cellules[celluleIndex].contenu.push(res.data);
                    return $http.put('/api/grille/'+grille._id, {grille}).then(resCellule => {
                        //console.log("res pour update cellule", resCellule);
                        return $q.resolve(resCellule);
                    })
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },


            calculNbBySpeces(grille){
                var result={};
                //console.log("grille.cellules : ", grille.cellules);
                for(var lignes of grille.cellules){
                    //console.log("lignes : ", lignes);
                    for(var cells of lignes){
                        //console.log("cells.contenu : ", cells.contenu);
                        for (var container of cells.contenu){
                            if (result[container.type]){
                                result[container.type]++;
                            }else{
                                result[container.type]=1;
                            }
                        }
                    }
                }
                //console.log("calculNbBySpeces : ", result);
                return result;
            }
        };



        return Map;
    }

    angular.module('libreApp.map')
    .factory('Map', MapService);

})();
