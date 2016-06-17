'use strict';

import _ from 'lodash';
import Deplacement from '../deplacement/deplacement.model';
import Q from 'q';

export function createDep(eau, desert, marais, foret, plaine, montagne){
    //var deferred = Q.defer();
    var result=[];
    var DepEau=new Deplacement();
    DepEau.type=1;
    DepEau.percent=eau;
    result.push(DepEau);

    var DepDesert=new Deplacement();
    DepDesert.type=2;
    DepDesert.percent=desert;
    result.push(DepDesert);

    var DepMarais=new Deplacement();
    DepMarais.type=3;
    DepMarais.percent=marais;
    result.push(DepMarais);

    var DepForet=new Deplacement();
    DepForet.type=4;
    DepForet.percent=foret;
    result.push(DepForet);

    var DepPlaine=new Deplacement();
    DepPlaine.type=5;
    DepPlaine.percent=plaine;
    result.push(DepPlaine);

    var DepMontagne=new Deplacement();
    DepMontagne.type=6;
    DepMontagne.percent=montagne;
    result.push(DepMontagne);

    console.log("new Deplacement before create : ", result);
    return result;

    /*deferred.resolve(result);

    return deferred.promise;*/
}
