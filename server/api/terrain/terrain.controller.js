/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Terrains              ->  index
 * POST    /api/Terrains              ->  create
 * GET     /api/Terrains/:id          ->  show
 * PUT     /api/Terrains/:id          ->  update
 * DELETE  /api/Terrains/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Terrain from './terrain.model';

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

// Gets a list of Terrains
export function index(req, res) {
  return Terrain.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Terrain from the DB
export function show(req, res) {
  return Terrain.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Terrain in the DB
export function create(req, res) {
    //let terrain=initialiseTerrain(req.body);
  return Terrain.create(req)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Terrain in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Terrain.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Terrain from the DB
export function destroy(req, res) {
  return Terrain.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function randomize(){
   console.log("function randomize");
   /*let number=Math.random();
   return this.constructor.find().exec()
       .then(function(res){
           console.log("randomize : ", res);
           return res
       })
       .catch()
       */

}
