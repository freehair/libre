'use strict';

(function() {

    class MapController {

        constructor(Grille, $state) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
            this.$state=$state;
        }

        delete() {
        }

        $onInit() {
            this.Grille.getCells().then(response => {
              console.log("onInitMapreturn : ", response.data);
              this.cellules=response.data;
          });
        }

        itemInArray(item){
            let result=item.split(",");
            console.log("result : ",result.length);
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
            console.log("result : ",result);
            return result;
        }

    }

    angular.module('libreApp')
      .component('map', {
        templateUrl: 'components/map/map.html',
        controller: MapController
      });

})();
