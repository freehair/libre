'use strict';

(function() {

    class WorldCtrl {

        constructor(World, $state, $uibModal) {
            // Use the User $resource to fetch all users
            this.World=World;
            this.$state=$state;
            this.$modal=$uibModal;
        }

        delete() {
        }

        $onInit() {
            this.World.list().then(response => {
              this.list=response.data;
          });
        }

        consult(item){
            this.World.setMap(item._id);
            //console.log('world._id : ', item._id);
            //this.$state.go("map");
        }

        newWorld(){
            var modalInstance = this.$modal.open({
                templateUrl:'components/world/create.html',
                controller:['$scope', '$uibModalInstance','World', function($scope, $modalInstance,World) {
                    $scope.world={};

                    $scope.ok = function() {
                        console.log($scope.world);
                        World.create($scope.world);
                        World.list().then(response => {
                          console.log("onInitreturn");
                          //this.list=response.data;
                          $modalInstance.close(response.data);
                      });
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                }]
            });

            modalInstance.result.then(data => {
                this.World.list().then(response => {
                    this.list=response.data;
                });
            });
        }

        deleteWorld(item){
            this.World.delete(item).then(response => {
                this.World.list().then(response => {
                    this.list=response.data;
                });
            });
        }


    }

    angular.module('libreApp')
      .component('world', {
        templateUrl: 'components/world/list.html',
        controller: WorldCtrl
      });

})();
