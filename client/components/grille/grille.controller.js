'use strict';

(function() {

    class GrilleController {

        constructor(Grille, $state, $uibModal) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
            this.$state=$state;
            this.$modal=$uibModal;
        }

        delete() {
        }

        $onInit() {
            console.log("onInit");
            this.Grille.list().then(response => {
              console.log("onInitreturn");
              this.list=response.data;
          });
        }

        consult(item){
            console.log("consult");
            this.Grille.setMap(item._id);
            this.$state.go("map");
        }

        newGrille(){
            var modalInstance = this.$modal.open({
                templateUrl:'components/grille/grille.html',
                controller:['$scope', '$uibModalInstance','Grille', function($scope, $modalInstance,Grille) {
                    $scope.grille={};

                    $scope.ok = function() {
                        console.log($scope.grille);
                        Grille.create($scope.grille);
                        Grille.list().then(response => {
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
                console.log(data);
                this.list=data;
            });
        }


    }

    angular.module('libreApp')
      .component('grille', {
        templateUrl: 'components/grille/list.html',
        controller: GrilleController
      });

})();
