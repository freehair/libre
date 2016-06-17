/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Plantes              ->  index
 * POST    /api/Plantes              ->  create
 * GET     /api/Plantes/:id          ->  show
 * PUT     /api/Plantes/:id          ->  update
 * DELETE  /api/Plantes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Plante from './plante.model';
import EtreVivant from '../etreVivant/etreVivant.model';
//import Deplacement from '../deplacement/deplacement.model'
var deplacementController = require('../deplacement/deplacement.controller.js');

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

// Gets a list of Plantes
export function index(req, res) {
  return Plante.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Plante from the DB
export function show(req, res) {
  return Plante.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Plante in the DB
export function create(req, res) {
    let plante=initialisePlante(req.body);
    //console.log("new plante before create : ", plante.vie.deplacement);
  return Plante.create(plante)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

function initialisePlante(req, res){
    let newPlante=new Plante();
    newPlante.posX=req.posX;
    newPlante.posY=req.posY;
    newPlante.type="plante";
    newPlante.vie=new EtreVivant();
    newPlante.vie.ageMax=400;
    newPlante.vie.ageReproduction=20;
    newPlante.vie.chanceReproduction=0.1;
    newPlante.vie.vitesse=1;//1=lent
    //newPlante.vie.deplacement=[];
    newPlante.vie.deplacement=deplacementController.createDep(0.5,0,0.7,1,0.5,0.2);
    /*deplacementController.createDep(0.5,0,0.7,1,0.5,0.2).then(function(data){
        console.log("temp test : ", data);
    });*/
    console.log("new plante before create : ", newPlante.vie.deplacement);
    newPlante.vie.sexe=Math.floor(Math.random()) + 1;
    console.log("new plante : ", newPlante);
    return newPlante;
}

// Updates an existing Plante in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Plante.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Plante from the DB
export function destroy(req, res) {
  return Plante.findById(req.params.id).exec()
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
