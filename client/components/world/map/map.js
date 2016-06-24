'use strict';

(function() {

    class MapController {

        constructor(World ,Map , $state, $interval, $scope, $q) {
            // Use the User $resource to fetch all users
            this.World=World;
            this.Map=Map;
            this.$state=$state;
            this.$interval=$interval;
            this.$scope=$scope;
            this.$q=$q;
        }

        delete() {
            /*if (this.timerPlay){
                this.$interval.cancel(this.timerPlay);
                this.timerPlay = undefined;
                this.saveWorld();
            }*/
        }

        $onInit() {
            //Init scope
            this.$scope.updateTick = function(self){
                var defer = self.$q.defer();
                self.map.world.timer++;
                self.updateWorld().then(res=>{
                    self.saveWorld().then(resSave=>{
                        console.log("saveOk");
                        defer.resolve(resSave);
                    });
                });
                return defer.promise;
            };

            this.$scope.timerStart = function(self){
                console.log("debut timer");
                //var self=this;
                self.timerPlay = self.$interval(
                    function(){
                        return self.$scope.updateTick(self);
                    },3000
                );
            }

            this.$scope.timerPause = function(self){
                console.log("fin timer");
                //clearInterval(this.timerPlay);
                if (angular.isDefined(self.timerPlay)) {
                    self.$interval.cancel(self.timerPlay);
                    self.timerPlay = undefined;
                    /*self.saveWorld().then(resSave=>{
                        console.log("saveOk");
                    });*/
                }
            }
            this.initWorld();
        }

        initWorld(){
            var defer = this.$q.defer();
            let tempWorld=this.World.getWorld();
            //console.log("tempWorld : ", tempWorld);
            if (!tempWorld){
                this.$state.go("world");
            }else{
                var self = this;
                //this.time=0;
                //this.timerPlay=false;

                this.World.getWorldById(tempWorld).then(response => {
                    //console.log("onInitMapreturn : ", response.data);
                    self.map=response.data;
                    //console.log("self.map : ", self.map);
                    self.infoWorld={};
                    self.infoWorld=self.Map.calculNbBySpeces(self.map);
                    //console.log("self.infoWorld : ", self.infoWorld);
                    defer.resolve(response);
                });
            }
            return defer;
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
                this.Map.createPlante(this.map.world,this.cellIndex,x,y);
                this.saveWorld();
            }
        }

        saveWorld(){
            var defer = this.$q.defer();
            //console.log("Save here this.map.world : ", this.map.world);
            this.World.saveWorld(this.map.world).then(response => {
                //console.log("reponse saveWorld : ", response);
                this.initWorld().then(res=>{
                    defer.resolve(res);
                });
            });
            return defer;
        }

        updateWorld(){
            return this.Map.updateWorldPlusOne(this.map.world);
        }

        afficheLog(){
            console.log('map : ',this.map);
        }

    }

    angular.module('libreApp')
      .component('map', {
        templateUrl: 'components/world/map/map.html',
        controller: MapController
      });

})();
