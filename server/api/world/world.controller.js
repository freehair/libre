/**
* Using Rails-like standard naming convention for endpoints.
* GET     /api/Worlds              ->  index
* POST    /api/Worlds              ->  create
* GET     /api/Worlds/:id          ->  show
* PUT     /api/Worlds/:id          ->  update
* DELETE  /api/Worlds/:id          ->  destroy
*/

'use strict';

import _ from 'lodash';
import Q from 'q';
import World from './world.model';
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
            //console.log("tableauCells : ",tableauCells);
            //entity.cellules=tableauCells;
            let result={};
            result.world=entity;
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


function createCells(worldName, tailleX, tailleY){
    var deferred = Q.defer();
    let world=new World();
    world.name=worldName;
    world.tailleX=tailleX;
    world.tailleY=tailleY;
    world.timer=0;
    initCells(world).then(function(data){
        //console.log("data : ", data);
        //world.cellules.push(cells);
        //console.log("world cells : ", world);
        deferred.resolve(data);
    });

    return deferred.promise;
}

function initCells(world){
    var deferred = Q.defer();
    //var cellules=[];
    Terrain.find().sort({limit:-1}).exec().then(function(terrains){
        for (var i=0; i<world.tailleX;i++){
            for (var j=0; j<world.tailleY;j++){
                //world.cellules.push(new Cellule());
                var cell=new Cellule();
                cell.posX=i;
                cell.posY=j;
                cell.eau=Math.random();
                cell.typeTerrain=randomize(terrains, cell.eau);
                world.cellules.push(cell);
            }
        }
        //console.log("world : ", world);
        deferred.resolve(world);
    });
    return deferred.promise;
}

function randomize(terrains, eau){
    //console.log("randomize terrains: ", terrains);
    var coeff=eau;
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
        _.extend(entity, updates);
        return entity.save()
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

// Gets a list of Worlds
export function index(req, res) {
    return World.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single World from the DB
export function show(req, res) {
    return World.findById(req.params.id).populate('cellules.typeTerrain cellules.contenu').exec()
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



// Creates a new World in the DB
export function create(req, res) {
    //console.log("req.body : ",req.body);
    createCells(req.body.name, req.body.tailleX, req.body.tailleY).then(function(world) {
        //console.log("world : ", world);
        return World.create(world)
            .then(respondWithResult(res,201))
            .catch(handleError(res));
    });
}

// Updates an existing World in the DB
export function update(req, res) {
    console.log("req.body : ", req.body);
    if (req.body.world._id) {
        delete req.body.world._id;
    }
    //console.log("req.params : ", req.params);
    return World.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body.world)) //req.body
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Deletes a World from the DB
export function destroy(req, res) {
    return World.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
