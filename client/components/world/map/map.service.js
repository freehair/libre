'use strict';


(function() {

    function MapService($location, $http, $cookies, $q ) {

        var vieToujours = function(item){
            var randomVie=Math.floor(Math.random()*(item.ageMax+1));
            //console.log("randomVie, age, ageMax : ", randomVie, item.age, item.ageMax);
            var res=randomVie>item.age;
            return res;
        };

        var recupIndexCell = function(posX, posY, worldTailleX, worldTailleY){
            return worldTailleY*posX+posY;
        };

        var randomDep = function(world, depPossible, container){
            var res=null;
            var tab=[];
            var lastNumber=0;
            depPossible.forEach(function (deplacementPossible, index) {
                //console.log("world.cellules[deplacement].typeTerrain : ", world.cellules[deplacement].typeTerrain);
                //console.log("container.vie.deplacement : ", container.vie.deplacement);
                //for(terrain of container.vie.deplacement){
                for (var i=0; i<container.vie.deplacement.length; i++){
                    var terrain=container.vie.deplacement[i];
                    if (terrain.type ===  world.cellules[deplacementPossible].typeTerrain._id){
                        var object={};
                        object.index=deplacementPossible;
                        object.percent=lastNumber+(terrain.percent*100);
                        lastNumber=object.percent;
                        tab.push(object);
                    }
                }
            });
            var resRandom = Math.floor(Math.random()*(lastNumber+1));
            tab.forEach(function (item){
                if (res===null && resRandom<item.percent){
                    res=item.index;
                }
            })
            //console.log("tableau des possiblilités : ", tab);
            //console.log("resRandom : ", resRandom);
            //console.log("res : ", res);
            return res;
        }

        var calculDeplacement = function(world, container, index){
            /*world.tailleX
            world.tailleY
            index
            container.posX
            container.posY
            container.deplacement*/
            var depPossible=[];
            var supX=0;
            for(var i=-1;i<=1;i++){
                var tempPosX=container.posX+i;
                if (tempPosX>=0 && tempPosX<world.tailleX){
                    for(var j=-1;j<=1;j++){
                        var tempPosY=container.posY+j;
                        if (tempPosY >=0 && tempPosY<world.tailleY){
                            depPossible.push(recupIndexCell(tempPosX, tempPosY, world.tailleX, world.tailleY));
                        }
                    }
                }
            }
            //console.log("depPossible : ", depPossible);
            return randomDep(world, depPossible, container);
        };

        //Boucle pour faire prendre un an de plus à tout le monde et vérifié qui survit
        var vieillissement = function(world){
            for(var cells of world.cellules){
                for(var i = cells.contenu.length - 1; i>=0; i-- ){
                    var container=cells.contenu[i];
                    if (container.vie.age === (world.timer - container.vie.dateBirth - 1)){//Sinon l'objet a déja a été traité sur ce tour
                        //Prise en compte du vieillisement
                        container.vie.age++;
                        //Temporairement, elles sont increvables
                        /*if(!vieToujours(container.vie)){
                            console.log("Un(e) ",container.type," est morte à l'age de : ", container.vie.age);
                            cells.contenu.splice(i,1);
                        }*/
                    }
                }
            }
        };

        //Boucle permettant aux éléments de se reproduire ou pas
        var reproduction = function(world){
            for(var cells of world.cellules){
                for(var i = cells.contenu.length - 1; i>=0; i-- ){
                    if (!cells.contenu[i].vie.reproEnCours && cells.contenu[i].vie.age>=cells.contenu[i].vie.ageReproduction){
                        for(var j = cells.contenu.length - 1; j>=0; j-- ){
                            if(!cells.contenu[i].vie.reproEnCours && !cells.contenu[j].vie.reproEnCours && cells.contenu[j].vie.sexe!==cells.contenu[i].vie.sexe && cells.contenu[j].type===cells.contenu[i].type && cells.contenu[j].vie.age>=cells.contenu[j].vie.ageReproduction){
                                console.log("on a un couple compatible");
                                if (Math.random()<=cells.contenu[i].vie.chanceReproduction){
                                    console.log("et il s'est reproduit");
                                    if(cells.contenu[i].vie.sexe===1){
                                        cells.contenu[i].vie.reproEnCours=1;
                                        cells.contenu[j].vie.reproEnCours=cells.contenu[j].vie.gestation;
                                    }else{
                                        cells.contenu[i].vie.reproEnCours=cells.contenu[i].vie.gestation;
                                        cells.contenu[j].vie.reproEnCours=1;
                                    }
                                };
                            }
                        }
                    }
                }
            }
        };

        //Boucle permettant aux éléments qui ne se reproduisent pas de se déplacer
        var deplacement = function(world){
            for(var cells of world.cellules){
                for(var i = cells.contenu.length - 1; i>=0; i-- ){
                    var container=cells.contenu[i];
                    if(container.vie.reproEnCours===0){
                        let newDep=calculDeplacement(world, container, i);
                        container.vie.cellule=newDep;
                        container.vie.posY=container.vie.cellule%world.tailleY;
                        container.vie.posX=Math.floor((container.vie.cellule-container.vie.posY)/world.tailleY);
                        container.vie.parcours.push(newDep);
                        if (newDep!==i){
                            world.cellules[newDep].contenu.push(container);
                            cells.contenu.splice(i,1)
                            //console.log("deplacement dans la cellule d'index : ", newDep);
                        }
                    }
                }
            }
        };




        var accouchement = function(world){
            var deferred = $q.defer();
            var promises = [];
            for(var cells of world.cellules){
                for(var i = cells.contenu.length - 1; i>=0; i-- ){
                    var container=cells.contenu[i];
                    if(container.vie.reproEnCours>=0){
                        container.vie.reproEnCours--;
                        if(container.vie.reproEnCours===0 && container.vie.sexe===2){
                            console.log("velage en cours");
                            promises.push(createPlante(world,container.vie.cellule,container.posX,container.posY));
                        }
                    }
                }
            }
            $q.all(promises).then(res => {
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        var Map = {
            createPlante(world,celluleIndex,x,y){
                return $http.post('/api/plante', {posX:x, posY:y, cellule:celluleIndex, dateBirth: world.timer}).then(res => {
                    //console.log("res pour create Plante", res);
                    //return $q.resolve(res);
                    world.cellules[celluleIndex].contenu.push(res.data);
                    return $http.put('/api/world/'+world._id, {world}).then(resCellule => {
                        //console.log("res pour update cellule", resCellule);
                        return $q.resolve(resCellule);
                    })
                })
                .catch(err => {
                    //safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },


            calculNbBySpeces(world){
                var result={};
                //console.log("world.cellules : ", world.cellules);
                for(var lignes of world.cellules){
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
            },


            updateWorldPlusOne(world){
                var defer = $q.defer();
                vieillissement(world);
                reproduction(world);
                deplacement(world);
                accouchement(world).then(res=>{
                    defer.resolve(world);
                });
                return defer.promise;
            }


        };





        return Map;
    }

    angular.module('libreApp.map')
    .factory('Map', MapService);

})();

/*for(var cells of world.cellules){
    //for (var container of cells.contenu){
    var tabCell=[];
    angular.copy(cells.contenu, tabCell);
    //tabCell.forEach(function (container, index) {
    for(var i = cells.contenu.length - 1; i>=0; i-- ){
        var container=cells.contenu[i];
        if (container.vie.age === (world.timer - container.vie.dateBirth - 1)){//Sinon l'objet a déja a été traité sur ce tour
            //Prise en compte du vieillisement
            container.vie.age++;
            //Survie:
            if(!vieToujours(container.vie)){
                console.log("Un(e) ",container.type," est morte à l'age de : ", container.vie.age);
                cells.contenu.splice(i,1);
            }else{
                //console.log("La plante est toujours vivante, elle est agée de : ",container.vie.age);
                //Reproduction possible
                reproduction(world,container,cells);
                if(container.repro){
                    delete container.repro;
                }else{
                    if (container.vie.reproEnCours==0){
                        //Si pas de reproduction en cours, déplacement possible
                        let newDep=calculDeplacement(world, container, i);
                        container.vie.cellule=newDep;
                        container.vie.parcours.push(newDep);
                        if (newDep!==i){
                            world.cellules[newDep].contenu.push(container);
                            cells.contenu.splice(i,1);
                            console.log("deplacement dans la cellule d'index : ", newDep);
                        }
                    else{
                        container.vie.reproEnCours--;
                        if(container.vie.reproEnCours===0){
                            //createPlante(world,i,x,y)
                            console.log("container for new plante : ", container);
                        }
                    }
                }
            }
        }
    }
}*/
