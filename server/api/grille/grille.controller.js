/**
* Using Rails-like standard naming convention for endpoints.
* GET     /api/Grilles              ->  index
* POST    /api/Grilles              ->  create
* GET     /api/Grilles/:id          ->  show
* PUT     /api/Grilles/:id          ->  update
* DELETE  /api/Grilles/:id          ->  destroy
*/

'use strict';

import _ from 'lodash';
import Q from 'q';
import Grille from './grille.model';
import Cellule from '../cellule/cellule.model';
import Terrain from '../terrain/terrain.model';
import TerrainCtrl from '../terrain/terrain.controller';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            //console.log("ok, entity : ", entity);
            res.status(statusCode).json(entity);
        }
    };
}

function respondWithResultAndFormatCells(res, statusCode){
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            let tableauCells=formatTabCells(entity.cellules);
            console.log("tableauCells : ",tableauCells);
            //entity.cellules=tableauCells;
            let result={};
            result.grille=entity;
            result.cellules=tableauCells;
            //console.log("entity : ",entity);
            res.status(statusCode).json(result);
        }
    };
}

/*function createCellsWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            createCells(entity._id, entity.tailleX, entity.tailleY);
            res.status(statusCode).json(entity);
        }
    };
}*/


function createCells(grilleName, tailleX, tailleY){
    var deferred = Q.defer();
    let grille=new Grille();
    grille.name=grilleName;
    grille.tailleX=tailleX;
    grille.tailleY=tailleY;
    initCells(grille).then(function(data){
        console.log("data : ", data);
        //grille.cellules.push(cells);
        //console.log("grille cells : ", grille);
        deferred.resolve(data);
    });

    return deferred.promise;
}

function initCells(grille){
    var deferred = Q.defer();
    //var cellules=[];
    Terrain.find().sort({limit:-1}).exec().then(function(terrains){
        for (var i=0; i<grille.tailleX;i++){
            for (var j=0; j<grille.tailleY;j++){
                //grille.cellules.push(new Cellule());
                var cell=new Cellule();
                cell.posX=i;
                cell.posY=j;
                cell.typeTerrain=randomize(terrains);
                grille.cellules.push(cell);
            }
        }
        //console.log("grille : ", grille);
        deferred.resolve(grille);
    });
    return deferred.promise;
}

function randomize(terrains){
    //console.log("randomize terrains: ", terrains);
    var coeff=Math.random();
    var res;
    for(var terrain of terrains){
        if(coeff<=terrain.limit){
            res=terrain.id;
        }
    }
    return res;
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
        .then(updated => {
            return updated;
        });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
            .then(() => {
                res.status(204).end();
            });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        console.log(err);
        res.status(statusCode).send(err);
    };
}

// Gets a list of Grilles
export function index(req, res) {
    return Grille.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Grille from the DB
export function show(req, res) {
    return Grille.findById(req.params.id).populate('cellules.typeTerrain').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResultAndFormatCells(res))
    .catch(handleError(res));
}


function formatTabCells(entity) {
    let result=[];
    let ligne=[];
    let cells=entity;
    let cellPrecedente={};
    for(var cell of entity){
        if(cellPrecedente !== {} && cellPrecedente.posX!==cell.posX){
            //console.log("ligne : ",ligne);
            if (ligne.length>0){
                result.push(ligne);
            }
            ligne=[];
        }
        ligne.push(cell);
        cellPrecedente=cell;
    }
    result.push(ligne);
    //console.log("result : ", result);
    return result;
}



// Creates a new Grille in the DB
export function create(req, res) {
    //console.log("req.body : ",req.body);
    createCells(req.body.name, req.body.tailleX, req.body.tailleY).then(function(grille) {
        console.log("grille : ", grille);
        return Grille.create(grille)
            .then(respondWithResult(res,201))
            .catch(handleError(res));
    });
}

// Updates an existing Grille in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Grille.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Grille from the DB
export function destroy(req, res) {
    return Grille.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
