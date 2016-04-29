'use strict';

(function() {

    class GrilleController {

        constructor(Grille, $state) {
            // Use the User $resource to fetch all users
            this.Grille=Grille;
            this.$state=$state;
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
            this.Grille.setMap(item.contenu);
            this.$state.go("map");
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
