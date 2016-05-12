/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Cellules              ->  index
 * POST    /api/Cellules              ->  create
 * GET     /api/Cellules/:id          ->  show
 * PUT     /api/Cellules/:id          ->  update
 * DELETE  /api/Cellules/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Cellule from './cellule.model';

function respondListWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    //console.log("entity : ", entity);
    if (entity) {
        let tableauCells=formatTabCells(entity);
        //res.status(statusCode).json(entity);
        res.status(statusCode).json(tableauCells)
    }
  };
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

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
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

// Gets a list of Cellules
export function index(req, res) {
  return Cellule.find().populate('typeTerrain grille').sort({posX:1,posY:1}).exec()
    .then(respondListWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cellule from the DB
export function show(req, res) {
  return Cellule.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cellule in the DB
export function create(req, res) {
  return Cellule.create(req)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Cellule in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Cellule.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cellule from the DB
export function destroy(req, res) {
  return Cellule.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/*export function indexByGrille(req,res) {
    console.log('indexByGrille : ', req.params);
    return Cellule.find()
        .populate('grille', , {'_id': req.params.id})
        .populate('typeTerrain')
        .exec()
    //return Cellule.find().populate('typeTerrain grille').where('grille._id').gt(req.params.id).exec()
    .then(respondListWithResult(res))
    .catch(handleError(res));
}*/
