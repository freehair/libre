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
                        $modalInstance.close($scope.grille);
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                }]
            });
        }


    }

    angular.module('libreApp')
      .component('grille', {
        templateUrl: 'components/grille/list.html',
        controller: GrilleController
      });

})();

        /*contenu={
            "plaine":20,
            "desert":5,
            "foret":15,
            "eau":40,
            "marais":5,
            "montagne":15,
            "total":100
        };
        plaine=true;
        desert=true;
        foret=true;
        eau=true;
        marais=true;
        montagne=true;

        constructor(Grille) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
        }

        delete() {
        }

        calculTotalPourcentage() {
            this.contenu.total=this.contenu.plaine+this.contenu.desert+this.contenu.foret+this.contenu.eau+this.contenu.marais+this.contenu.montagne;
            console.log("this.contenu.total : ",this.contenu.total);
        }

        createGrille() {
            this.Grille.create(
                {
                    name:this.name,
                    tailleX:this.taille.x,
                    tailleY:this.taille.y,
                    plaine:this.contenu.plaine,
                    desert:this.contenu.desert,
                    foret:this.contenu.foret,
                    eau:this.contenu.eau,
                    marais:this.contenu.marais,
                    montagne:this.contenu.montagne
                }
            );
        }



    }

    angular.module('libreApp.grille')
    .controller('GrilleController', GrilleController);

})();*/
