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
import Grille from './grille.model';
import Cellule from '../cellule/cellule.model';
import Terrain from '../terrain/terrain.model';
import TerrainCtrl from '../terrain/terrain.controller';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            console.log("ok, entity : ", entity);
            res.status(statusCode).json(entity);
        }
    };
}

function createCellsWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            createCells(entity._id, entity.tailleX, entity.tailleY);
            res.status(statusCode).json(entity);
        }
    };
}


function createCells(grille, tailleX, tailleY){
    Terrain.find().sort({limit:-1}).exec().then(function(terrains){
        for (var i=0; i<tailleX;i++){
            for (var j=0; j<tailleY;j++){
                var cell={
                    posX:i,
                    posY:j,
                    typeTerrain:randomize(terrains),
                    grille:grille
                }
                console.log("cell : ",cell);
                Cellule.create(cell);
            }
        }
    });
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
    return Grille.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Grille in the DB
export function create(req, res) {
    //let grille=initialiseGrille(req.body);
    return Grille.create(req.body)
    .then(createCellsWithResult(res,201))
    .catch(handleError(res));
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
