'use strict';

(function() {

    class MapController {

        constructor(Grille ,Map , $state, $interval, $scope) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
            this.Map=Map;
            this.$state=$state;
            this.$interval=$interval;
            this.$scope=$scope;
        }

        delete() {
        }

        $onInit() {
            //Init scope
            this.$scope.updateTick = function(self){
                console.log("timer + 1");
                self.map.grille.timer++;
                console.log("timer : ", self.map.grille.timer);
            };

            this.$scope.timerStart = function(self){
                console.log("debut timer");
                //var self=this;
                self.timerPlay = self.$interval(
                    function(){
                        self.$scope.updateTick(self);
                    },3000
                );
            }

            this.$scope.timerPause = function(self){
                console.log("fin timer");
                //clearInterval(this.timerPlay);
                if (angular.isDefined(self.timerPlay)) {
                    self.$interval.cancel(self.timerPlay);
                    self.timerPlay = undefined;
                    //self.saveGrille();
                }
            }

            let tempGrille=this.Grille.getMap();
            console.log("tempGrille : ", tempGrille);
            if (!tempGrille){
                this.$state.go("grille");
            }else{
                var self = this;
                //this.time=0;
                //this.timerPlay=false;

                this.Grille.getGrilleById(tempGrille).then(response => {
                    //console.log("onInitMapreturn : ", response.data);
                    self.map=response.data;
                    //console.log("self.map : ", self.map);
                    self.infoGrille={};
                    self.infoGrille=self.Map.calculNbBySpeces(self.map);
                    //console.log("self.infoGrille : ", self.infoGrille);
                });
            }
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

        infoCellule(cellule, cellIndex){
            this.infoCell=cellule;
            this.cellIndex=cellIndex;
            //console.log("infoCell : ", this.infoCell);
        }

        ajoutPlante(x,y,nb){
            //console.log("cellIndex : ", this.cellIndex);
            if (!nb){nb=1;}
            for (var i=0; i<nb; i++){
                this.Map.createPlante(this.map.grille,this.infoCell, this.cellIndex,x,y);
            }
        }

        /*this.saveMap = function(){
            console.log("Save here this.map.grille : ", this.map.grille);
            //this.Map.saveMap(this.map.grille);
        };*/

    }

    angular.module('libreApp')
      .component('map', {
        templateUrl: 'components/map/map.html',
        controller: MapController
      });

})();
