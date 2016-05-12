'use strict';

(function() {

    class MapController {

        constructor(Grille ,Map , $state) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
            this.Map=Map;
            this.$state=$state;
        }

        delete() {
        }

        $onInit() {
            this.infoCell={};
            this.Grille.getGrilleById(this.Grille.getMap()).then(response => {
              //console.log("onInitMapreturn : ", response.data);
              this.map=response.data;
          });
        }

        itemInArray(item){
            let result=item.split(",");
            //console.log("result : ",result.length);
            return result;
        }

        getNbByType(map) {
            let result={};
            for (var i=0;i<map.length;i++){
                let terrains=this.itemInArray(map[i]);
                for (var j=0; j<terrains.length; j++){
                    var terrain=terrains[j];
                    if (result[terrain]){
                        result[terrain]++;
                    }else{
                        result[terrain]=1;
                    }
                }
            }
            //console.log("result : ",result);
            return result;
        }

        infoCellule(cellule){
            this.infoCell=cellule;
        }

        ajoutPlante(x,y,nb){
            if (!nb){nb=1;}
            for (var i=0; i<nb; i++){
                this.Map.createPlante(x,y);
            }
        }

    }

    angular.module('libreApp')
      .component('map', {
        templateUrl: 'components/map/map.html',
        controller: MapController
      });

})();
