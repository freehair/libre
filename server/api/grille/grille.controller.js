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

function randomTerrain(data){
    let random=Math.random();
    let cursor=data.plaine/100;
    let type=null;
    if (data.plaine>0 && random<cursor){
        type="plaine";
    }else{
        cursor+=data.desert/100;
        if (data.desert>0 && random<cursor) {
            type="desert";
        }else{
            cursor+=data.foret/100;
            if (data.foret>0 && random<cursor) {
                type="foret";
            }else{
                cursor+=data.eau/100;
                if (data.eau>0 && random<cursor) {
                    type="eau";
                }else{
                    cursor+=data.marais/100;
                    if (data.marais>0 && random<cursor) {
                        type="marais";
                    }else{
                        cursor+=data.montagne/100;
                        if (data.montagne>0 && random<cursor) {
                            type="montagne";
                        }
                    }
                }
            }
        }
    }
    return type;
}


function initialiseGrille(data){
    let grille={
        name:data.name,
        contenu:[]
    };
    for (var i=0; i<data.tailleX; i++){
        var tab=[];
        for(var j=0; j<data.tailleY; j++){
            var type=null;
            type = randomTerrain(data);
            tab.push(type)
        }
        grille.contenu.push(tab);
    }
    console.log(grille.contenu);
    return grille;
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
    let grille=initialiseGrille(req.body);
  return Grille.create(grille)
    .then(respondWithResult(res, 201))
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
